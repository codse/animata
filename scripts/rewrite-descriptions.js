import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "content", "docs");
const DRY_RUN = process.argv.includes("--dry");
const MIN_LENGTH = 80;

const CATEGORY_PHRASES = {
  accordion: { noun: "accordion", use: "FAQs, expandable sections, and grouped content" },
  background: { noun: "background", use: "hero sections, landing pages, and decorative surfaces" },
  "bento-grid": { noun: "bento grid", use: "feature showcases and modular landing layouts" },
  button: { noun: "button", use: "CTAs, forms, and interactive elements" },
  card: { noun: "card", use: "content previews, product displays, and dashboards" },
  carousel: { noun: "carousel", use: "galleries, testimonials, and product tours" },
  container: { noun: "container", use: "scrolling sections, marquees, and content wrappers" },
  fabs: { noun: "floating action button", use: "quick actions and compact menus" },
  "feature-cards": { noun: "feature card", use: "marketing pages and product landings" },
  graphs: { noun: "chart", use: "dashboards, analytics views, and stats displays" },
  hero: { noun: "hero section", use: "landing pages and marketing sites" },
  icon: { noun: "icon", use: "navbars, footers, and social links" },
  image: { noun: "image", use: "galleries, portfolios, and media showcases" },
  list: { noun: "list", use: "timelines, activity feeds, and structured content" },
  overlay: { noun: "overlay", use: "modals, drawers, and dialogs" },
  preloader: { noun: "preloader", use: "loading screens and transitions" },
  progress: { noun: "progress indicator", use: "onboarding flows, step trackers, and uploads" },
  section: { noun: "section", use: "pricing pages, features, and landing blocks" },
  skeleton: { noun: "skeleton loader", use: "placeholder states during data fetching" },
  tabs: { noun: "tabs", use: "navigation, filters, and content toggles" },
  text: { noun: "text effect", use: "headings, hero copy, and attention-grabbing labels" },
  widget: { noun: "widget", use: "dashboards, profile pages, and metric displays" },
};

const TECH_PATTERNS = [
  { match: /from ["']motion\/react["']/, phrase: "smooth Motion animations" },
  { match: /@tsparticles/, phrase: "particle effects" },
  { match: /@xyflow\/react/, phrase: "node-based flow diagrams" },
  { match: /@radix-ui/, phrase: "accessible Radix primitives" },
  { match: /lucide-react/, phrase: "Lucide icons" },
  { match: /cmdk/, phrase: "command menu support" },
];

const INTERACTION_PATTERNS = [
  { match: /onMouseEnter|onHover|:hover/, phrase: "hover interactions" },
  { match: /useMousePosition/, phrase: "mouse-following effects" },
  { match: /onClick.*setState|useState.*boolean/, phrase: "toggle states" },
  { match: /setTimeout|useInterval/, phrase: "timed animations" },
  { match: /onScroll|useScroll/, phrase: "scroll-driven effects" },
];

const VISUAL_PATTERNS = [
  { match: /bg-(?:linear-)?gradient|bg-gradient/, phrase: "gradient styling" },
  { match: /backdrop-blur|bg-clip-text/, phrase: "glass-morphism styling" },
  { match: /rotate-|rotate3d|perspective/, phrase: "3D transforms" },
  { match: /shadow-(?:lg|xl|2xl)/, phrase: "layered shadows" },
];

function parseFrontmatter(src) {
  const normalized = src.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { raw: null, data: {} };
  const data = {};
  for (const line of match[1].split("\n")) {
    const eq = line.indexOf(":");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[key] = value;
  }
  return { raw: match[0], data };
}

function extractSourceRef(mdx) {
  const m = mdx.match(/```[a-z]+\s+file=<rootDir>\/([^\s`]+)/);
  return m ? m[1] : null;
}

function detectFeatures(source) {
  const features = new Set();
  for (const { match, phrase } of TECH_PATTERNS) if (match.test(source)) features.add(phrase);
  for (const { match, phrase } of INTERACTION_PATTERNS)
    if (match.test(source)) features.add(phrase);
  for (const { match, phrase } of VISUAL_PATTERNS) if (match.test(source)) features.add(phrase);
  return [...features];
}

function clampSmart(str, max = 158) {
  if (str.length <= max) return str;
  const slice = str.slice(0, max);
  const sentenceEnd = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("? "),
    slice.lastIndexOf("! "),
  );
  if (sentenceEnd > 60) return `${slice.slice(0, sentenceEnd + 1)}`;
  const wordEnd = slice.lastIndexOf(" ");
  return `${slice.slice(0, wordEnd > 40 ? wordEnd : max - 1).replace(/[,.;:]$/, "")}.`;
}

