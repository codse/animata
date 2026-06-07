// Generate per-component-doc OG images: screenshot each component's primary Storybook story
// inside a branded 1200x630 card, upload to Cloudflare R2 via wrangler, and write the
// slug -> { url, hash } manifest (lib/og-manifest.json), which is committed.
//
// Run this LOCALLY and eyeball the result before pushing — screenshots can be flaky (a bad
// canvas frame, a slow render), so a human verifies. It is intentionally NOT in `pnpm build` or
// CI; the build just reads the committed manifest. Unchanged components are skipped via the hash
// recorded in the manifest, so re-runs only re-shoot what actually changed.
//
// Requires: Playwright's chromium (`pnpm exec playwright install chromium`) and — only for
// --animate — `ffmpeg` on PATH.
//
// Typical flow when you add or change a component:
//   pnpm storybook:build                          # (re)build the previews
//   pnpm og:build --only=<id|slug> --dry-run      # render to ./.og-out — open and eyeball it
//   pnpm og:build --only=<id|slug>                # upload to R2 + update lib/og-manifest.json
//   git add lib/og-manifest.json                  # commit the new URL
//
// A FULL run (no --only) also prunes manifest entries whose doc no longer resolves (deleted,
// renamed, unpublished). The command exits non-zero if any item fails (it lists them as an
// --only= line to re-run), so failures aren't missed before you commit.
//
// Backfill without wrangler — render everything and upload to R2 by hand:
//   pnpm storybook:build
//   pnpm og:build --no-upload                      # writes ./.og-out/og/<key> + the manifest URLs
//   # sync ./.og-out/og/ to the bucket root (keys match), THEN commit lib/og-manifest.json
//
// If you accidentally uploaded the dry-run flat files (e.g. background__animated-beam__b_v1.png at
// the bucket root) instead of the og/<cat>/<name>.<v>.<hash>.<ext> keys, migrate them in place:
//   pnpm og:migrate                                # re-key on R2 + write lib/og-manifest.json
//   pnpm og:migrate --dry-run                      # show what would move, no uploads
//   pnpm og:migrate --no-upload                    # write ./.og-out/og/<key> + manifest only
// Upload the objects BEFORE deploying the manifest: a committed entry is used even if its URL 404s
// (only a MISSING entry falls back to og.png), so a manifest that points at not-yet-uploaded keys
// would serve broken OG images until the upload lands.
//
// og:image is a STILL PNG by default — no major link-unfurler (X, Facebook, Pinterest, Reddit,
// Slack) animates og:image; they all render a static frame, and animated formats only add file
// size + compatibility risk (Slack drops WebP entirely). Pass --animate to opt into looping GIFs
// (motion auto-detected) for contexts that do animate, e.g. Discord or the site itself.
// Keys are content-addressed: og/<cat>/<name>.<v>.<hash>.<ext> — the hash is the same digest used
// to skip unchanged items, so any change to a component (or variant/template/format) produces a NEW
// immutable URL that the CDN and social scrapers actually refetch. <v> (OG_VERSION, default v1) is a
// manual "re-render everything" lever for a wholesale redesign. Flags: --variant=a|b|c|d|e (default b).
//
// Auth: uploads shell out to wrangler, so it uses your existing wrangler setup. The resolved
// Cloudflare token must have R2 (Object Read & Write) permission.
// Config (optional, has defaults; read from .env / shell):
//   R2_BUCKET (default "animata"), R2_PUBLIC_BASE (default "https://assets.animata.design")

import { execFile, execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { chromium } from "playwright";
import sharp from "sharp";

import { brandedTemplate, ogFontBaseUrl, ogTemplate, pickBrandedFlavor, TEMPLATE_VERSION } from "./lib/og-template.mjs";
import { previewServerPort, startPreviewServer } from "./lib/preview-server.mjs";

const pexec = promisify(execFile);
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PREVIEW_DIR = join(ROOT, "public", "preview");
const DOCS_JSON = join(ROOT, ".velite", "docs.json");
const MANIFEST = join(ROOT, "lib", "og-manifest.json");
const OUT_DIR = join(ROOT, ".og-out");

// Load .env / .env.local for local runs (the shell still wins if a var is already set).
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = join(ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (!m) continue;
      let val = m[2].trim();
      if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1);
      if (process.env[m[1]] === undefined) process.env[m[1]] = val;
    }
  }
}
loadEnv();

