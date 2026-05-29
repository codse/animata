import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "footer/footer-wordmark";

const WORDMARK_SNIPPET = `const WORDMARK_VIEWBOX = { w: 700, h: 108, baseline: 92 };

<svg viewBox="0 0 700 108" width="100%" preserveAspectRatio="xMinYMax meet">
  <text
    x="0"
    y={92}
    fontSize="96"
    fontWeight="800"
    textLength="700"
    lengthAdjust="spacing"
  >
    animata
  </text>
</svg>`;

export function FooterWordmarkNotes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Footer wordmark"
        description="Lucien's footer recipe: boids behind the gradient, arrow links that dim on hover, and a wordmark scaled edge to edge."
      />

      <DemoNotes.Section id="inspiration" index={1} title="Inspiration">
        <DemoNotes.Prose>
          <p>
            We took the layout from{" "}
            <a href="https://www.lucien.com/" target="_blank" rel="noreferrer">
              Lucien
            </a>
            : navy gradient lifting toward the bottom, a row of Phosphor <code>ArrowRight</code>{" "}
            links, copyright off to the side, and a wordmark so big it gets cropped at the edges.
            The type sits in the field. It doesn&apos;t float on top like a heading.
          </p>
          <p>
            Not a clone — same hierarchy. One blue family in <code>oklch</code>, Syne 800 on the
            wordmark, IBM Plex on the links. Lucien uses a static texture; we put boids behind the
            gradient at low opacity instead.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>Two Animata pieces — boids and SiblingFocusNav. The rest is layout and CSS.</p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
        <DemoNotes.Prose>
          <p>
            Gradients, grain, the link row, and the wordmark code are in the source panel below.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            The wordmark is <strong>SVG</strong> <code>&lt;text&gt;</code>, not a styled heading.
            That&apos;s the trick for edge-to-edge scaling — no clipping, no fighting{" "}
            <code>clamp()</code> on a single HTML line.
          </p>
          <p>
            <code>textLength</code> and <code>lengthAdjust=&quot;spacing&quot;</code> stretch{" "}
            <code>animata</code> to the full viewBox width. Letters spread on wide screens and
            compress on narrow ones. <code>preserveAspectRatio=&quot;xMinYMax meet&quot;</code> pins
            the baseline to the footer edge. Syne loads through <code>next/font</code>; pass the
            resolved <code>fontFamily</code> into the SVG or the metrics won&apos;t match.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Wordmark SVG">{WORDMARK_SNIPPET}</DemoNotes.Code>
        <DemoNotes.Prose>
          <p>
            Links and copyright share the same <code>max-w-6xl</code> shell as the wordmark. They
            stack on mobile; at <code>lg</code> the row goes horizontal and copyright sits
            right-aligned.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={4} title="Full source">
        <DemoNotes.Prose>
          <p>
            Pulled from the demo file at build time. Copy what you need below — component docs are
            linked above.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Bleed>
          <DemoSourcePanel files={sources} />
        </DemoNotes.Bleed>
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
