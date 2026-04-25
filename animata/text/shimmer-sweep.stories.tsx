import type { Meta, StoryObj } from "@storybook/react";
import ShimmerSweep from "@/animata/text/shimmer-sweep";

const meta = {
  title: "Text/Shimmer Sweep",
  component: ShimmerSweep,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShimmerSweep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