const BUCKET = process.env.R2_BUCKET || "animata";
const PUBLIC_BASE = (process.env.R2_PUBLIC_BASE || "https://assets.animata.design").replace(
  /\/$/,
  "",
);
const WRANGLER = existsSync(join(ROOT, "node_modules", ".bin", "wrangler"))
  ? join(ROOT, "node_modules", ".bin", "wrangler")
  : "wrangler";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
// --no-upload renders into an upload-ready ./.og-out/og/<key> tree AND writes the manifest with the
// matching URLs, but skips the wrangler upload — for backfills where you upload to R2 by hand. The
// local files are named by their exact R2 key, so syncing ./.og-out/og/ to the bucket root lands
// every object where the manifest already points.
const NO_UPLOAD = args.includes("--no-upload");
// Re-key flat dry-run uploads (category__name__b_v1.ext at bucket root) to content-addressed
// og/<cat>/<name>.<v>.<hash>.<ext> keys and write the manifest. No Playwright render.
const MIGRATE_FROM_FLAT = args.includes("--migrate-from-flat");
const ONLY = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);
const ONLY_TERMS = ONLY
  ? ONLY.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;
const CONCURRENCY = Number(process.env.OG_CONCURRENCY || 4);
const VARIANT = args.find((a) => a.startsWith("--variant="))?.slice("--variant=".length) || "b";
// Asset version suffix — keys are og/<cat>/<name>.<OG_VERSION>.<hash>.<ext>. Bump (v2, …) to
// re-render everything without colliding with the cached, immutable objects already on R2.
const OG_VERSION = process.env.OG_VERSION || "v1";
// Still PNG by default (best for social og:image). --animate opts into looping GIFs where motion exists.
const ANIMATE = args.includes("--animate");
const FRAMES = Number(process.env.OG_FRAMES || 30);
const FPS = Number(process.env.OG_FPS || 15);
const MOTION_MIN = Number(process.env.OG_MOTION_MIN || 0.006); // min mean grayscale delta = motion
const SETTLE_MS = 800;
const CLIP = { x: 0, y: 0, width: 1200, height: 630 };

const readJSON = (p) => JSON.parse(readFileSync(p, "utf8"));

// Per-slug story id overrides for docs whose <ComponentPreview name> doesn't match any Storybook
// id (name drift) — the auto-resolver can't guess these.
const STORY_OVERRIDES = {
  // doc references widget-vpn-widget--connected, but the story title is "VPN Connection"
  "/docs/widget/vpn-widget": "widget-vpn-connection--connected",
};

// HYBRID FALLBACK — components that don't capture well as a still (scroll-driven, interaction-only,
// idle-empty) render the branded typographic template instead of a component screenshot. Add slugs
// here (or whole categories) as the gallery review surfaces weak captures. Flavor is auto-varied per
// slug. `--all-template` forces every item to the template (to preview the template set wholesale).
const TEMPLATE_SLUGS = new Set([
  "/docs/bento-grid/eight", // tall 8-row grid crops badly as a screenshot → branded template
  "/docs/bento-grid/three", // tall stacked cards crop badly → branded template
]);
const TEMPLATE_CATEGORIES = new Set([
  "text", // text effects don't capture well as a still — render the branded typographic card instead
]);
const FORCE_TEMPLATE = args.includes("--all-template");
const useTemplate = (slug, category) =>
  FORCE_TEMPLATE || TEMPLATE_SLUGS.has(slug) || TEMPLATE_CATEGORIES.has(category);

// Categories whose demos are CONTAINED + centered in the square (side) frame instead of cover-filled
// — for short/wide elements (buttons, toggles) that look stretched or cropped when made to fill.
const CONTAIN_CATEGORIES = new Set(["button"]);
// On the light card, dark demo content is already readable, so no inner surface card is needed.
const SURFACE_CATEGORIES = new Set([]);

