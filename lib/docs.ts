import type { SidebarNavItem } from "@/types";

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
      return item.items
        .filter((child) => child.href)
        .map((child) => ({ title: child.title, href: child.href as string }));
    }

    return item.href ? [{ title: item.title, href: item.href }] : [];
  });
}

function getCategoryIndexHref(category: SidebarNavItem): string | undefined {
  if (category.href) return category.href;

  const firstHref = category.items?.[0]?.href;
  if (!firstHref) return undefined;

  return firstHref.match(/^(\/docs\/[^/]+)/)?.[1];
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
  return navItems
    .filter((nav) => !excludedTitles.includes(nav.title))
    .map((cat) => {
      const links = getFooterCategoryLinks(cat);
      const viewAllHref = cat.href ?? getCategoryIndexHref(cat) ?? links[0]?.href ?? "/docs";
      const showViewAll = variant === "compact" && links.length > 4;
      const moreCount = showViewAll ? links.length - 3 : 0;

      return {
        title: cat.title,
        href: viewAllHref,
        links: showViewAll ? links.slice(0, 3) : links,
        showViewAll,
        viewAllHref,
        moreCount,
      };
    });
}
