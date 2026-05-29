import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "browse/cinema-row";

const MARQUEE_SNIPPET = `<div className="grid h-[min(32rem,68vh)] grid-cols-2 gap-3">
  <Marquee vertical pauseOnHover applyMask={false} className="h-full [--duration:26s] [--gap:14px]">
    {QUOTES.map((quote) => (
      <QuoteChip key={\`up-\${quote.source}\`} {...quote} />
    ))}
  </Marquee>
  <Marquee vertical reverse pauseOnHover applyMask={false} className="h-full [--duration:31s] [--gap:14px]">
    {QUOTES.map((quote) => (
      <QuoteChip key={\`down-\${quote.source}\`} {...quote} />
    ))}
  </Marquee>
</div>`;

const SCROLL_ROW_SNIPPET = `<div className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
  <div className="flex w-max gap-4 px-5 snap-x snap-mandatory">
    {PREMIERES.map((film) => (
      <article key={film.title} className="w-[11.25rem] shrink-0 snap-start">
        <div className="aspect-[2/3] rounded-xl ring-1 ring-white/10" style={{ backgroundImage: film.gradient }} />
      </article>
    ))}
  </div>
</div>`;

export function CinemaRowNotes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Stream · premiere browse"
        description="Apple TV-style browse page — overscale premiere type, snap-scrolling poster rail, editorial copy with opposing vertical marquees. Fictional titles; not affiliated with Apple."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            Streaming homepages lead with one title at cinema scale, park a swipeable poster row
            underneath, then break into editorial sections where copy sits beside motion. This demo
            follows that rhythm on a black field with oklch poster gradients instead of licensed key
            art.
          </p>
          <p>
            The hero is local typography and buttons. The premieres row is native horizontal scroll
            with <code>snap-x</code> — thumb-driven, not auto-scrolling. The footer pairs long-form
            copy with two <code>Marquee</code> columns running in opposite directions.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            One Animata primitive: vertical <code>Marquee</code> twice (forward +{" "}
            <code>reverse</code>). Hero, poster cards, snap row, and quote chips are local.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            Headline uses <code>clamp(3.25rem, 14vw, 7.5rem)</code> with tight negative tracking.
            Bottom padding references <code>var(--demo-chrome-reserve)</code> so demo chrome never
            covers the Play row.
          </p>
          <p>
            Marquees get different durations (26s vs 31s) so the columns don&apos;t feel locked in
            phase. <code>applyMask={false}</code> keeps quote chips fully visible inside the
            bordered wells. <code>prefers-reduced-motion</code> swaps both columns for static
            stacks.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Opposing vertical marquees">{MARQUEE_SNIPPET}</DemoNotes.Code>
        <DemoNotes.Code caption="Snap poster rail">{SCROLL_ROW_SNIPPET}</DemoNotes.Code>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={4} title="Full source">
        <DemoNotes.Prose>
          <p>Pulled from the demo file at build time. Copy what you need below.</p>
        </DemoNotes.Prose>
        <DemoNotes.Bleed>
          <DemoSourcePanel files={sources} />
        </DemoNotes.Bleed>
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
