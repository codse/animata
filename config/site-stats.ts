import { docs as allDocs } from "#site/content";

/** Updated manually when marketing copy needs to reflect GitHub stars. */
export const GITHUB_STARS = 2697;

const NON_COMPONENT_SECTIONS = new Set(["contributing", "changelog"]);

export function isPublishedComponentDoc(doc: (typeof allDocs)[number]) {
  if (!doc.published) return false;
  if (doc.slug === "/docs" || doc.slug === "/docs/setup") return false;

  const parts = doc.slugAsParams.split("/");
  if (NON_COMPONENT_SECTIONS.has(parts[0] ?? "")) return false;

  // Category index pages are single-segment (e.g. "button").
  return parts.length >= 2;
}

export const publishedComponentCount = allDocs.filter(isPublishedComponentDoc).length;

export function formatStatPlus(value: number) {
  return `${value.toLocaleString("en-US")}+`;
}

export const siteStats = {
  githubStars: GITHUB_STARS,
  githubStarsFormatted: formatStatPlus(GITHUB_STARS),
  componentCount: publishedComponentCount,
  componentsFormatted: formatStatPlus(publishedComponentCount),
} as const;
