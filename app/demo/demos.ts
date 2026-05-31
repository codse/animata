import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type DemoModule = { default: ComponentType };

function lazyDemo(load: () => Promise<DemoModule>) {
  return {
    load,
    Component: dynamic(load),
  };
}

// Re-export so future demos can use it without changing this signature.
export { lazyDemo };

export interface DemoItem {
  slug: string;
  label: string;
  Component: ComponentType;
  load: () => Promise<unknown>;
  /** Browser chrome + shell fade during swaps. Falls back to group.themeColor. */
  themeColor?: string;
}

export interface DemoGroup {
  slug: string;
  label: string;
  title: string;
  phrase: string;
  /** Default theme-color for demos in this group. */
  themeColor: string;
  items: DemoItem[];
}

export function demoThemeColor(item: DemoItem, group: DemoGroup) {
  return item.themeColor ?? group.themeColor;
}

export const DEMO_GROUPS: DemoGroup[] = [
  {
    slug: "hero",
    label: "Hero",
    title: "Hero sections",
    phrase: "Superhuman platform hero — Mail, Docs, and AI across every app and tab.",
    themeColor: "#0E0E10",
    items: [
      {
        slug: "launch-shift",
        label: "Superhuman · platform hero",
        themeColor: "#0E0E10",
        ...lazyDemo(() => import("./library/hero/launch-shift")),
      },
      {
        slug: "photographer-portfolio",
        label: "Photographer portfolio",
        themeColor: "#ffffff",
        ...lazyDemo(() => import("./library/hero/photographer-portfolio")),
      },
    ],
  },
  {
    slug: "footer",
    label: "Footer",
    title: "Footer sections",
    phrase: "Footer wordmark with boids field and gradient type.",
    themeColor: "#161616",
    items: [
      {
        slug: "footer-wordmark",
        label: "Wordmark · Lucien-style type",
        themeColor: "#070d18",
        ...lazyDemo(() => import("./library/footer/footer-wordmark")),
      },
    ],
  },
  {
    slug: "browse",
    label: "Browse",
    title: "Browse layouts",
    phrase:
      "Streaming premiere browse — overscale type, horizontal poster row, dual vertical marquees.",
    themeColor: "#000000",
    items: [
      {
        slug: "cinema-row",
        label: "Stream · premiere browse",
        themeColor: "#000000",
        ...lazyDemo(() => import("./library/browse/cinema-row")),
      },
    ],
  },
];

export type DemoItemWithGroup = DemoItem & { group: DemoGroup };

export const DEMO_ITEMS: DemoItemWithGroup[] = DEMO_GROUPS.flatMap((group) =>
  group.items.map((item) => ({ ...item, group })),
);

export const DEFAULT_GROUP: DemoGroup | null = DEMO_GROUPS[0] ?? null;
export const DEFAULT_ITEM: DemoItem | null = DEFAULT_GROUP?.items[0] ?? null;

export function findItem(groupSlug: string, itemSlug: string) {
  const group = DEMO_GROUPS.find((g) => g.slug === groupSlug);
  if (!group) return null;
  const item = group.items.find((i) => i.slug === itemSlug);
  if (!item) return null;
  return { group, item };
}

export function getItemIndex(groupSlug: string, itemSlug: string) {
  return DEMO_ITEMS.findIndex((entry) => entry.group.slug === groupSlug && entry.slug === itemSlug);
}

export function itemHref(group: DemoGroup, item: DemoItem) {
  return `/demo/${group.slug}/${item.slug}` as const;
}
