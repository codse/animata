import { defineConfig } from "react-doctor/api";

/**
 * JSON-LD components intentionally use dangerouslySetInnerHTML for schema.org blobs.
 * See components/blog-json-ld.tsx and components/doc-json-ld.tsx.
 *
 * Copy-paste animata components often co-locate helpers, sub-components, and motion
 * re-exports in one file — that structure is intentional for the registry.
 */
export default defineConfig({
  ignore: {
    overrides: [
      {
        files: ["components/blog-json-ld.tsx", "components/doc-json-ld.tsx"],
        rules: ["react-doctor/no-danger"],
      },
      {
        files: ["animata/feature-cards/content-scan.tsx", "app/demo/demo-source-panel.tsx"],
        rules: ["react-doctor/no-danger"],
      },
      {
        files: ["**/_archive/**"],
        rules: [
          "deslop/unused-file",
          "react-doctor/prefer-tag-over-role",
          "react-doctor/no-initialize-state",
        ],
      },
      {
        files: [
          "components/mdx-base-components.tsx",
          "components/page-header.tsx",
          "components/ui/card.tsx",
          "components/ui/alert.tsx",
          "components/ui/accordion.tsx",
          "components/ui/tabs.tsx",
          "components/mdx-components.tsx",
        ],
        rules: ["react-doctor/heading-has-content"],
      },
      {
        files: ["animata/container/sibling-focus-nav.tsx", "components/mdx-base-components.tsx"],
        rules: ["react-doctor/anchor-has-content"],
      },
      {
        files: ["components/component-preview.tsx", "components/dynamic-animata.tsx"],
        rules: ["react-doctor/no-dynamic-import-path"],
      },
      {
        files: ["lib/footer-grid.ts", "lib/resources.ts", "scripts/lib/og-template.mjs"],
        rules: ["deslop/unused-export"],
      },
      {
        files: ["components/framework-docs.tsx", "components/mdx-components.tsx"],
        rules: ["deslop/circular-dependency"],
      },
      {
        files: ["animata/**", "**/*.stories.tsx"],
        rules: [
          "react-doctor/only-export-components",
          "react-doctor/no-multi-comp",
          "react-doctor/no-render-in-render",
          "react-doctor/prefer-module-scope-static-value",
          "react-doctor/prefer-module-scope-pure-function",
          "react-doctor/no-long-transition-duration",
          "react-doctor/no-scale-from-zero",
          "react-doctor/async-defer-await",
          "react-doctor/async-await-in-loop",
          "react-doctor/js-set-map-lookups",
          "react-doctor/js-batch-dom-css",
          "react-doctor/async-parallel",
          "react-doctor/prefer-use-effect-event",
          "react-doctor/advanced-event-handler-refs",
        ],
      },
      {
        files: ["components/ui/**", "components/page-header.tsx", "components/copy-button.tsx"],
        rules: ["react-doctor/only-export-components", "react-doctor/no-multi-comp"],
      },
      {
        files: ["hooks/**"],
        rules: ["deslop/unused-file", "react-doctor/prefer-module-scope-static-value"],
      },
      {
        files: ["app/(main)/_landing/**"],
        rules: ["react-doctor/prefer-module-scope-static-value"],
      },
      {
        files: ["components/icons.tsx", "animata/widget/shopping-list.tsx"],
        rules: ["react-doctor/rendering-svg-precision"],
      },
      {
        files: ["components/ui/command.tsx", "app/demo/demo-experience.tsx"],
        rules: ["react-doctor/no-unknown-property"],
      },
      {
        files: ["components/sidebar-nav.tsx"],
        rules: [
          "react-doctor/advanced-event-handler-refs",
          "react-doctor/no-chain-state-updates",
          "react-doctor/no-derived-state",
          "react-doctor/no-pass-data-to-parent",
        ],
      },
      {
        files: [
          "components/in-view.tsx",
          "hooks/use-mouse-position.ts",
          "animata/section/pricing.tsx",
          "animata/scroll/stacked-sections.tsx",
          "animata/image/trailing-image.tsx",
        ],
        rules: ["react-doctor/exhaustive-deps", "react-doctor/js-cache-property-access"],
      },
      {
        files: ["animata/background/shooting-stars.tsx", "components/component-preview.tsx"],
        rules: ["react-doctor/no-initialize-state", "react-doctor/no-event-handler"],
      },
      {
        files: ["animata/graphs/progress.tsx"],
        rules: ["react-doctor/rendering-hydration-no-flicker"],
      },
    ],
  },
  rules: {
    "react-doctor/nextjs-no-img-element": "off",
    "react-doctor/no-array-index-as-key": "off",
    "react-doctor/use-lazy-motion": "off",
    "deslop/unused-dev-dependency": "off",
  },
});
