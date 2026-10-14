import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "scroll/aperture-reveal-demo-001";

const NIGHT_SNIPPET = `<ApertureReveal
  length={2.6}
  style={{
    "--aperture-ground": "#0d0e12",
    "--aperture-ink": "#e9e7e1",
    "--aperture-opening": "#1d1f26",
  }}
>
  …
</ApertureReveal>`;

export function ApertureRevealDemo001Notes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Aperture reveal · demo 001"
        description="A guided dawn climb told in two scroll chapters: night at the trailhead, then first light at the lookout."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            The page follows one morning. Each chapter starts as a headline with a small window in
            it, and scrolling opens that window into the photograph. The first chapter is dark, the
            second is light, so the page itself moves from night to sunrise. A short band of route
            details sits between them, giving the reader a pause before the second reveal.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            Two <code>ApertureReveal</code> sections. Everything else in the demo is plain markup.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            Both sections follow page scroll, so there is no <code>viewportHeight</code>. The night
            chapter is shorter (<code>length=&#123;2.6&#125;</code>) because it has no action to
            wait for. It uses the component&apos;s color variables instead of a variant prop:
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Night chapter colors">{NIGHT_SNIPPET}</DemoNotes.Code>
        <DemoNotes.Prose>
          <p>
            The first headline is the page&apos;s <code>h1</code> (
            <code>Headline as=&quot;h1&quot;</code>); the second stays an <code>h2</code>. The
            footer reserves room for the fixed demo bar with <code>--demo-chrome-reserve</code>.
          </p>
        </DemoNotes.Prose>
        <DemoSourcePanel files={sources} />
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
