import type { SidebarNavItem } from "@/types";

export function getFooterCategories(
  navItems: SidebarNavItem[],
  excludedTitles: string[] = ["Getting Started", "Contributing"],
) {
  return navItems
    .filter((nav) => !excludedTitles.includes(nav.title))
    .map((cat) => ({
      title: cat.title,
      href: cat.items?.[0]?.href ?? "/docs",
    }));
}
