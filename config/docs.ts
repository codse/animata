import { allDocs } from "contentlayer/generated";

import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return (a.sortId ?? a.title).toLowerCase().localeCompare((b.sortId ?? b.title).toLowerCase());
};

const isDev = process.env.NODE_ENV !== "production";

const createLinks = (category: string) => {
  return allDocs
    .filter((doc) => doc.slug.startsWith(`/docs/${category}`))
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
        title: "Running Locally",
        href: "/docs/contributing",
        items: [],
      },
      {
        title: "Adding animations",
        href: "/docs/contributing/animations",
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
    title: "Card",
    items: createLinks("card"),
  },
  {
    title: "Icon",
    items: createLinks("icon"),
  },
  {
    title: "Progress",
    items: createLinks("progress"),
  },
  {
    title: "Graphs",
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
    items: isDev ? createLinks("button") : [],
  },
  {
    icon: "widget",
    title: "Widget",
    label: -1 + createLinks("widget").length + "",
    href: "/docs/widget",
    items: isDev ? createLinks("widget") : [],
  },
  {
    icon: "bento",
    title: "Bento grid",
    label: -1 + createLinks("bento-grid").length + "",
    href: "/docs/bento-grid",
    items: isDev ? createLinks("bento-grid") : [],
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
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: sidebarNav[2].items?.[0]?.href ?? sidebarNav[2]?.href,
    },
    {
      title: "Contributing",
      href: "/docs/contributing",
    },
  ],
  sidebarNav,
};