// Collect published component docs (/docs/<cat>/<name>) that embed a <ComponentPreview>.
function collectItems() {
  const docs = readJSON(DOCS_JSON);
  const index = readJSON(join(PREVIEW_DIR, "index.json"));
  const entries = index.entries || index.stories || {};
  const ids = new Set(Object.keys(entries));

  // Back-fill only components that are actually published — i.e. their doc source is committed in
  // git. The `published` frontmatter flag alone is not enough: untracked WIP drafts in the working
  // tree inherit published:true but aren't live yet, and must be skipped.
  const tracked = new Set(
    execSync("git ls-files content/docs", { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean),
  );

  const items = [];
  for (const doc of docs) {
    if (!doc.published) continue;
    const parts = doc.slug.split("/").filter(Boolean); // ["docs","background","animated-beam"]
    if (parts.length !== 3 || parts[0] !== "docs") continue;
    const [, category, name] = parts;
    if (!tracked.has(`content/docs/${category}/${name}.mdx`)) continue; // untracked WIP draft

    const match = /<ComponentPreview\s+name="([^"]+)"/.exec(doc.body || "");
    if (!match) continue;
    let storyId = STORY_OVERRIDES[doc.slug] || match[1];
    if (!ids.has(storyId)) {
      const guess = `${category}-${name}--primary`;
      storyId = ids.has(guess)
        ? guess
        : Object.keys(entries).find(
            (id) => id.startsWith(`${category}-${name}--`) && entries[id].type === "story",
          );
    }
    if (!storyId) {
      console.warn(`skip ${doc.slug}: no matching story for "${match[1]}"`);
      continue;
    }

    const entry = entries[storyId] || {};
    items.push({
      slug: doc.slug,
      category,
      name,
      title: doc.title,
      description: doc.description || "",
      labels: doc.labels || [],
      storyId,
      componentPath: entry.componentPath,
      importPath: entry.importPath,
      template: useTemplate(doc.slug, category),
    });
  }
  return ONLY_TERMS
    ? items.filter((i) => ONLY_TERMS.some((t) => i.storyId.includes(t) || i.slug.includes(t)))
    : items;
}

