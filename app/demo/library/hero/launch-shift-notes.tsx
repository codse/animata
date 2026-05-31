import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "hero/launch-shift";

const HEADLINE_SNIPPET = `<h1>
  <span className="block bg-linear-to-b from-white via-[#F5F5F3] to-[#A8A8A6] bg-clip-text text-transparent">
    Superpowers,
  </span>
  <span className="block bg-linear-to-b from-white via-[#F5F5F3] to-[#A8A8A6] bg-clip-text text-transparent">
    everywhere you work.
  </span>
</h1>`;

const BOIDS_SNIPPET = `<BoidsEcosystem
  count={count}
  background="#0E0E10"
  palette={["#EFEAE0", "#EFEAE0", "#C3B5FF", "#9F90E0"]}
  agentShape="dot"
  cursorRadius={80}
  className="h-full w-full rounded-none opacity-90"
/>`;

export function LaunchShiftNotes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Superhuman platform hero"
        description="The Grammarly to Superhuman rebrand hero from superhuman.com. Not affiliated; same headline and subhead, local layout."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            Copy is lifted from{" "}
            <a href="https://superhuman.com/" target="_blank" rel="noreferrer">
              superhuman.com
            </a>
            : &quot;Superpowers, everywhere you work&quot; and &quot;Mail, Docs, and AI that works
            in every app and tab.&quot; That&apos;s the post-rebrand platform pitch (Mail,
            Grammarly, Coda, Go) rather than the old mail-only Split Inbox page.
          </p>
          <p>
            Black field, warm off-white body text, violet on the badge. Headline fades white to
            gray, split across two lines so the gradient doesn&apos;t muddy the second row. Boids
            behind a vignette for edge motion.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>One Animata primitive. Badge, buttons, vignette, and type are local.</p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
        <DemoNotes.Prose>
          <p>
            Dots and a small cursor radius feel like texture here. The footer wordmark demo runs the
            same boids with triangles and a cooler palette.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            <code>BoidsEcosystem</code> is absolute at <code>opacity-90</code>. A radial gradient on
            top darkens the center. Flock stays visible around the edges; headline stays readable.
          </p>
          <p>
            96 boids, 48 when <code>prefers-reduced-motion</code> is on. Tap get Superhuman and the
            label switches to &quot;You&apos;re in&quot;. No page change.
          </p>
          <p>
            Headline is two <code>span</code>s, each with its own <code>bg-linear-to-b</code> and{" "}
            <code>bg-clip-text</code>. One gradient on the whole <code>h1</code> makes the second
            line look muddy. Per-line fixes that.
          </p>
          <p>
            Body is capped at <code>max-w-[42ch]</code>. Bottom padding uses{" "}
            <code>var(--demo-chrome-reserve)</code> so the demo chrome doesn&apos;t cover the
            buttons.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.Code caption="Headline gradient">{HEADLINE_SNIPPET}</DemoNotes.Code>
        <DemoNotes.Code caption="Boids layer">{BOIDS_SNIPPET}</DemoNotes.Code>
      </DemoNotes.Section>

      <DemoNotes.Section id="source" index={4} title="Full source">
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
