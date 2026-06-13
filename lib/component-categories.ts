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
    .flatMap((item) => {
      if (EXCLUDED_NAV_TITLES.has(item.title)) return [];

      const slug = getCategorySlug(item);
      if (!slug) return [];

      const count = publishedCategoryItemCount(slug);
      if (count <= 0) return [];

      return [
        {
          slug,
          title: item.title,
          href: item.href ?? `/docs/${slug}`,
          count,
        },
      ];
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
