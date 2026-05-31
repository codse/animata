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

const LAYOUT_SNIPPET = `{/* mobile: column stack; desktop: 2:3 row, both pinned to bottom */}
<div className="flex flex-col gap-8 md:h-full md:flex-1 md:flex-row md:gap-6">
  <div className="md:flex md:flex-[2] md:flex-col md:justify-end">{/* hero */}</div>

  <div className="md:flex md:flex-[3] md:flex-col md:justify-end md:@container/print md:[container-type:size]">
    <figure className="flex w-full flex-col">
      <figcaption>{/* active frame metadata */}</figcaption>

      <div className="flex w-full flex-col md:ml-auto md:w-[min(100cqw,calc((100cqh-4.5rem)*8/11))]">
        <div aria-hidden className="aspect-[8/1] w-full" />
        <div className="relative aspect-[4/5] w-full">{/* CardStack */}</div>
      </div>
    </figure>
  </div>
</div>`;

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
        description="Minimal wedding portfolio: intro bottom-left, 4:5 print stack on the right, mouse trails underneath. SplitReveal preloads first."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            Fake site for Maya, a wedding photographer. White page, black type, not much else. Name
            and contact sit in the bottom-left; a tall stack of prints fills the right. On phone the
            stack goes full width; on desktop it hugs the right edge. Wedding stills from Lummi
            follow the cursor behind everything.
          </p>
          <p>
            The first thing you see is not the page. <code>SplitReveal</code> covers the screen,
            loads every image, and ticks progress on the center seam. When the batch finishes, the
            halves slide apart. The layout was already there, just hidden.
          </p>
          <p>
            Whichever print is on top gets corner brackets, like a viewfinder. The rest are plain
            photos.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            <code>SplitReveal</code> sits next to the page as a fixed overlay. Pass{" "}
            <code>images</code>, wire <code>onComplete</code>, done. We skipped the{" "}
            <code>.Content</code> wrapper on purpose; the real layout mounts normally underneath.
          </p>
          <p>
            <code>CardStack</code> advances the portfolio. Autoplay only starts after the preloader
            clears. <code>PrintCaption</code> mirrors the top frame with fake shutter metadata.
            Camera and map pin icons are Lucide Animated. They only move on hover so the hero stays
            quiet.
          </p>
          <p>
            <code>TrailingImage</code> at <code>z-10</code>. Hero and caption refs sit on the
            exclude list so trails skip readable text but can still drift over the prints.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            All image URLs live in <code>LUMMI_ASSETS</code>: six stack frames, twelve for trails,
            one avatar. All cropped through a shared <code>lummi()</code> helper.{" "}
            <code>PRELOAD_IMAGES</code> dedupes before SplitReveal sees them.
          </p>
          <p>
            Layout is a column on mobile, 2:3 row on desktop. Hero and print column both use{" "}
            <code>justify-end</code> so extra height goes above the copy, not between the caption
            and the stack. That gap looked wrong in early passes.
          </p>
          <p>
            Print width was the annoying part. We tried JS measurement first; on desktop the caption
            and stack kept drifting out of sync. Switched to a size container on the print column
            and capped width with <code>min(100cqw, calc((100cqh - 4.5rem) * 8 / 11))</code> for a
            4:5 frame plus a 10% peek strip (<code>aspect-[8/1]</code>) that fits the viewport
            height. No <code>ResizeObserver</code>.
          </p>
          <p>
            Caption had a white fill at one point. It fought the page background and made the
            metadata feel like a sticker. Dropped it; caption and page share the same canvas now.
          </p>
          <p>
            For trails we first excluded the whole stack. Looked too clean; nothing ever crossed the
            prints. Narrowed it to the hero and caption wrappers only.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Responsive print column, container query sizing">
          {LAYOUT_SNIPPET}
        </DemoNotes.Code>
        <DemoNotes.Code caption="SplitReveal as a sibling overlay">
          {PRELOADER_SNIPPET}
        </DemoNotes.Code>
        <DemoNotes.Code caption="Trail layer, exclude text wrappers">
          {TRAIL_EXCLUDE_SNIPPET}
        </DemoNotes.Code>
      </DemoNotes.Section>

      <DemoNotes.Section id="credits" index={4} title="Credits">
        <DemoNotes.Prose>
          <p>
            Photos from <a href="https://www.lummi.ai">Lummi</a>, wedding and event searches. IDs
            are in <code>LUMMI_ASSETS</code>. Fine for demos; use your own shots for anything real.
          </p>
          <p>
            Icons: <a href="https://lucide-animated.com/icons/map-pin">Map Pin</a> and{" "}
            <a href="https://lucide-animated.com/icons/switch-camera">Switch Camera</a> (Lucide
            Animated, MIT).
          </p>
          <p>
            Type:{" "}
            <a href="https://fontsource.org/fonts/instrument-sans">Instrument Sans Variable</a>{" "}
            (Fontsource).
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={5} title="Full source">
        <DemoNotes.Prose>
          <p>
            Pulled from the demo file at build time. Copy what you need below; component links are
            above.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Bleed>
          <DemoSourcePanel files={sources} />
        </DemoNotes.Bleed>
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
