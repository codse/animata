import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_DIR = path.join(ROOT, "public", "r");
const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://animata.design").replace(/\/$/, "");

/** Representative installs — one dry-run per bundle shape. */
const INSTALL_FIXTURES = [
  {
    id: "simple",
    label: "single file, no npm deps",
    item: "preloader/split-reveal.json",
    expectFiles: ["components/animata/preloader/split-reveal.tsx"],
    expectDeps: [],
  },
  {
    id: "doc-bundled-shapes",
    label: "mdx bundled file refs + shape imports",
    item: "card/card-stack.json",
    expectFiles: [
      "components/animata/card/card-stack.tsx",
      "components/shapes/card-stack-mask-defs.tsx",
    ],
    expectDeps: ["lucide-react", "motion"],
  },
  {
    id: "co-located-shared",
    label: "co-located helper rewritten to ./shared",
    item: "tabs/fluid-tabs.json",
    expectFiles: ["components/animata/tabs/fluid-tabs.tsx", "components/animata/tabs/shared.ts"],
    expectDeps: ["lucide-react", "motion"],
  },
  {
    id: "bundled-hook",
    label: "bundled hook from @/hooks import",
    item: "image/trailing-image.json",
    expectFiles: ["components/animata/image/trailing-image.tsx", "hooks/use-mouse-position.ts"],
    expectDeps: ["motion"],
  },
  {
    id: "registry-dependencies",
    label: "registryDependencies resolve to sibling items",
    item: "card/card-spread.json",
    localizeDeps: true,
    expectFiles: [
      "components/animata/card/card-spread.tsx",
      "components/animata/widget/notes.tsx",
      "components/animata/widget/shopping-list.tsx",
    ],
    expectDeps: [],
  },
];

let failed = false;

function error(message) {
  console.error(`[registry-install] ${message}`);
  failed = true;
}

function info(message) {
  console.log(`[registry-install] ${message}`);
}

function walkRegistryJson(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkRegistryJson(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      acc.push(full);
    }
  }
  return acc;
}

function registryUrlToLocalPath(url) {
  const prefix = `${SITE_URL}/r/`;
  if (!url.startsWith(prefix)) return null;
  return path.join(REGISTRY_DIR, url.slice(prefix.length));
}

function localizeRegistryItem(itemPath) {
  const raw = JSON.parse(fs.readFileSync(itemPath, "utf8"));
  if (!raw.registryDependencies?.length) return itemPath;

  const localized = structuredClone(raw);
  localized.registryDependencies = raw.registryDependencies.map((dep) => {
    const local = registryUrlToLocalPath(dep);
    if (!local) return dep;
    if (!fs.existsSync(local)) {
      error(
        `missing local registry dependency for ${path.relative(REGISTRY_DIR, itemPath)}: ${dep}`,
      );
      return dep;
    }
    return local;
  });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "animata-registry-"));
  const outPath = path.join(tmpDir, path.basename(itemPath));
  fs.writeFileSync(outPath, `${JSON.stringify(localized, null, 2)}\n`);
  return outPath;
}

function validateRegistryJsonStatic(jsonPath) {
  const rel = path.relative(REGISTRY_DIR, jsonPath);
  let item;

  try {
    item = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  } catch {
    error(`${rel}: invalid JSON`);
    return;
  }

  if (!item.name || !item.type) {
    error(`${rel}: missing name or type`);
  }

  if (!Array.isArray(item.files) || item.files.length === 0) {
    error(`${rel}: files array is empty`);
    return;
  }

  const paths = new Set();
  for (const file of item.files) {
    if (
      !file.path ||
      !file.type ||
      typeof file.content !== "string" ||
      file.content.trim() === ""
    ) {
      error(`${rel}: file entry missing path, type, or content`);
      continue;
    }
    if (paths.has(file.path)) {
      error(`${rel}: duplicate file path ${file.path}`);
    }
    paths.add(file.path);
  }

  for (const dep of item.registryDependencies ?? []) {
    const local = registryUrlToLocalPath(dep);
    if (local && !fs.existsSync(local)) {
      error(`${rel}: registryDependency not found locally — ${dep}`);
    }
  }
}

