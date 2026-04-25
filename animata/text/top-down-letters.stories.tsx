import type { Meta, StoryObj } from "@storybook/react";
import TopDownLetters from "@/animata/text/top-down-letters";

const meta = {
  title: "Text/Top-Down Letters",
  component: TopDownLetters,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TopDownLetters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Signal",
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