function compose({ title, category, labels, features, existing }) {
  const cat = CATEGORY_PHRASES[category] || { noun: category, use: "modern web interfaces" };

  let lead;
  if (existing && existing.length >= 20) {
    lead = existing.replace(/[.!?]\s*$/, "");
  } else {
    const cleanTitle = title.replace(new RegExp(`\\s+${cat.noun}\\b`, "i"), "").trim() || title;
    lead = `An animated ${cleanTitle} ${cat.noun} React component`;
  }

  const alreadyMentionsFeature = /\b(with|using|powered by|built with)\b/i.test(lead);
  const featurePart =
    !alreadyMentionsFeature && features.length
      ? ` with ${features.slice(0, 2).join(" and ")}`
      : !alreadyMentionsFeature && labels?.includes("hover")
        ? " with hover interactions"
        : "";

  const full = `${lead}${featurePart} — built with Tailwind CSS for ${cat.use}.`;
  if (full.length <= 158) return full;

  const short = `${lead}${featurePart} — built with Tailwind CSS.`;
  if (short.length <= 158) return short;

  return clampSmart(`${lead} — built with Tailwind CSS for ${cat.use}.`);
}

function rewriteDescription(mdxPath) {
  const raw = fs.readFileSync(mdxPath, "utf8");
  const { raw: fmBlock, data } = parseFrontmatter(raw);
  if (!fmBlock) return { changed: false, reason: "no frontmatter" };
  if (data.published === "false") return { changed: false, reason: "unpublished" };

  const rel = path.relative(DOCS_DIR, mdxPath);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return { changed: false, reason: "root doc" };
  const category = parts[0];

  const existing = data.description || "";
  if (existing.length >= MIN_LENGTH && existing.length <= 158) {
    return { changed: false, reason: "already good" };
  }

  let next;
  if (existing.length > 158) {
    next = clampSmart(existing, 158);
  } else {
    const sourceRef = extractSourceRef(raw);
    const source = sourceRef
      ? fs.existsSync(sourceRef)
        ? fs.readFileSync(sourceRef, "utf8")
        : ""
      : "";
    const features = detectFeatures(source);
    next = compose({
      title: data.title || parts[parts.length - 1].replace(/\.mdx$/, ""),
      category,
      labels: data.labels,
      features,
      existing,
    });
  }

  if (next === existing) return { changed: false, reason: "unchanged" };

  const fmStart = raw.indexOf("---");
  const fmEnd = raw.indexOf("\n---", fmStart + 3);
  if (fmStart !== 0 || fmEnd === -1) return { changed: false, reason: "bad frontmatter" };

  const fmInner = raw.slice(4, fmEnd);
  const fmLines = fmInner.split("\n");
  const descIdx = fmLines.findIndex((l) => /^description:/.test(l));

  let newFmInner;
  if (descIdx !== -1) {
    const filtered = fmLines.filter((l, i) => i === descIdx || !/^description:/.test(l));
    filtered[descIdx] = `description: ${next}`;
    newFmInner = filtered.join("\n");
  } else {
    const titleIdx = fmLines.findIndex((l) => /^title:/.test(l));
    const insertAt = titleIdx === -1 ? 0 : titleIdx + 1;
    fmLines.splice(insertAt, 0, `description: ${next}`);
    newFmInner = fmLines.join("\n");
  }

  const nextRaw = `---\n${newFmInner}${raw.slice(fmEnd)}`;
  if (nextRaw === raw) return { changed: false, reason: "unchanged" };

  if (!DRY_RUN) fs.writeFileSync(mdxPath, nextRaw);
  return { changed: true, from: existing, to: next, added: descIdx === -1 };
}

function walkMdx(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "contributing") continue;
      walkMdx(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      if (["index.mdx", "setup.mdx", "changelog.mdx"].includes(entry.name)) continue;
      acc.push(full);
    }
  }
  return acc;
}

const files = walkMdx(DOCS_DIR);
let changed = 0;
for (const f of files) {
  const res = rewriteDescription(f);
  if (res.changed) {
    changed++;
    if (DRY_RUN) {
      console.log(`\n${path.relative(ROOT, f)}`);
      console.log(`  was: ${JSON.stringify(res.from)} (${res.from.length}c)`);
      console.log(`  now: ${JSON.stringify(res.to)} (${res.to.length}c)`);
    }
  }
}
console.log(`\n${DRY_RUN ? "[dry-run] would update" : "updated"} ${changed} files`);
