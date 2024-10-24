import { allDocs } from "contentlayer/generated";

import { MainNavItem, SidebarNavItem } from "@/types";

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
        items: [],
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
    title: "Text",
    items: createLinks("text"),
  },
  {
    title: "Background",
    items: createLinks("background"),
  },
  {
    title: "Image",
    items: createLinks("image"),
  },
  {
    title: "Layout",
    items: createLinks("layout"),
  },
  {
    title: "List",
    items: createLinks("list"),
  },
  {
    title: "Container",
    items: createLinks("container"),
  },
  {
    title: "Accordion",
    items: createLinks("accordion"),
  },
  {
    title: "Card",
    items: createLinks("card"),
  },
  {
    title: "Section",
    items: createLinks("section"),
  },
  {
    title: "Icon",
    items: createLinks("icon"),
  },
  {
    title: "PreLoader",
    items: createLinks("preloader"),
  },
  {
    title: "Progress",
    items: createLinks("progress"),
  },
  {
    title: "Graphs & charts",
    items: createLinks("graphs"),
  },
  {
    title: "Overlay",
    items: createLinks("overlay"),
  },
  {
    icon: "button",
    title: "Button",
    label: -1 + createLinks("button").length + "",
    href: "/docs/button",
    items: createLinks("button"),
  },
  {
    icon: "widget",
    title: "Widget",
    label: -1 + createLinks("widget").length + "",
    href: "/docs/widget",
    items: createLinks("widget"),
  },
  {
    icon: "bento",
    title: "Bento grid",
    label: -1 + createLinks("bento-grid").length + "",
    href: "/docs/bento-grid",
    items: createLinks("bento-grid"),
  },
  {
    title: "Hero",
    items: createLinks("hero"),
  },
  {
    title: "Scroll",
    items: createLinks("scroll"),
  },
  {
    title: "Carousel",
    items: createLinks("carousel"),
  },
  {
    title: "Skeleton",
    label: "6",
    href: "/docs/skeleton",
    items: createLinks("skeleton"),
  },
  {
    title: "Feature cards",
    items: createLinks("feature-cards"),
  },
  {
    title: "Floating Action Buttons",
    items: createLinks("fabs"),
  },
]
  .filter((category) => Boolean(category.items?.length || category.label))
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
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Components",
      href: sidebarNav[2].items?.[0]?.href ?? sidebarNav[2]?.href,
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  sidebarNav,
};
