import { allBlogs } from "contentlayer/generated";

import { SidebarNavItem } from "@/types";

interface BlogPost extends SidebarNavItem {
  date: Date;
}

const sortAlphabetically = (a: BlogPost, b: BlogPost) => {
  // Ensure the index page is always first
  if (a.href === "/blog") {
    return -1;
  }
  if (b.href === "/blog") {
    return 1;
  }

  // Sort by sortId if available
  if (a.sortId && b.sortId) {
    return a.sortId.localeCompare(b.sortId);
  } else if (a.sortId) {
    return -1;
  } else if (b.sortId) {
    return 1;
  } else {
    // Sort by date if sortId is not available
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }
};

const createLinks = (category: string): BlogPost[] => {
  return allBlogs
    .filter((doc) => doc.published)
    .map((doc) => ({
      // Make sure the index page is the first item
      title: doc.title,
      sortId: doc.slug === `/blog/${category}` ? "000" : doc.title,
      href: doc.slug,
      items: [],
      date: new Date(doc.date ?? Date.now()),
    }))
    .sort(sortAlphabetically);
};

export const blogSidebarNav = [
  {
    title: "Recent Posts",
    href: createLinks("blog")[0].href,
    items: createLinks("blog"),
  },
];
