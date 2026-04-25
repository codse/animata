import type { Meta, StoryObj } from "@storybook/react";
import MicroScaleFade from "@/animata/text/micro-scale-fade";

const meta = {
  title: "Text/Micro Scale Fade",
  component: MicroScaleFade,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MicroScaleFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Welcome to motion.",
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
