import { docs as allDocs } from "#site/content";

export type PublishedDoc = (typeof allDocs)[number];

const RESERVED_INDEX_SLUGS = new Set(["", "setup", "changelog", "contributing"]);

export function getPublishedDocs() {
  return allDocs.filter((doc) => doc.published);
}

export function getPublishedDoc(slugAsParams: string) {
  const doc = allDocs.find((item) => item.slugAsParams === slugAsParams);
  if (!doc?.published) return null;
  return doc;
}

export function getPublishedCategoryDocs(categorySlug: string) {
  return allDocs
    .filter((doc) => doc.published && doc.slug.startsWith(`/docs/${categorySlug}/`))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function publishedCategoryItemCount(categorySlug: string) {
  return getPublishedCategoryDocs(categorySlug).length;
}

export function isCategoryIndexDoc(doc: PublishedDoc) {
  if (!doc.slugAsParams || RESERVED_INDEX_SLUGS.has(doc.slugAsParams)) {
    return false;
  }

  return !doc.slugAsParams.includes("/");
}
