import { allDocs } from "contentlayer/generated";

import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
};

const isDev = process.env.NODE_ENV !== "production";

const createLinks = (category: string) => {
  return allDocs
    .filter((doc) => doc.slug.startsWith(`/docs/${category}`) && doc.slug !== `/docs/${category}`)
    .map((doc) => ({
      title: doc.title,
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
    label: createLinks("button").length + "",
    href: "/docs/button",
    items: isDev ? createLinks("button") : [],
  },
  {
    icon: "widget",
    title: "Widget",
    label: createLinks("widget").length + "",
    href: "/docs/widget",
    items: isDev ? createLinks("widget") : [],
  },
  {
    icon: "bento",
    title: "Bento grid",
    label: createLinks("bento-grid").length + "",
    href: "/docs/bento-grid",
    items: isDev ? createLinks("bento-grid") : [],
  },
  {
    title: "Carousel",
    items: createLinks("carousel"),
  },
  {
    title: "Hero",
    items: createLinks("hero"),
  },
  {
    title: "Scroll",
    items: createLinks("scroll"),
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
      href: sidebarNav[1].items?.[0]?.href ?? sidebarNav[1]?.href,
    },
    {
      title: "Contributing",
      href: "/docs/contributing",
    },
  ],
  sidebarNav,
};
