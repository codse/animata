import { MainNavItem, SidebarNavItem } from "@/types";
import { allDocs } from "contentlayer/generated";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
};

const createLinks = (category: string) => {
  return allDocs
    .filter(
      (doc) =>
        doc.slug.startsWith(`/docs/${category}`) &&
        doc.slug !== `/docs/${category}/index`,
    )
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
    title: "Bento grid",
    items: createLinks("bento-grid"),
  },
  {
    title: "Widget",
    items: createLinks("widget"),
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
    title: "Button",
    items: createLinks("button"),
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
  .filter((category) => category.items.length > 0)
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
      href: sidebarNav[1].items?.[0]?.href,
    },
    {
      title: "Contributing",
      href: "/docs/contributing",
    },
  ],
  sidebarNav,
};
