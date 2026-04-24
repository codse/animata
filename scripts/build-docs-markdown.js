import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "content", "docs");
const OUT_DIR = path.join(ROOT, "public", "docs");
const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://animata.design").replace(/\/$/, "");

const SKIP_FILES = new Set(["index.mdx", "setup.mdx", "changelog.mdx"]);
const SKIP_DIRS = new Set(["contributing"]);

function walkMdx(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkMdx(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      if (SKIP_FILES.has(entry.name)) continue;
      acc.push(full);
    }
  }
  return acc;
}

function parseFrontmatter(src) {
  const normalized = src.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: normalized };
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
  return { data, body: normalized.slice(match[0].length).replace(/^\n+/, "") };
}

function resolveSourceBlocks(mdx) {
  return mdx.replace(/```(\w+)\s+file=<rootDir>\/([^\s`]+)\s*\n([\s\S]*?)```/g, (_, lang, ref) => {
    const abs = path.join(ROOT, ref);
    try {
      const src = fs.readFileSync(abs, "utf8");
      return `\`\`\`${lang}\n${src.trimEnd()}\n\`\`\``;
    } catch {
      return `\`\`\`${lang}\n// source unavailable: ${ref}\n\`\`\``;
    }
  });
}

function stripJsx(mdx, { siteUrl }) {
  return mdx
    .replace(/<ComponentPreview[^/>]*\/>/g, "")
    .replace(
      /<RegistryInstall\s+category="([^"]+)"\s+name="([^"]+)"\s*\/>/g,
      (_, cat, n) => `\`\`\`bash\npnpm dlx shadcn@latest add ${siteUrl}/r/${cat}/${n}.json\n\`\`\``,
    )
    .replace(/<Step>([\s\S]*?)<\/Step>/g, "**$1**")
    .replace(/<Steps>\s*/g, "")
    .replace(/\s*<\/Steps>/g, "")
    .replace(/\{" "\}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toMarkdown(mdxPath) {
  const raw = fs.readFileSync(mdxPath, "utf8");
  const { data, body } = parseFrontmatter(raw);
  if (data.published === "false") return null;

  const rel = path.relative(DOCS_DIR, mdxPath);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return null;
  const category = parts[0];
  const name = parts[parts.length - 1].replace(/\.mdx$/, "");
  const slug = `${category}/${name}`;

  const resolved = resolveSourceBlocks(body);
  const stripped = stripJsx(resolved, { siteUrl: SITE_URL });

  const header = [
    `# ${data.title || name}`,
    "",
    data.description ? `> ${data.description}` : null,
    "",
    `**URL**: ${SITE_URL}/docs/${slug}`,
    `**Registry**: \`${SITE_URL}/r/${slug}.json\``,
    data.author ? `**Author**: ${data.author}` : null,
    Array.isArray(data.labels) && data.labels.length
      ? `**Labels**: ${data.labels.join(", ")}`
      : null,
    "",
    "---",
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { category, name, slug, data, markdown: `${header}${stripped}\n` };
}

function main() {
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const mdxFiles = walkMdx(DOCS_DIR);
  let written = 0;
  for (const mdxPath of mdxFiles) {
    const result = toMarkdown(mdxPath);
    if (!result) continue;
    const outDir = path.join(OUT_DIR, result.category);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${result.name}.md`), result.markdown);
    written++;
  }
  console.log(`docs markdown: wrote ${written} files to public/docs/`);
}

main();
