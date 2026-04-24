import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "content", "docs");
const HOOKS_DIR = path.join(ROOT, "hooks");
const OUT_DIR = path.join(ROOT, "public", "r");
const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://animata.design").replace(/\/$/, "");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const INSTALLED_VERSIONS = { ...pkg.dependencies, ...pkg.devDependencies };

const SKIP_FILES = new Set(["index.mdx", "setup.mdx", "changelog.mdx"]);
const SKIP_DIRS = new Set(["contributing"]);

function pinVersion(name) {
  const version = INSTALLED_VERSIONS[name];
  return version ? `${name}@${version}` : name;
}

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
  if (!match) return {};
  const out = {};
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
    out[key] = value;
  }
  return out;
}

function extractBlocks(src, lang) {
  const blocks = [];
  // Single-line fences: ```lang <body>``` — opening and closing on the same line.
  // Must be tried first so the multi-line regex can't consume ``` as part of a body.
  const singleRe = new RegExp(`\`\`\`${lang}[ \\t]+([^\\n\`]*?)\\s*\`\`\``, "g");
  for (const m of src.matchAll(singleRe)) {
    blocks.push({ meta: "", body: m[1] });
  }
  // Multi-line fences: ```lang<meta>\n<body>```
  const multiRe = new RegExp(`\`\`\`${lang}([^\\n]*)\\n([\\s\\S]*?)\`\`\``, "g");
  for (const m of src.matchAll(multiRe)) {
    blocks.push({ meta: m[1].trim(), body: m[2] });
  }
  return blocks;
}

function extractNpmDependencies(src) {
  const bash = extractBlocks(src, "bash");
  const deps = new Set();
  for (const block of bash) {
    for (const line of block.body.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("npm install ")) continue;
      for (const token of trimmed.slice("npm install ".length).split(/\s+/)) {
        if (token && !token.startsWith("-")) deps.add(token);
      }
    }
  }
  return [...deps];
}

function parseCssBlocks(css) {
  const state = { pos: 0, src: css };

  function skipWs() {
    while (state.pos < state.src.length && /\s/.test(state.src[state.pos])) state.pos++;
  }

  function readHead() {
    const start = state.pos;
    while (
      state.pos < state.src.length &&
      state.src[state.pos] !== "{" &&
      state.src[state.pos] !== ";" &&
      state.src[state.pos] !== "}"
    ) {
      state.pos++;
    }
    return state.src.slice(start, state.pos).trim();
  }

  function parseBody() {
    const body = {};
    while (state.pos < state.src.length) {
      skipWs();
      if (state.pos >= state.src.length || state.src[state.pos] === "}") break;
      const head = readHead();
      const ch = state.src[state.pos];
      if (ch === "{") {
        state.pos++;
        body[head] = parseBody();
        if (state.src[state.pos] === "}") state.pos++;
      } else if (ch === ";") {
        const colon = head.indexOf(":");
        if (colon !== -1) body[head.slice(0, colon).trim()] = head.slice(colon + 1).trim();
        state.pos++;
      } else if (head) {
        const colon = head.indexOf(":");
        if (colon !== -1) body[head.slice(0, colon).trim()] = head.slice(colon + 1).trim();
        break;
      } else {
        break;
      }
    }
    return body;
  }

  return parseBody();
}

function extractCssAndVars(src) {
  const blocks = extractBlocks(src, "css");
  const css = {};
  const themeVars = {};
  for (const block of blocks) {
    const parsed = parseCssBlocks(block.body);
    for (const [selector, value] of Object.entries(parsed)) {
      if (selector === "@theme" && typeof value === "object" && value !== null) {
        Object.assign(themeVars, value);
      } else {
        css[selector] = value;
      }
    }
  }
  return {
    css: Object.keys(css).length ? css : undefined,
    cssVars: Object.keys(themeVars).length ? { theme: themeVars } : undefined,
  };
}

