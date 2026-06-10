import { docsConfig } from "@/config/docs";
import { getCategorySlug } from "@/lib/docs";
import { publishedCategoryItemCount } from "@/lib/published-docs";

const EXCLUDED_NAV_TITLES = new Set(["Getting Started", "Contributing"]);

export type ComponentCategory = {
  slug: string;
  title: string;
  href: string;
  count: number;
};

export function getComponentCategories(): ComponentCategory[] {
  return docsConfig.sidebarNav
    .filter((item) => !EXCLUDED_NAV_TITLES.has(item.title))
    .map((item) => {
      const slug = getCategorySlug(item);
      if (!slug) return null;

      return {
        slug,
        title: item.title,
        href: item.href ?? `/docs/${slug}`,
        count: publishedCategoryItemCount(slug),
      };
    })
    .filter((item): item is ComponentCategory => item !== null && item.count > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}
