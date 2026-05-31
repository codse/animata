import type { Meta, StoryObj } from "@storybook/react";

import SplitReveal from "@/animata/preloader/split-reveal";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&h=1125&q=85",
];

const meta = {
  title: "Preloader/Split Reveal",
  component: SplitReveal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    revealDuration: { control: { type: "number", min: 0.2, max: 2, step: 0.05 } },
    progressFadeMs: { control: { type: "number", min: 0, max: 800, step: 20 } },
    holdMs: { control: { type: "number", min: 0, max: 1200, step: 20 } },
    backgroundColor: { control: "color" },
    foregroundColor: { control: "color" },
    lockScroll: { control: "boolean" },
  },
} satisfies Meta<typeof SplitReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <>
      <div className="flex min-h-svh items-center justify-center bg-zinc-100 px-6">
        <p className="max-w-md text-center text-2xl font-semibold tracking-tight text-zinc-900">
          Page content mounts normally. SplitReveal covers it until images load.
        </p>
      </div>
      <SplitReveal {...args} />
    </>
  ),
  args: {
    images: SAMPLE_IMAGES,
    backgroundColor: "#fff",
    foregroundColor: "#000",
    revealDuration: 0.85,
    holdMs: 240,
    lockScroll: true,
  },
};

export const CustomProgress: Story = {
  render: (args) => (
    <>
      <div className="flex min-h-svh items-center justify-center bg-neutral-950 px-6 text-white">
        <p className="text-xl font-medium">Underneath the overlay</p>
      </div>
      <SplitReveal
        {...args}
        renderProgress={({ progress, loaded, total }) => (
          <p className="text-center text-sm tabular-nums text-white/70">
            {loaded}/{total} · {progress}%
          </p>
        )}
      />
    </>
  ),
  args: {
    images: SAMPLE_IMAGES,
    backgroundColor: "#0a0a0a",
    foregroundColor: "#fff",
    revealDuration: 0.85,
    holdMs: 240,
    lockScroll: true,
  },
};

export const ComposedOverlay: Story = {
  render: (args) => (
    <>
      <div className="flex min-h-svh items-center justify-center bg-zinc-200 px-6">
        <p className="text-lg font-medium text-zinc-800">Full overlay override via children</p>
      </div>
      <SplitReveal {...args}>
        <SplitReveal.Shutter side="top" />
        <SplitReveal.Shutter side="bottom" />
        <SplitReveal.Progress>
          {({ loaded, total }) => (
            <p className="text-center text-xs uppercase tracking-[0.14em] text-black/50">
              {loaded} of {total}
            </p>
          )}
        </SplitReveal.Progress>
      </SplitReveal>
    </>
  ),
  args: {
    images: SAMPLE_IMAGES,
    backgroundColor: "#fff",
    foregroundColor: "#000",
    revealDuration: 0.85,
    holdMs: 240,
    lockScroll: true,
  },
};