function extractSourceFileRefs(src) {
  const refs = [];
  const re = /```[a-z]+\s+file=<rootDir>\/([^\s`]+)/g;
  for (const m of src.matchAll(re)) {
    refs.push(m[1]);
  }
  return refs;
}

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseImports(source) {
  const imports = [];
  const re = /import\s+(?:[^'"]*?\s+from\s+)?["']([^"']+)["']/g;
  for (const m of source.matchAll(re)) {
    imports.push(m[1]);
  }
  return imports;
}

function classifyImports(source) {
  const animataRefs = new Set();
  const uiRefs = new Set();
  const hookRefs = new Set();
  const libRefs = new Set();
  for (const spec of parseImports(source)) {
    if (spec.startsWith("@/animata/")) {
      const sub = spec.slice("@/animata/".length);
      animataRefs.add(sub);
    } else if (spec.startsWith("@/components/ui/")) {
      uiRefs.add(spec.slice("@/components/ui/".length));
    } else if (spec.startsWith("@/hooks/")) {
      hookRefs.add(spec.slice("@/hooks/".length));
    } else if (spec.startsWith("@/lib/") && !spec.endsWith("/utils")) {
      libRefs.add(spec.slice("@/lib/".length));
    }
  }
  return { animataRefs, uiRefs, hookRefs, libRefs };
}

function toRegistryItemName(category, name) {
  return `${category}-${name}`;
}

function toTitle(frontmatterTitle, name) {
  if (frontmatterTitle) return frontmatterTitle;
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function buildItem(mdxPath) {
  const rel = path.relative(DOCS_DIR, mdxPath);
  const parts = rel.split(path.sep);
  if (parts.length < 2) return null;
  const docCategory = parts[0];
  const name = parts[parts.length - 1].replace(/\.mdx$/, "");

  const src = fs.readFileSync(mdxPath, "utf8");
  const frontmatter = parseFrontmatter(src);
  if (frontmatter.published === "false") return null;

  const fileRefs = extractSourceFileRefs(src);
  const primaryRef =
    fileRefs.find((ref) => ref.startsWith("animata/") && ref.endsWith(`/${name}.tsx`)) ||
    fileRefs.find((ref) => ref.startsWith("animata/"));

  if (!primaryRef) {
    console.warn(`  skip: no animata source ref in ${rel}`);
    return null;
  }

  const primaryAbsPath = path.join(ROOT, primaryRef);
  const primarySource = readIfExists(primaryAbsPath);
  if (!primarySource) {
    console.warn(`  skip: source missing at ${primaryRef} (referenced by ${rel})`);
    return null;
  }

  const files = [
    {
      path: `components/${primaryRef}`,
      type: "registry:component",
      target: `~/components/${primaryRef}`,
      content: primarySource,
    },
  ];

  const dependencies = new Set(extractNpmDependencies(src));
  const registryDependencies = new Set();
  const processedHooks = new Set();

  const queue = [primarySource];
  while (queue.length) {
    const source = queue.shift();
    const { animataRefs, uiRefs, hookRefs } = classifyImports(source);

    for (const sub of animataRefs) {
      const parts = sub.split("/");
      if (parts.length < 2) continue;
      const [cat, comp] = parts;
      registryDependencies.add(`${SITE_URL}/r/${cat}/${comp}.json`);
    }
    for (const ui of uiRefs) {
      registryDependencies.add(ui);
    }
    for (const hookName of hookRefs) {
      if (processedHooks.has(hookName)) continue;
      processedHooks.add(hookName);
      const hookSource =
        readIfExists(path.join(HOOKS_DIR, `${hookName}.ts`)) ||
        readIfExists(path.join(HOOKS_DIR, `${hookName}.tsx`));
      if (!hookSource) continue;
      const ext = fs.existsSync(path.join(HOOKS_DIR, `${hookName}.ts`)) ? "ts" : "tsx";
      files.push({
        path: `hooks/${hookName}.${ext}`,
        type: "registry:hook",
        target: `~/hooks/${hookName}.${ext}`,
        content: hookSource,
      });
      queue.push(hookSource);
    }
  }

  const { css, cssVars } = extractCssAndVars(src);

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: toRegistryItemName(docCategory, name),
    type: "registry:component",
    title: toTitle(frontmatter.title, name),
    description: frontmatter.description || "",
    categories: [docCategory],
    dependencies: [...dependencies].map(pinVersion).sort(),
    registryDependencies: [...registryDependencies].sort(),
    files,
  };
  if (frontmatter.author) item.author = frontmatter.author;
  if (cssVars) item.cssVars = cssVars;
  if (css) item.css = css;

  return { category: docCategory, name, item };
}

function main() {
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const mdxFiles = walkMdx(DOCS_DIR);
  let written = 0;
  let skipped = 0;

  for (const mdxPath of mdxFiles) {
    const built = buildItem(mdxPath);
    if (!built) {
      skipped++;
      continue;
    }
    const { category, name, item } = built;
    const outDir = path.join(OUT_DIR, category);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${name}.json`), `${JSON.stringify(item, null, 2)}\n`);
    written++;
  }

  console.log(`registry: generated ${written} items, skipped ${skipped} (no source / unpublished)`);
}

main();
