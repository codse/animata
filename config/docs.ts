import { docs as allDocs } from "#site/content";

import { DEFAULT_GROUP, DEFAULT_ITEM, itemHref } from "@/app/demo/demos";
import { hasPublishedCategoryItems } from "@/lib/docs";
import { publishedCategoryItemCount } from "@/lib/published-docs";
import type { MainNavItem, SidebarNavItem } from "@/types";

const defaultDemoHref =
  DEFAULT_GROUP && DEFAULT_ITEM ? itemHref(DEFAULT_GROUP, DEFAULT_ITEM) : "/demo";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return (a.sortId ?? a.title).toLowerCase().localeCompare((b.sortId ?? b.title).toLowerCase());
};

const createLinks = (category: string) => {
  return allDocs
    .filter((doc) => doc.slug.startsWith(`/docs/${category}`) && doc.published)
    .map((doc) => ({
      // Make sure the index page is the first item
      title: doc.title,
      sortId: doc.slug === `/docs/${category}` ? "000" : doc.title,
      href: doc.slug,
      label: doc.labels?.includes("new") ? "new" : undefined,
      items: [],
    }))
    .sort(sortAlphabetically);
};

const sidebarNav: SidebarNavItem[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        items: [],
      },
      {
        title: "Setup",
        href: "/docs/setup",
        items: [],
      },
      {
        title: "Changelog",
        href: "/docs/changelog",
        items: [
          { title: "Overview", href: "/docs/changelog", items: [] },
          { title: "June 2026", href: "/docs/changelog/2026-06", items: [] },
          { title: "May 2026", href: "/docs/changelog/2026-05", items: [] },
          { title: "April 2026", href: "/docs/changelog/2026-04", items: [] },
          { title: "March 2026", href: "/docs/changelog/2026-03", items: [] },
          { title: "January 2026", href: "/docs/changelog/2026-01", items: [] },
          { title: "April 2025", href: "/docs/changelog/2025-04", items: [] },
          { title: "March 2025", href: "/docs/changelog/2025-03", items: [] },
          { title: "October 2024", href: "/docs/changelog/2024-10", items: [] },
          { title: "September 2024", href: "/docs/changelog/2024-09", items: [] },
          { title: "August 2024", href: "/docs/changelog/2024-08", items: [] },
          { title: "July 2024", href: "/docs/changelog/2024-07", items: [] },
          { title: "June 2024", href: "/docs/changelog/2024-06", items: [] },
        ],
      },
    ],
  },
  {
    title: "Contributing",
    href: "/docs/contributing",
    items: [
      {
        title: "Overview",
        href: "/docs/contributing",
        items: [],
      },
      {
        title: "Running locally",
        href: "/docs/contributing/running-locally",
        items: [],
      },
      {
        title: "Adding components",
        href: "/docs/contributing/components",
        items: [],
      },
      {
        title: "Live demos",
        href: "/docs/contributing/demos",
        items: [],
      },
      {
        title: "Folder structure",
        href: "/docs/contributing/folder-structure",
        items: [],
      },
      {
        title: "Guidelines",
        href: "/docs/contributing/guidelines",
        items: [],
      },
      {
        title: "Best practices",
        href: "/docs/contributing/best-practices",
        items: [],
      },
    ],
  },
  {
    icon: "text",
    title: "Text",
    label: `${publishedCategoryItemCount("text")}`,
    href: "/docs/text",
    items: createLinks("text"),
  },
  {
    title: "Background",
    href: "/docs/background",
    items: createLinks("background"),
  },
  {
    title: "Image",
    href: "/docs/image",
    items: createLinks("image"),
  },
  {
    title: "Layout",
    href: "/docs/layout",
    items: createLinks("layout"),
  },
  {
    title: "List",
    href: "/docs/list",
    items: createLinks("list"),
  },
  {
    title: "Container",
    href: "/docs/container",
    items: createLinks("container"),
  },
  {
    title: "Accordion",
    href: "/docs/accordion",
    items: createLinks("accordion"),
  },
  {
    title: "Card",
    href: "/docs/card",
    items: createLinks("card"),
  },
  {
    title: "Tabs",
    href: "/docs/tabs",
    items: createLinks("tabs"),
  },
  {
    title: "Section",
    href: "/docs/section",
    items: createLinks("section"),
  },
  {
    title: "Icon",
    href: "/docs/icon",
    items: createLinks("icon"),
  },
  {
    title: "PreLoader",
    href: "/docs/preloader",
    items: createLinks("preloader"),
  },
  {
    title: "Progress",
    href: "/docs/progress",
    items: createLinks("progress"),
  },
  {
    title: "Graphs & charts",
    href: "/docs/graphs",
    items: createLinks("graphs"),
  },
  {
    title: "Overlay",
    href: "/docs/overlay",
    items: createLinks("overlay"),
  },
  {
    icon: "button",
    title: "Button",
    label: `${publishedCategoryItemCount("button")}`,
    href: "/docs/button",
    items: createLinks("button"),
  },
  {
    icon: "widget",
    title: "Widget",
    label: `${publishedCategoryItemCount("widget")}`,
    href: "/docs/widget",
    items: createLinks("widget"),
  },
  {
    icon: "bento",
    title: "Bento grid",
    label: `${publishedCategoryItemCount("bento-grid")}`,
    href: "/docs/bento-grid",
    items: createLinks("bento-grid"),
  },
  {
    title: "Hero",
    href: "/docs/hero",
    items: createLinks("hero"),
  },
  {
    title: "Scroll",
    href: "/docs/scroll",
    items: createLinks("scroll"),
  },
  {
    title: "Carousel",
    href: "/docs/carousel",
    items: createLinks("carousel"),
  },
  {
    title: "Skeleton",
    label: `${publishedCategoryItemCount("skeleton")}`,
    href: "/docs/skeleton",
    items: createLinks("skeleton"),
  },
  {
    title: "Feature cards",
    href: "/docs/feature-cards",
    items: createLinks("feature-cards"),
  },
  {
    title: "Floating Action Buttons",
    href: "/docs/fabs",
    items: createLinks("fabs"),
  },
]
  .filter((category) => hasPublishedCategoryItems(category))
  .sort((a, b) => {
    if (a.title === "Getting Started") {
      return -1;
    }
    if (b.title === "Getting Started") {
      return 1;
    }

    if (a.title === "Contributing") {
      return -1;
    }

    if (b.title === "Contributing") {
      return 1;
    }

    return a.title.localeCompare(b.title);
  });

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Index",
      href: "/",
    },
    {
      title: "Components",
      href: "/components",
    },
    {
      title: "Demos",
      href: defaultDemoHref,
    },
    {
      title: "Changelog",
      href: "/docs/changelog",
    },
  ],
  sidebarNav,
};
