import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

const MARKER = "<RegistryInstall";
const INSTALL_HEADING = "## Installation";

function walkMdx(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, acc);
    else if (entry.isFile() && entry.name.endsWith(".mdx")) acc.push(full);
  }
  return acc;
}

function transform(mdxPath) {
  const src = fs.readFileSync(mdxPath, "utf8");
  if (src.includes(MARKER)) return { changed: false, reason: "already has RegistryInstall" };

  const installIdx = src.indexOf(INSTALL_HEADING);
  if (installIdx === -1) return { changed: false, reason: "no Installation section" };

  if (!src.includes("<Steps>")) return { changed: false, reason: "no Steps block" };

  const rel = path.relative(DOCS_DIR, mdxPath);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return { changed: false, reason: "root-level doc" };
  const category = parts[0];
  const name = parts[parts.length - 1].replace(/\.mdx$/, "");

  const lineEnd = src.indexOf("\n", installIdx);
  const before = src.slice(0, lineEnd + 1);
  const after = src.slice(lineEnd + 1);

  const leading = after.match(/^\s*/)[0];
  const rest = after.slice(leading.length);

  const insertion = `
### CLI

<RegistryInstall category="${category}" name="${name}" />

### Manual

`;

  const next = before + insertion + rest;
  fs.writeFileSync(mdxPath, next);
  return { changed: true };
}

function main() {
  const files = walkMdx(DOCS_DIR);
  let changed = 0;
  const skipped = {};
  for (const f of files) {
    const res = transform(f);
    if (res.changed) {
      changed++;
    } else {
      skipped[res.reason] = (skipped[res.reason] || 0) + 1;
    }
  }
  console.log(`updated ${changed} files`);
  for (const [reason, count] of Object.entries(skipped)) {
    console.log(`  skipped ${count}: ${reason}`);
  }
}

main();
