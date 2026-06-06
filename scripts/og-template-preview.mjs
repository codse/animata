// Design-review harness for the branded (no-component) OG template. Renders each flavor (a/b/c)
// for a few sample components to ./.og-out/templates/ so we can pick the look before wiring it into
// the hybrid pipeline. Not part of any build.  Run: node ./scripts/og-template-preview.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

import { brandedTemplate } from "./lib/og-template.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, ".og-out", "templates");

const SAMPLES = [
  {
    slug: "/docs/scroll/pinned-product-tour",
    title: "Pinned Product Tour",
    category: "scroll",
    description: "Scroll-pinned sections that swap as the reader moves down the page.",
  },
  {
    slug: "/docs/card/collab-card",
    title: "Collab Card",
    category: "card",
    description: "Bento tile for realtime collaboration — live presence and teammate cursors.",
  },
  {
    slug: "/docs/text/typing-text",
    title: "Typing Text",
    category: "text",
    description: "Typewriter effect that types and deletes phrases on a loop.",
  },
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  for (const s of SAMPLES) {
    for (const flavor of ["a", "b", "c"]) {
      await page.setContent(brandedTemplate({ ...s, flavor }), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts?.ready).catch(() => {});
      await page.waitForTimeout(300);
      const out = join(OUT, `${s.category}__${s.title.replace(/\s+/g, "-").toLowerCase()}__${flavor}.png`);
      await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 }, type: "png" });
      console.log("  rendered", out);
    }
  }

  await browser.close();
  console.log(`templates -> ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
