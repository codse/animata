import { DEMO_REGISTRY as registry } from "./demo-registry.config.js";

/**
 * Maps live demos ↔ component docs. Single source of truth for two-way links.
 * Data lives in `demo-registry.config.js` so Node validation scripts can import it.
 */
export interface DemoComponentLink {
  /** Docs path without /docs — e.g. `background/boids-ecosystem` */
  docSlug: string;
  category: string;
  name: string;
  description: string;
}

export interface DemoRegistryEntry {
  /** `${groupSlug}/${itemSlug}` — matches `DEMO_SOURCES` keys and `demos.ts` routes */
  key: string;
  groupSlug: string;
  itemSlug: string;
  /** Short label for backlinks on component docs */
  label: string;
  components: DemoComponentLink[];
}

const DEMO_REGISTRY: DemoRegistryEntry[] = registry;

export function componentDocHref(docSlug: string) {
  return `/docs/${docSlug}` as const;
}

export function demoHref(entry: Pick<DemoRegistryEntry, "groupSlug" | "itemSlug">) {
  return `/demo/${entry.groupSlug}/${entry.itemSlug}` as const;
}

function getDemoRegistryEntry(key: string) {
  return DEMO_REGISTRY.find((entry) => entry.key === key);
}

export function getDemoComponents(key: string) {
  return getDemoRegistryEntry(key)?.components ?? [];
}

export function getDemosUsingComponent(docSlug: string) {
  return DEMO_REGISTRY.filter((entry) =>
    entry.components.some((component) => component.docSlug === docSlug),
  );
}
