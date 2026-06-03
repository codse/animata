import { DemoNotes } from "@/app/demo/demo-notes";
import { DemoSourcePanel } from "@/app/demo/demo-source-panel";
import { DEMO_SOURCES } from "@/app/demo/generated/demo-sources";

const DEMO_KEY = "scroll/stacked-sections-demo-001";

export function StackedSectionsDemo001Notes() {
  const sources = DEMO_SOURCES[DEMO_KEY] ?? [];

  return (
    <DemoNotes.Root>
      <DemoNotes.Header
        id="demo-notes-title"
        eyebrow="Recipe"
        title="Stacked sections · demo 001"
        description="Plane-style product release scroll — four chapters with inline UI vignettes on StackedSections."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            A quarterly release page for a project-management product. Each chapter is a full
            viewport beat: problem, cycles, customer inbox, rollout. Light and dark panes alternate
            so the stack reads clearly; small panels inside each chapter sell the use case without
            leaving the story.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            One Animata primitive (<code>StackedSections</code>). Release chapters, palettes, and
            vignette blocks are local to this demo file.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            <code>StackedSections</code> wraps four <code>ReleaseChapter</code> sections with{" "}
            <code>stackOffset={40}</code> so prior panes peek as color bands when covered — no
            eyebrow strip required.
          </p>
          <p>
            Intro and outro reserve bottom padding so the first and last chapters clear the demo
            footer bar.
          </p>
        </DemoNotes.Prose>
        <DemoSourcePanel files={sources} />
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
