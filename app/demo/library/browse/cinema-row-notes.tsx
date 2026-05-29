import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "browse/cinema-row";

const HERO_SEQUENCE_SNIPPET = `function heroSequenceDelays() {
  const titleEnd =
    HERO_TITLE_DELAY_MS +
    (HERO_TITLE_WORDS - 1) * HERO_WORD_STAGGER_MS +
    HERO_WORD_DURATION_MS;

  return {
    eyebrow: 0,
    title: HERO_TITLE_DELAY_MS,
    tagline: titleEnd - 220,
    runtime: titleEnd - 40,
    ctaPrimary: titleEnd + 120,
    ctaSecondary: titleEnd + 220,
    premieresLabel: ctaSecondary + 140,
    premieresMeta: ctaSecondary + 220,
    premieresRail: ctaSecondary + 260,
  };
}

<WaveReveal
  text={FEATURED.title}
  mode="word"
  direction="up"
  blur
  duration="700ms"
  delay={delays.title}
  className="..."
/>
<p className="cinema-hero-rise" style={{ animationDelay: \`\${delays.tagline}ms\` }}>
  {FEATURED.tagline}
</p>`;

const PREMIERES_SNIPPET = `<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
  <Marquee
    pauseOnHover
    applyMask={false}
    className="py-1 pl-5 [--duration:38s] [--gap:1rem] sm:pl-8 sm:[--gap:1.25rem]"
  >
    {PREMIERES.map((film) => (
      <PosterCard key={film.title} {...film} />
    ))}
  </Marquee>
</div>`;

const STILLS_SNIPPET = `<MarqueeWell className="h-full min-h-0 max-w-fit">
  <Marquee vertical pauseOnHover applyMask={false} className="h-full p-0 [--duration:32s] [--gap:12px]">
    {STILLS_LEFT.map((still) => (
      <LandscapeStill key={still.title} {...still} variant="wide" />
    ))}
  </Marquee>
</MarqueeWell>
<MarqueeWell tone="amber" className="h-full min-h-0 max-w-fit">
  <Marquee vertical reverse pauseOnHover applyMask={false} className="h-full p-0 [--duration:38s] [--gap:12px]">
    {STILLS_RIGHT.map((still) => (
      <LandscapeStill key={still.title} {...still} variant="tall" />
    ))}
  </Marquee>
</MarqueeWell>`;

export function CinemaRowNotes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Stream browse"
        description="Apple TV-style layout: gradient hero with staggered premiere copy, a scrolling poster rail, then a craft panel with twin vertical still columns. TMDB art — demo only."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            Three bands on one page. The hero is type on a violet radial scrim — eyebrow, title,
            tagline, runtime, and CTAs stagger in after load. Below that, premieres scroll
            horizontally. The craft panel pairs short copy with two still columns drifting in
            opposite directions.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            <code>WaveReveal</code> (<code>mode="word"</code>) on the hero title.{" "}
            <code>Marquee</code> on the premieres rail and both still columns (
            <code>pauseOnHover</code>, <code>applyMask={"{false}"}</code> — local masks instead).
            Hero rise/fall and delay math live in the demo file as <code>cinema-hero-rise</code>{" "}
            plus <code>heroSequenceDelays()</code>.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            <code>heroSequenceDelays()</code> derives every entrance offset from the title word
            count and <code>WaveReveal</code> timing — eyebrow through the premieres rail share one
            sequence. <code>cinema-hero-rise</code> is a local keyframe (blur +{" "}
            <code>translateY</code>) on everything except the title words.
          </p>
          <p>
            The premieres wrapper uses a black-edge <code>mask-image</code> because{" "}
            <code>Marquee</code>&apos;s built-in mask reads as a gray wash on black.{" "}
            <code>Premieres</code> and <code>Now playing</code> get their own rise delays; the rail
            follows slightly after.
          </p>
          <p>
            Still columns sit in <code>MarqueeWell</code> trays (violet left, amber right). Left
            column is <code>aspect-video</code>; right is taller (<code>aspect-[5/3]</code>) and
            scrolls <code>reverse</code>. On small screens the wells sit in a{" "}
            <code>flex justify-evenly</code> row; from <code>md</code> they grid inside the craft
            panel beside the copy.
          </p>
          <p>
            <code>prefers-reduced-motion</code> drops the marquees to static scroll stacks and
            renders the hero without stagger.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Hero delay sequence + WaveReveal">
          {HERO_SEQUENCE_SNIPPET}
        </DemoNotes.Code>
        <DemoNotes.Code caption="Premieres rail — custom edge mask">
          {PREMIERES_SNIPPET}
        </DemoNotes.Code>
        <DemoNotes.Code caption="Craft panel still columns">{STILLS_SNIPPET}</DemoNotes.Code>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={4} title="Full source">
        <DemoNotes.Prose>
          <p>Synced from the demo file at build time. Take whatever you need below.</p>
        </DemoNotes.Prose>
        <DemoNotes.Bleed>
          <DemoSourcePanel files={sources} />
        </DemoNotes.Bleed>
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