function hashItem(item) {
  const h = createHash("sha256");
  h.update(TEMPLATE_VERSION);
  h.update(VARIANT);
  h.update(ANIMATE ? "anim" : "still");
  h.update(OG_VERSION);
  h.update("gif"); // animated output format — bump invalidates webp-era hashes
  h.update(item.template ? "tpl" : "comp");
  if (item.template) {
    // Branded template depends on its text + flavor, not the component source.
    h.update(pickBrandedFlavor(item.slug));
    h.update(`${item.title}|${item.category}|${item.description}`);
  } else {
    for (const rel of [item.componentPath, item.importPath]) {
      if (!rel) continue;
      const abs = join(ROOT, rel.replace(/^\.\//, ""));
      if (existsSync(abs)) h.update(readFileSync(abs));
    }
  }
  return h.digest("hex").slice(0, 16);
}

// Inside the story iframe: make the canvas transparent AND replace Storybook's shrink-wrapping
// `layout:"centered"` + the ThemeWrapper's 4rem padding with a definite full-size centered stage.
// Without this, `w-full`/container-query demos (collab-card) collapse to ~0 and short/wide demos
// (marquee) float in whitespace and clip. The stage gives every demo the full frame to fill.
const STAGE_CSS = `
  html,body,.sb-show-main,#storybook-root,#root{background:transparent !important}
  html,body{width:100% !important;height:100% !important;margin:0 !important;overflow:hidden !important}
  .sb-show-main{display:flex !important;align-items:center;justify-content:center;width:100% !important;height:100% !important;min-height:0 !important;padding:0 !important;box-sizing:border-box}
  #storybook-root,#root{width:100% !important;height:100% !important;display:flex !important;align-items:center;justify-content:center}
  /* ThemeWrapper decorator (its inline 4rem padding) — let demos fill the stage instead */
  #storybook-root>div,#root>div{width:100%;height:100%;padding:24px !important;display:flex;align-items:center;justify-content:center;box-sizing:border-box}
`;

// Load the story, measure its aspect to pick a layout, render the branded card, and leave the
// page ready to screenshot (Storybook canvas transparent, brand fonts loaded).
async function prepareCard(page, item, port) {
  const storyUrl = `http://127.0.0.1:${port}/iframe.html?id=${item.storyId}&viewMode=story`;

  // Pass 1 — load the story alone and measure its content's aspect ratio to pick a layout.
  await page.goto(storyUrl, { waitUntil: "networkidle" });
  await page
    .locator("#storybook-root, #root")
    .first()
    .waitFor({ state: "visible", timeout: 20000 });
  await page.waitForTimeout(250);
  const dim = await page.evaluate(() => {
    const root = document.querySelector("#storybook-root") || document.querySelector("#root");
    if (!root) return { w: 1, h: 1 };
    const wrap = root.firstElementChild; // ThemeWrapper (padding) decorator
    const el = wrap?.firstElementChild || wrap || root;
    const r = el.getBoundingClientRect();
    return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
  });
  // Contain categories (buttons) always use the square side frame with the demo centered;
  // everything else picks side vs stacked by the demo's aspect ratio.
  const contain = CONTAIN_CATEGORIES.has(item.category);
  const surface = SURFACE_CATEGORIES.has(item.category);
  const layout = contain ? "side" : dim.w / dim.h >= 1.5 ? "stacked" : "side";

  // Pass 2 — render the chosen card with the demo in a transparent-canvas iframe.
  await page.setContent(
    ogTemplate({ ...item, layout, variant: VARIANT, storyUrl, fontBaseUrl: ogFontBaseUrl(port) }),
    { waitUntil: "load" },
  );
  await page
    .frameLocator("iframe")
    .locator("#storybook-root, #root")
    .first()
    .waitFor({ state: "visible", timeout: 20000 });
  // the child iframe only — after setContent the main frame's URL is also …/iframe.html
  const frame = page
    .frames()
    .find((f) => f !== page.mainFrame() && f.url().includes("/iframe.html"));
  await frame?.addStyleTag({ content: STAGE_CSS }).catch(() => {});

  // Measure the demo's rendered aspect, then size its frame to match — so the demo fills the frame
  // with NO crop and no dotted-canvas margin; the leftover region around it is the card's dark bg.
  // Buttons (contain) keep the full square frame and center the demo inside it instead.
  const aspect = contain
    ? null
    : await frame
        ?.evaluate(() => {
          const root = document.querySelector("#storybook-root") || document.querySelector("#root");
          const demo = root?.firstElementChild?.firstElementChild;
          const r = demo?.getBoundingClientRect();
          return r && r.width && r.height ? r.width / r.height : null;
        })
        .catch(() => null);

  await page
    .evaluate(({ a, isContain, hasSurface }) => {
      const region = document.querySelector(".frame-region");
      const frameEl = document.querySelector(".frame");
      if (!region || !frameEl) return;
      if (isContain) {
        // Contained demo sits in the square region. Surface categories (text, list) get a light
        // rounded card so dark content reads on the dark bg; buttons stay transparent (no ghost box).
        if (hasSurface) {
          frameEl.style.background = "#f2f2f5"; // light neutral — readable for dark text, gives white-bg demos contrast
          frameEl.style.borderRadius = "24px";
        } else {
          frameEl.style.boxShadow = "none";
        }
        return;
      }
      if (!a) return;
      const rw = region.clientWidth;
      const rh = region.clientHeight;
      let w = rw;
      let h = rw / a;
      if (h > rh) {
        h = rh;
        w = rh * a;
      }
      frameEl.style.width = `${Math.round(w)}px`;
      frameEl.style.height = `${Math.round(h)}px`;
    }, { a: aspect, isContain: contain, hasSurface: surface })
    .catch(() => {});
  await page.waitForTimeout(150); // let the iframe reflow at the new frame size

  // Fill the (aspect-matched) frame, or — for buttons — contain the demo centered in the square frame.
  await frame
    ?.evaluate((contain) => {
      const root = document.querySelector("#storybook-root") || document.querySelector("#root");
      const wrap = root?.firstElementChild; // ThemeWrapper (flex-centered, full-size stage)
      const demo = wrap?.firstElementChild; // the demo's root element
      if (!demo) return;
      wrap.style.padding = "0";
      const r = demo.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (contain) {
        const scale = Math.min((W * 0.9) / r.width, (H * 0.9) / r.height); // fit + ~10% margin
        demo.style.transformOrigin = "center center";
        demo.style.transform = `scale(${scale})`;
      } else {
        const scale = Math.max(W / r.width, H / r.height); // fill the aspect-matched frame
        if (scale > 1.001) {
          demo.style.transformOrigin = "center center";
          demo.style.transform = `scale(${scale})`;
        }
      }
    }, contain)
    .catch(() => {});
  // Wait for the demo's images (album art, photos, unsplash) to actually load before shooting —
  // otherwise image-heavy widgets (music-widget, clock-with-photo, shape-shifter) render blank.
  await frame
    ?.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete && img.naturalWidth
            ? null
            : new Promise((res) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", res, { once: true });
                setTimeout(res, 5000);
              }),
        ),
      );
    })
    .catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {}); // brand fonts loaded
  await page.waitForTimeout(SETTLE_MS);
}

