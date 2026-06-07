// Copy OG card fonts from @fontsource packages into public/og-fonts/ for offline Playwright renders.
// Run after `pnpm install` if packages change: pnpm og:fonts:sync

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "public", "og-fonts");

const FILES = [
  ["@fontsource/outfit/files/outfit-latin-400-normal.woff2", "outfit-latin-400-normal.woff2"],
  ["@fontsource/outfit/files/outfit-latin-500-normal.woff2", "outfit-latin-500-normal.woff2"],
  ["@fontsource/outfit/files/outfit-latin-600-normal.woff2", "outfit-latin-600-normal.woff2"],
  ["@fontsource/outfit/files/outfit-latin-700-normal.woff2", "outfit-latin-700-normal.woff2"],
  [
    "@fontsource/young-serif/files/young-serif-latin-400-normal.woff2",
    "young-serif-latin-400-normal.woff2",
  ],
  [
    "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2",
    "ibm-plex-sans-latin-400-normal.woff2",
  ],
  [
    "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2",
    "ibm-plex-sans-latin-500-normal.woff2",
  ],
  [
    "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2",
    "ibm-plex-sans-latin-600-normal.woff2",
  ],
];

mkdirSync(OUT, { recursive: true });
for (const [from, name] of FILES) {
  const src = join(ROOT, "node_modules", from);
  const dest = join(OUT, name);
  copyFileSync(src, dest);
  console.log(`  ${name}`);
}
console.log(`OG fonts synced -> ${OUT}`);
