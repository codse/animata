/**
 * Demo ↔ component link registry (JS source for Node scripts + TS wrapper).
 * Keep in sync with `app/demo/demos.ts` routes and `demo-sources.config.js` keys.
 *
 * @typedef {{ docSlug: string; category: string; name: string; description: string }} DemoComponentLink
 * @typedef {{ key: string; groupSlug: string; itemSlug: string; label: string; components: DemoComponentLink[] }} DemoRegistryEntry
 */

/** @type {DemoRegistryEntry[]} */
export const DEMO_REGISTRY = [
  {
    key: "footer/footer-wordmark",
    groupSlug: "footer",
    itemSlug: "footer-wordmark",
    label: "Footer wordmark",
    components: [
      {
        docSlug: "background/boids-ecosystem",
        category: "Background",
        name: "Boids Ecosystem",
        description:
          "Canvas flock that parts around the cursor. Here it sits behind the gradient at about 22% opacity, dot agents, cool white/blue palette.",
      },
      {
        docSlug: "container/sibling-focus-nav",
        category: "Container",
        name: "Sibling Focus Nav",
        description:
          "Dims sibling links on nav hover or keyboard focus so the active item reads at full opacity — the Lucien-style arrow link row.",
      },
    ],
  },
  {
    key: "hero/launch-shift",
    groupSlug: "hero",
    itemSlug: "launch-shift",
    label: "Superhuman · platform hero",
    components: [
      {
        docSlug: "background/boids-ecosystem",
        category: "Background",
        name: "Boids Ecosystem",
        description:
          "Warm violet dots on a near-black field at 70% opacity — ambient motion behind the vignette, same primitive as the footer demo with a different palette.",
      },
    ],
  },
  {
    key: "browse/cinema-row",
    groupSlug: "browse",
    itemSlug: "cinema-row",
    label: "Stream · premiere browse",
    components: [
      {
        docSlug: "container/marquee",
        category: "Container",
        name: "Marquee",
        description:
          "Horizontal premieres poster rail plus asymmetric vertical still columns — all pause on hover.",
      },
      {
        docSlug: "text/wave-reveal",
        category: "Text",
        name: "Wave Reveal",
        description: "Premiere title — three words reveal upward with blur, one shot on load.",
      },
    ],
  },
];
