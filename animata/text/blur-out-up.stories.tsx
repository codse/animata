import type { Meta, StoryObj } from "@storybook/react";
import BlurOutUp from "@/animata/text/blur-out-up";

const meta = {
  title: "Text/Blur Out Up",
  component: BlurOutUp,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BlurOutUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Clear in, airy out.",
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
