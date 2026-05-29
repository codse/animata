import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEMO_REGISTRY } from "../app/demo/demo-registry.config.js";
import { DEMO_SOURCE_FILES } from "../app/demo/demo-sources.config.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_ROOT = path.join(ROOT, "content/docs");
const DEMOS_FILE = path.join(ROOT, "app/demo/demos.ts");

let failed = false;

function error(message) {
  console.error(`[demo-registry] ${message}`);
  failed = true;
}

function warn(message) {
  console.warn(`[demo-registry] ${message}`);
}

const demosSource = fs.readFileSync(DEMOS_FILE, "utf8");

for (const entry of DEMO_REGISTRY) {
  const expectedKey = `${entry.groupSlug}/${entry.itemSlug}`;

  if (entry.key !== expectedKey) {
    error(`key "${entry.key}" must be "${expectedKey}"`);
  }

  if (!demosSource.includes(`slug: "${entry.groupSlug}"`)) {
    error(`group slug "${entry.groupSlug}" not found in demos.ts`);
  }

  if (!demosSource.includes(`slug: "${entry.itemSlug}"`)) {
    error(`item slug "${entry.itemSlug}" not found in demos.ts`);
  }

  for (const component of entry.components) {
    const docPath = path.join(DOCS_ROOT, `${component.docSlug}.mdx`);

    if (!fs.existsSync(docPath)) {
      error(`missing component doc content/docs/${component.docSlug}.mdx`);
    }
  }
}

for (const sourceKey of Object.keys(DEMO_SOURCE_FILES)) {
  if (!DEMO_REGISTRY.some((entry) => entry.key === sourceKey)) {
    warn(`DEMO_SOURCE_FILES "${sourceKey}" has no demo-registry entry`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`[demo-registry] OK — ${DEMO_REGISTRY.length} demo(s) validated`);
