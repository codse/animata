import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "hero/photographer-portfolio";

const TRAIL_EXCLUDE_SNIPPET = `<TrailingImage
  edgeToEdge
  layerOnly
  contained
  images={TRAIL_IMAGES}
  threshold={88}
  maxTrailZIndex={12}
  excludeRefs={[heroRef, captionRef]}
/>`;

const PRELOADER_SNIPPET = `<section>{/* your page */}</section>

<SplitReveal
  images={PRELOAD_IMAGES}
  lockScroll
  onComplete={() => setPreloaderDone(true)}
  renderProgress={({ loaded, total, progress }) => (
    <>
      <SplitReveal.ProgressTrack progress={progress} foregroundColor="#000" />
      <p>Loading frames · {loaded}/{total}</p>
    </>
  )}
/>`;

export function PhotographerPortfolioNotes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Photographer portfolio"
        description="White page, hero copy on the left, print stack on the right. SplitReveal sits on top as a sibling — no wrapping required."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            Maya&apos;s portfolio page with almost nothing else on it. White background, black type,
            a short intro in the bottom-left corner, and a tall 4:5 stack on the right. Move the
            mouse and wedding frames from Lummi trail behind the layout.
          </p>
          <p>
            Before any of that shows, <code>SplitReveal</code> preloads every image and covers the
            viewport. Progress ticks up on the center seam; when the batch is done, the top and
            bottom halves slide apart. The page was already mounted underneath — you just
            couldn&apos;t see it yet.
          </p>
          <p>The active stack frame gets viewfinder brackets. Everything else is just the photo.</p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            <code>SplitReveal</code> is a fixed overlay you drop next to your layout — pass{" "}
            <code>images</code>, optionally <code>renderProgress</code>, and it handles preload,
            scroll lock, and the split exit. No <code>.Content</code> wrapper.
          </p>
          <p>
            <code>CardStack</code> cycles the portfolio forward; autoplay waits until the preloader
            finishes. <code>PrintCaption</code> reads the active frame and fakes exposure metadata.
            Hero camera and map pin icons come from Lucide Animated and only animate on hover.
          </p>
          <p>
            <code>TrailingImage</code> runs at <code>z-10</code>. Hero and caption refs are on the
            exclude list so trails never land on readable text.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            URLs live in <code>LUMMI_ASSETS</code> — six stack frames, twelve trail frames, one
            avatar — all cropped through a shared <code>lummi()</code> helper.{" "}
            <code>PRELOAD_IMAGES</code> dedupes the lot before handing it to SplitReveal.
          </p>
          <p>
            <code>PortfolioLayout</code> is a 2:3 grid on desktop. Hero pins to the bottom of the
            left column; the stack column keeps the caption above the cards with a little peek
            padding so the promoted frame can breathe.
          </p>
          <p>
            Trail blocking is DOM-based. Only the hero and caption wrappers are excluded — not the
            whole stack — so photos can still drift over the prints.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="SplitReveal as a sibling overlay">
          {PRELOADER_SNIPPET}
        </DemoNotes.Code>
        <DemoNotes.Code caption="Trail layer — exclude text wrappers">
          {TRAIL_EXCLUDE_SNIPPET}
        </DemoNotes.Code>
      </DemoNotes.Section>

      <DemoNotes.Section id="credits" index={4} title="Credits">
        <DemoNotes.Prose>
          <p>
            <strong>Photos</strong> — from <a href="https://www.lummi.ai">Lummi</a> (wedding and
            event searches). IDs are in <code>LUMMI_ASSETS</code>. Fine for demos; swap in your own
            work for anything client-facing.
          </p>
          <p>
            <strong>Icons</strong> — <a href="https://lucide-animated.com/icons/map-pin">Map Pin</a>{" "}
            and <a href="https://lucide-animated.com/icons/switch-camera">Switch Camera</a> from
            Lucide Animated (MIT).
          </p>
          <p>
            <strong>Type</strong> —{" "}
            <a href="https://fontsource.org/fonts/instrument-sans">Instrument Sans Variable</a> via
            Fontsource.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={5} title="Full source">
        <DemoNotes.Prose>
          <p>Pulled from the demo file at build time.</p>
        </DemoNotes.Prose>
        <DemoNotes.Bleed>
          <DemoSourcePanel files={sources} />
        </DemoNotes.Bleed>
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
