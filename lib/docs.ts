import { publishedCategoryItemCount } from "@/lib/published-docs";
import type { SidebarNavItem } from "@/types";

export function getCategorySlug(category: SidebarNavItem): string | undefined {
  const fromHref = category.href?.match(/^\/docs\/([^/]+)/)?.[1];
  if (fromHref) return fromHref;

  return category.items?.[0]?.href?.match(/^\/docs\/([^/]+)/)?.[1];
}

export function hasPublishedCategoryItems(category: SidebarNavItem): boolean {
  const slug = getCategorySlug(category);

  if (!slug) {
    return Boolean(category.items?.length);
  }

  return publishedCategoryItemCount(slug) > 0;
}

export type FooterCategoryLink = {
  title: string;
  href: string;
};

export type FooterCategory = {
  title: string;
  href: string;
  links: FooterCategoryLink[];
  showViewAll: boolean;
  viewAllHref: string;
  /** Remaining items hidden in compact mode (shown as “+ N more”). */
  moreCount: number;
};

export type FooterCategoryVariant = "compact" | "full";

type GetFooterCategoriesOptions = {
  excludedTitles?: string[];
  variant?: FooterCategoryVariant;
};

function flattenSidebarLinks(items: SidebarNavItem["items"]): FooterCategoryLink[] {
  if (!items) return [];

  return items.flatMap((item) => {
    if (item.items?.length) {
      return item.items.flatMap((child) =>
        child.href ? [{ title: child.title, href: child.href }] : [],
      );
    }

    return item.href ? [{ title: item.title, href: item.href }] : [];
  });
}

function getCategoryIndexHref(category: SidebarNavItem): string {
  if (category.href) return category.href;

  const categorySlug = getCategorySlug(category);

  return categorySlug ? `/docs/${categorySlug}` : "/docs";
}

function getFooterCategoryLinks(category: SidebarNavItem): FooterCategoryLink[] {
  const indexHref = getCategoryIndexHref(category);
  const links = flattenSidebarLinks(category.items);

  if (!indexHref) return links;

  return links.filter((link) => link.href !== indexHref);
}

export function getFooterCategories(
  navItems: SidebarNavItem[],
  {
    excludedTitles = ["Getting Started", "Contributing"],
    variant = "compact",
  }: GetFooterCategoriesOptions = {},
): FooterCategory[] {
  return navItems.flatMap((cat) => {
    if (excludedTitles.includes(cat.title) || !hasPublishedCategoryItems(cat)) {
      return [];
    }

    const links = getFooterCategoryLinks(cat);
    const viewAllHref = getCategoryIndexHref(cat);
    const showViewAll = variant === "compact" && links.length > 4;
    const moreCount = showViewAll ? links.length - 3 : 0;

    return [
      {
        title: cat.title,
        href: viewAllHref,
        links: showViewAll ? links.slice(0, 3) : links,
        showViewAll,
        viewAllHref,
        moreCount,
      },
    ];
  });
}
