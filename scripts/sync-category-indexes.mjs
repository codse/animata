import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DOCS_DIR = path.join(ROOT, "content/docs");

const CATEGORY_META = {
  accordion: {
    title: "Accordion overview",
    description:
      "Expandable sections and FAQ-style disclosure patterns for React apps.",
  },
  background: {
    title: "Background overview",
    description:
      "Animated backgrounds and ambient canvas effects for hero sections and landing pages.",
  },
  card: {
    title: "Cards overview",
    description:
      "Animated card layouts for features, notifications, integrations, and social proof.",
  },
  carousel: {
    title: "Carousel overview",
    description: "Sliders and carousels with motion-rich transitions for React UIs.",
  },
  container: {
    title: "Container overview",
    description:
      "Layout wrappers — marquees, docks, ribbons, tabs, and focus navigation patterns.",
  },
  fabs: {
    title: "Floating action buttons overview",
    description: "Speed dials and radial menus for primary actions in React interfaces.",
  },
  "feature-cards": {
    title: "Feature cards overview",
    description:
      "Product feature presentations with animated reveals and interactive states.",
  },
  hero: {
    title: "Hero overview",
    description:
      "Hero sections and above-the-fold layouts with motion and expressive typography.",
  },
  icon: {
    title: "Icon overview",
    description: "Animated icon interactions and ripple effects for buttons and toolbars.",
  },
  image: {
    title: "Image overview",
    description:
      "Image reveals, magnifiers, skew effects, and photo treatments for marketing pages.",
  },
  list: {
    title: "List overview",
    description: "Animated lists, menus, and orbiting item layouts for dashboards and nav.",
  },
  overlay: {
    title: "Overlay overview",
    description: "Modals and overlay patterns with polished entrance animations.",
  },
  preloader: {
    title: "PreLoader overview",
    description: "Loading screens and split-reveal preloaders for app boot sequences.",
  },
  progress: {
    title: "Progress overview",
    description: "Spinners, timelines, and progress indicators for async workflows.",
  },
  scroll: {
    title: "Scroll overview",
    description: "Scroll-driven sections, pinned tours, and stacked narrative reveals.",
  },
  section: {
    title: "Section overview",
    description: "Full-width page sections such as pricing tables and marketing blocks.",
  },
  tabs: {
    title: "Tabs overview",
    description: "Tab bars with fluid, gooey, and shift transitions for settings and filters.",
  },
  graphs: {
    title: "Graphs overview",
    description:
      "Lightweight charts and graphs for widgets, dashboards, and product presentations.",
  },
};

function renderIndex(category, meta, extra = "") {
  return `---
title: ${meta.title}
description: ${meta.description}
author: hari
---
${extra}
<CategoryIndex category="${category}" />
`;
}

for (const [category, meta] of Object.entries(CATEGORY_META)) {
  const target = path.join(DOCS_DIR, category, "index.mdx");
  const extra =
    category === "graphs"
      ? `
<Callout>
This is not a full-fledged chart library. It's a collection of simple graphs that can be used in feature presentations or widgets.

For more complex use cases, consider using libraries like [Recharts](https://recharts.org/en-US/) or [Chart.js](https://www.chartjs.org/).

</Callout>
`
      : "";

  fs.writeFileSync(target, renderIndex(category, meta, extra));
  console.log(`synced ${category}/index.mdx`);
}