// Final PNG: captured at 2x (deviceScaleFactor 2) for crisp supersampled text, then downscaled to
// the 1200x630 OG spec and re-compressed losslessly. Drops ~4x of wasted pixels — e.g. 929KB→85KB —
// with no color loss or gradient banding. (For TinyPNG-style lossy palette, swap to
// `.png({ palette: true, quality: 82, dither: 1, effort: 10 })`.)
const still = async (page) => {
  const buf = await page.screenshot({ clip: CLIP, animations: "disabled", type: "png" });
  return sharp(buf).resize(1200, 630, { fit: "fill" }).png({ compressionLevel: 9, effort: 10 }).toBuffer();
};

// Mean grayscale delta between two frames (0–255). Sensitive to thin/faint motion.
async function motionScore(a, b) {
  const small = (buf) => sharp(buf).greyscale().resize(200, 105, { fit: "fill" }).raw().toBuffer();
  const [ra, rb] = await Promise.all([small(a), small(b)]);
  let sum = 0;
  for (let i = 0; i < ra.length; i++) sum += Math.abs(ra[i] - rb[i]);
  return sum / ra.length;
}

// Render the card. In animate mode, probe for motion: static/interaction-only components fall back
// to a still PNG; genuinely animated ones are captured as a short looping GIF (ffmpeg).
async function renderItem(page, item, port) {
  // Hybrid fallback: branded typographic card, no component screenshot (always a still PNG).
  if (item.template) {
    await page.setContent(
      brandedTemplate({
        slug: item.slug,
        title: item.title,
        category: item.category,
        description: item.description,
        flavor: pickBrandedFlavor(item.slug),
        fontBaseUrl: ogFontBaseUrl(port),
      }),
      { waitUntil: "load" },
    );
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.waitForTimeout(300);
    return { buf: await still(page), ext: "png" };
  }

  await prepareCard(page, item, port);
  if (!ANIMATE) return { buf: await still(page), ext: "png" };

  // Probe over ~1.2s so slow loops (faint beams, long eases) aren't mistaken for static.
  const f0 = await page.screenshot({ clip: CLIP, type: "png" });
  let moved = 0;
  for (let i = 0; i < 3; i++) {
    await page.waitForTimeout(400);
    const f = await page.screenshot({ clip: CLIP, type: "png" });
    moved = Math.max(moved, await motionScore(f0, f));
  }
  if (moved <= MOTION_MIN) return { buf: await still(page), ext: "png" };

  const dir = mkdtempSync(join(tmpdir(), "oganim-"));
  try {
    for (let i = 0; i < FRAMES; i++) {
      const buf = await page.screenshot({ clip: CLIP, type: "png" }); // animations live (not frozen)
      writeFileSync(join(dir, `f-${String(i).padStart(4, "0")}.png`), buf);
      await page.waitForTimeout(Math.round(1000 / FPS));
    }
    // Animated GIF via two-pass palette (palettegen + paletteuse) — broader social-card support
    // than animated WebP. scale=…:flags=lanczos keeps edges crisp at the 1200x630 OG size.
    const outGif = join(dir, "out.gif");
    const palette = join(dir, "palette.png");
    const scale = "scale=1200:630:flags=lanczos";
    const ff = (extra) =>
      pexec("ffmpeg", [
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-framerate",
        String(FPS),
        "-i",
        join(dir, "f-%04d.png"),
        ...extra,
      ]);
    await ff(["-vf", `${scale},palettegen=stats_mode=diff`, palette]);
    await ff([
      "-i",
      palette,
      "-lavfi",
      `${scale}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle`,
      "-loop",
      "0",
      outGif,
    ]);
    return { buf: readFileSync(outGif), ext: "gif" };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Upload an object to R2 via wrangler (uses your wrangler auth; the token needs R2 write).
async function uploadToR2(key, buf, contentType) {
  const dir = mkdtempSync(join(tmpdir(), "og-"));
  const tmp = join(dir, "asset");
  writeFileSync(tmp, buf);
  try {
    await pexec(WRANGLER, [
      "r2",
      "object",
      "put",
      `${BUCKET}/${key}`,
      "-f",
      tmp,
      "--ct",
      contentType,
      "--cc",
      "public,max-age=31536000,immutable",
    ]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Fail fast BEFORE rendering anything: --animate needs ffmpeg, and real (non-dry) runs need a
// working wrangler auth — otherwise we'd render every card and only then fail on the first encode
// or the first upload, wasting the whole run.
async function preflight() {
  const ogFontsDir = join(ROOT, "public", "og-fonts");
  if (!existsSync(join(ogFontsDir, "outfit-latin-600-normal.woff2"))) {
    throw new Error(
      "public/og-fonts/ missing — run `pnpm og:fonts:sync` after install to copy self-hosted fonts.",
    );
  }
  if (ANIMATE) {
    try {
      await pexec("ffmpeg", ["-version"]);
    } catch {
      throw new Error("--animate needs `ffmpeg` on PATH (not found). Install it, or drop --animate.");
    }
  }
  if (!DRY_RUN && !NO_UPLOAD) {
    try {
      await pexec(WRANGLER, ["whoami"]);
    } catch (err) {
      throw new Error(
        `wrangler auth check failed (\`wrangler whoami\`): ${err.message?.split("\n")[0]}. ` +
          "Run `wrangler login` (token needs R2 Object Read & Write), or pass --dry-run / --no-upload.",
      );
    }
  }
}

// Renders can flake (a bad canvas frame, a slow story load, a transient font fetch) — retry once
// before counting it a failure.
async function renderWithRetry(page, item, port) {
  try {
    return await renderItem(page, item, port);
  } catch (err) {
    console.warn(`  retry ${item.storyId}: ${err.message?.split("\n")[0]}`);
    return await renderItem(page, item, port);
  }
}

function flatAssetName(item, ext) {
  return `${item.category}__${item.name}__${VARIANT}_${OG_VERSION}.${ext}`;
}

function contentAddressedKey(item, hash, ext) {
  return `og/${item.category}/${item.name}.${OG_VERSION}.${hash}.${ext}`;
}

async function readFlatAsset(item) {
  for (const ext of ["png", "gif"]) {
    const local = join(OUT_DIR, flatAssetName(item, ext));
    if (existsSync(local)) {
      return { buf: readFileSync(local), ext, source: local };
    }
    const url = `${PUBLIC_BASE}/${flatAssetName(item, ext)}`;
    try {
      const head = await fetch(url, { method: "HEAD" });
      if (!head.ok) continue;
      const res = await fetch(url);
      if (!res.ok) continue;
      return { buf: Buffer.from(await res.arrayBuffer()), ext, source: url };
    } catch {
      /* try next ext */
    }
  }
  return null;
}

function writeManifestFile(manifest, items) {
  let pruned = 0;
  if (!ONLY_TERMS) {
    const live = new Set(items.map((i) => i.slug));
    for (const slug of Object.keys(manifest)) {
      if (!live.has(slug)) {
        delete manifest[slug];
        pruned++;
        console.log(`  pruned stale manifest entry ${slug}`);
      }
    }
  }
  mkdirSync(join(ROOT, "lib"), { recursive: true });
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`OG: wrote ${MANIFEST}`);
  return pruned;
}

// Move legacy flat uploads (dry-run filenames at the bucket root) onto the content-addressed keys
// the site manifest expects. Prefers local ./.og-out/<flat> over fetching from the CDN.
async function migrateFromFlat(items) {
  console.log(
    `OG migrate: ${items.length} component doc(s)${ONLY ? ` matching "${ONLY}"` : ""}${DRY_RUN ? " [dry-run]" : NO_UPLOAD ? " [no-upload]" : ""}`,
  );
  await preflight();
  if (DRY_RUN || NO_UPLOAD) mkdirSync(OUT_DIR, { recursive: true });

  const manifest = existsSync(MANIFEST) ? readJSON(MANIFEST) : {};
  let migrated = 0;
  let skipped = 0;
  const failedItems = [];

  for (const item of items) {
    const hash = hashItem(item);
    if (!DRY_RUN && manifest[item.slug]?.hash === hash) {
      skipped++;
      continue;
    }
    const asset = await readFlatAsset(item);
    if (!asset) {
      failedItems.push(item.slug);
      console.warn(`  MISSING flat asset for ${item.slug} (expected ${flatAssetName(item, "png")})`);
      continue;
    }
    const key = contentAddressedKey(item, hash, asset.ext);
    try {
      if (DRY_RUN) {
        console.log(
          `  would migrate ${item.slug} <- ${asset.source} -> ${key} (${(asset.buf.length / 1024).toFixed(0)}KB)`,
        );
      } else if (NO_UPLOAD) {
        const out = join(OUT_DIR, key);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, asset.buf);
        manifest[item.slug] = { url: `${PUBLIC_BASE}/${key}`, hash };
        console.log(`  wrote ${key} from flat asset`);
      } else {
        await uploadToR2(key, asset.buf, asset.ext === "gif" ? "image/gif" : "image/png");
        manifest[item.slug] = { url: `${PUBLIC_BASE}/${key}`, hash };
        console.log(`  migrated ${key} <- ${asset.source}`);
      }
      migrated++;
    } catch (err) {
      failedItems.push(item.slug);
      console.warn(`  FAILED ${item.slug}: ${err.message?.split("\n")[0]}`);
    }
  }

  let pruned = 0;
  if (!DRY_RUN) pruned = writeManifestFile(manifest, items);
  console.log(
    `OG migrate done — migrated ${migrated}, skipped ${skipped}, pruned ${pruned}, failed ${failedItems.length}`,
  );
  if (failedItems.length) {
    console.warn(`OG: re-run the failures with --only=${failedItems.join(",")}`);
    process.exitCode = 1;
  }
}

async function main() {
  if (!existsSync(join(PREVIEW_DIR, "index.json"))) {
    throw new Error("public/preview/index.json missing — run `pnpm storybook:build` first");
  }
  const items = collectItems();
  if (MIGRATE_FROM_FLAT) {
    await migrateFromFlat(items);
    return;
  }
  console.log(
    `OG: ${items.length} component doc(s)${ONLY ? ` matching "${ONLY}"` : ""}${DRY_RUN ? " [dry-run]" : ""}`,
  );
  if (!items.length) return;
  await preflight();
  if (DRY_RUN || NO_UPLOAD) mkdirSync(OUT_DIR, { recursive: true });

  const server = await startPreviewServer(PREVIEW_DIR);
  const port = previewServerPort(server);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });

  const manifest = existsSync(MANIFEST) ? readJSON(MANIFEST) : {};
  let made = 0;
  let skipped = 0;
  const failedItems = [];

  const queue = [...items];
  const worker = async () => {
    const page = await context.newPage();
    while (queue.length) {
      const item = queue.shift();
      const hash = hashItem(item);
      try {
        if (!DRY_RUN && manifest[item.slug]?.hash === hash) {
          skipped++;
          continue;
        }
        const { buf, ext } = await renderWithRetry(page, item, port);
        // Content-addressed: the hash is part of the key, so a changed component lands on a NEW
        // immutable URL (the old object stays cached harmlessly) instead of overwriting one the
        // CDN/scrapers will never refetch.
        const key = contentAddressedKey(item, hash, ext);
        if (DRY_RUN) {
          const out = join(OUT_DIR, `${item.category}__${item.name}__${VARIANT}_${OG_VERSION}.${ext}`);
          writeFileSync(out, buf);
          console.log(`  rendered ${item.storyId} -> ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
        } else if (NO_UPLOAD) {
          // Mirror the R2 key under .og-out/ so the whole og/ tree can be synced to the bucket
          // root as-is, and record the URL it will live at (you upload the files yourself).
          const out = join(OUT_DIR, key);
          mkdirSync(dirname(out), { recursive: true });
          writeFileSync(out, buf);
          manifest[item.slug] = { url: `${PUBLIC_BASE}/${key}`, hash };
          console.log(`  wrote ${key} (local — upload pending)`);
        } else {
          await uploadToR2(key, buf, ext === "gif" ? "image/gif" : "image/png");
          manifest[item.slug] = { url: `${PUBLIC_BASE}/${key}`, hash };
          console.log(`  uploaded ${key}`);
        }
        made++;
      } catch (err) {
        failedItems.push(item.slug);
        console.warn(
          `  FAILED ${item.storyId}: ${err.message?.split("\n")[0]} (falls back to og.png)`,
        );
      }
    }
    await page.close();
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, worker));

  await browser.close();
  server.close();

  let pruned = 0;
  if (!DRY_RUN) pruned = writeManifestFile(manifest, items);
  console.log(
    `OG done — made ${made}, skipped ${skipped}, pruned ${pruned}, failed ${failedItems.length}`,
  );
  if (failedItems.length) {
    // Surface exactly what to re-run, and exit non-zero so the failures aren't missed before commit.
    console.warn(`OG: re-run the failures with --only=${failedItems.join(",")}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
