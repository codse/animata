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
        description="A Plane-like spring release page: four stacked chapters and a small UI panel in each."
      />

      <DemoNotes.Section id="concept" index={1} title="Concept">
        <DemoNotes.Prose>
          <p>
            The demo reads like a quarterly ship note for a project tool. You scroll through four
            beats (messy triage, cycles, customer requests, rollout). Panes alternate light and dark
            so you can still see what is underneath when the next one pins. Each chapter has a tiny
            mock UI block so the story feels real, not like placeholder copy on a gray card.
          </p>
        </DemoNotes.Prose>
      </DemoNotes.Section>

      <DemoNotes.Section id="components" index={2} title="Components used">
        <DemoNotes.Prose>
          <p>
            Only <code>StackedSections</code> from the library. The chapter layout, colors, and
            vignettes all live in this demo file.
          </p>
        </DemoNotes.Prose>
        <DemoNotes.ComponentLinks demoKey={DEMO_KEY} />
      </DemoNotes.Section>

      <DemoNotes.Section id="build" index={3} title="How it's built">
        <DemoNotes.Prose>
          <p>
            Four <code>ReleaseChapter</code> sections sit inside <code>StackedSections</code> with{" "}
            <code>stackOffset={40}</code>. That offset is the peek band when a pane gets covered;
            you do not need a separate eyebrow row for it.
          </p>
          <p>
            The intro and footer add bottom padding so the first and last chapters are not hidden
            behind the fixed demo bar.
          </p>
        </DemoNotes.Prose>
        <DemoSourcePanel files={sources} />
      </DemoNotes.Section>
    </DemoNotes.Root>
  );
}
