import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOCS_MD_DIR = path.join(ROOT, "public", "docs");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://animata.design").replace(/\/$/, "");

const CATEGORY_ORDER = [
  { slug: "text", title: "Text" },
  { slug: "background", title: "Background" },
  { slug: "image", title: "Image" },
  { slug: "list", title: "List" },
  { slug: "container", title: "Container" },
  { slug: "accordion", title: "Accordion" },
  { slug: "card", title: "Card" },
  { slug: "tabs", title: "Tabs" },
  { slug: "section", title: "Section" },
  { slug: "icon", title: "Icon" },
  { slug: "preloader", title: "PreLoader" },
  { slug: "progress", title: "Progress" },
  { slug: "graphs", title: "Graphs & Charts" },
  { slug: "overlay", title: "Overlay" },
  { slug: "button", title: "Button" },
  { slug: "widget", title: "Widget" },
  { slug: "bento-grid", title: "Bento Grid" },
  { slug: "hero", title: "Hero" },
  { slug: "carousel", title: "Carousel" },
  { slug: "skeleton", title: "Skeleton" },
  { slug: "feature-cards", title: "Feature Cards" },
  { slug: "fabs", title: "Floating Action Buttons" },
];

function collectDocs() {
  const byCategory = new Map();
  if (!fs.existsSync(DOCS_MD_DIR)) return byCategory;
  for (const categoryEntry of fs.readdirSync(DOCS_MD_DIR, { withFileTypes: true })) {
    if (!categoryEntry.isDirectory()) continue;
    const categoryDir = path.join(DOCS_MD_DIR, categoryEntry.name);
    const items = [];
    for (const file of fs.readdirSync(categoryDir)) {
      if (!file.endsWith(".md")) continue;
      const name = file.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(categoryDir, file), "utf8");
      const titleMatch = content.match(/^# (.+)$/m);
      const descMatch = content.match(/^> (.+)$/m);
      items.push({
        name,
        title: titleMatch ? titleMatch[1].trim() : name,
        description: descMatch ? descMatch[1].trim() : "",
        url: `${SITE_URL}/docs/${categoryEntry.name}/${name}.md`,
        docUrl: `${SITE_URL}/docs/${categoryEntry.name}/${name}`,
        content,
      });
    }
    items.sort((a, b) => a.title.localeCompare(b.title));
    byCategory.set(categoryEntry.name, items);
  }
  return byCategory;
}

function buildIndex(byCategory) {
  const lines = [
    "# Animata",
    "",
    "> Hand-crafted, animated React components built with Tailwind CSS v4 — free and open source. Install any component with the shadcn CLI or copy/paste the source.",
    "",
    "Animata is a library of ~130 production-ready animated UI primitives: buttons, cards, widgets, backgrounds, text effects, hero sections, and more. Every component ships with source code, install instructions, and a live preview.",
    "",
    `- Home: ${SITE_URL}`,
    `- Docs: ${SITE_URL}/docs`,
    `- GitHub: https://github.com/codse/animata`,
    `- Registry (shadcn CLI): ${SITE_URL}/r/{category}/{component}.json`,
    "",
    `Install any component with: \`pnpm dlx shadcn@latest add ${SITE_URL}/r/{category}/{component}.json\``,
    "",
  ];

  for (const { slug, title } of CATEGORY_ORDER) {
    const items = byCategory.get(slug);
    if (!items || items.length === 0) continue;
    lines.push(`## ${title}`);
    lines.push("");
    for (const item of items) {
      const desc = item.description ? `: ${item.description}` : "";
      lines.push(`- [${item.title}](${item.url})${desc}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildFull(byCategory, index) {
  const parts = [index, "", "---", ""];
  for (const { slug, title } of CATEGORY_ORDER) {
    const items = byCategory.get(slug);
    if (!items || items.length === 0) continue;
    parts.push(`# ${title}`, "");
    for (const item of items) {
      parts.push(item.content.trim(), "", "---", "");
    }
  }
  return parts.join("\n");
}

function main() {
  const byCategory = collectDocs();
  const index = buildIndex(byCategory);
  const full = buildFull(byCategory, index);

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), `${index}\n`);
  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), `${full}\n`);

  const indexKb = (Buffer.byteLength(index) / 1024).toFixed(1);
  const fullKb = (Buffer.byteLength(full) / 1024).toFixed(1);
  console.log(`llms: wrote llms.txt (${indexKb} KB) and llms-full.txt (${fullKb} KB)`);
}

main();