function createShadcnWorkspace() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "animata-shadcn-"));

  fs.writeFileSync(
    path.join(dir, "package.json"),
    `${JSON.stringify({ name: "animata-registry-install-test", private: true, type: "module", version: "0.0.0" }, null, 2)}\n`,
  );

  fs.writeFileSync(
    path.join(dir, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          jsx: "preserve",
          paths: { "@/*": ["./*"] },
        },
        include: ["**/*.ts", "**/*.tsx"],
      },
      null,
      2,
    )}\n`,
  );

  fs.mkdirSync(path.join(dir, "app"), { recursive: true });
  fs.mkdirSync(path.join(dir, "lib"), { recursive: true });
  fs.writeFileSync(path.join(dir, "app", "globals.css"), '@import "tailwindcss";\n');
  fs.writeFileSync(
    path.join(dir, "lib", "utils.ts"),
    'export function cn(...inputs: Array<string | false | null | undefined>) {\n  return inputs.filter(Boolean).join(" ");\n}\n',
  );

  fs.writeFileSync(
    path.join(dir, "components.json"),
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          css: "app/globals.css",
          baseColor: "stone",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
        },
      },
      null,
      2,
    )}\n`,
  );

  return dir;
}

function parseDryRunOutput(output) {
  const files = [];
  const deps = [];
  let inDeps = false;

  for (const line of output.split("\n")) {
    const fileMatch = line.match(/^│ \+ (.+?) {2}create$/);
    if (fileMatch) {
      files.push(fileMatch[1].trim());
      continue;
    }

    if (line.includes("├ Dependencies")) {
      inDeps = true;
      continue;
    }

    if (inDeps) {
      const depMatch = line.match(/^│ \+ (.+)$/);
      if (depMatch) {
        deps.push(depMatch[1].trim().split("@")[0]);
        continue;
      }
      if (line.includes("├ Files") || line.includes("│  ") || line.startsWith("└")) {
        inDeps = false;
      }
    }
  }

  return { files, deps };
}

function runShadcnDryRun(workspaceDir, registryItemPath) {
  const command = `npx shadcn@latest add -y --dry-run ${JSON.stringify(registryItemPath)}`;

  try {
    const output = execSync(command, {
      cwd: workspaceDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000,
      env: { ...process.env, CI: "true" },
    });
    return { ok: true, output };
  } catch (err) {
    const stdout = err.stdout?.toString?.() ?? "";
    const stderr = err.stderr?.toString?.() ?? "";
    return { ok: false, output: `${stdout}\n${stderr}`.trim() };
  }
}

function assertFixtureInstall(fixture, workspaceDir) {
  const itemPath = path.join(REGISTRY_DIR, fixture.item);
  if (!fs.existsSync(itemPath)) {
    error(`fixture ${fixture.id}: missing ${fixture.item}`);
    return;
  }

  const installPath = fixture.localizeDeps ? localizeRegistryItem(itemPath) : itemPath;
  const result = runShadcnDryRun(workspaceDir, installPath);

  if (!result.ok) {
    error(`fixture ${fixture.id} (${fixture.label}): shadcn dry-run failed\n${result.output}`);
    return;
  }

  const { files, deps } = parseDryRunOutput(result.output);

  for (const expected of fixture.expectFiles) {
    if (!files.includes(expected)) {
      error(
        `fixture ${fixture.id}: expected file "${expected}" in dry-run output. Got: ${files.join(", ") || "(none)"}`,
      );
    }
  }

  for (const expectedDep of fixture.expectDeps) {
    if (!deps.includes(expectedDep)) {
      error(
        `fixture ${fixture.id}: expected npm dep "${expectedDep}". Got: ${deps.join(", ") || "(none)"}`,
      );
    }
  }

  info(`fixture ${fixture.id} OK — ${files.length} file(s), ${deps.length} npm dep(s)`);
}

function main() {
  if (process.argv.includes("--build")) {
    execSync("node ./scripts/build-registry.js", { cwd: ROOT, stdio: "inherit" });
  }

  if (!fs.existsSync(REGISTRY_DIR)) {
    error(`registry output missing at ${REGISTRY_DIR} — run node scripts/build-registry.js first`);
    process.exit(1);
  }

  const registryFiles = walkRegistryJson(REGISTRY_DIR);
  if (registryFiles.length === 0) {
    error("no registry JSON files found");
    process.exit(1);
  }

  info(`static validation — ${registryFiles.length} item(s)`);
  for (const jsonPath of registryFiles) {
    validateRegistryJsonStatic(jsonPath);
  }

  if (failed) {
    process.exit(1);
  }

  info(`shadcn dry-run — ${INSTALL_FIXTURES.length} fixture(s)`);
  const workspaceDir = createShadcnWorkspace();

  try {
    for (const fixture of INSTALL_FIXTURES) {
      assertFixtureInstall(fixture, workspaceDir);
    }
  } finally {
    fs.rmSync(workspaceDir, { recursive: true, force: true });
  }

  if (failed) {
    process.exit(1);
  }

  info(
    `OK — ${registryFiles.length} registry item(s), ${INSTALL_FIXTURES.length} install fixture(s)`,
  );
}

main();
