import type { Meta, StoryObj } from "@storybook/react";
import PerCharacterRise from "@/animata/text/per-character-rise";

const meta = {
  title: "Text/Per Character Rise",
  component: PerCharacterRise,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof PerCharacterRise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "One more thing.",
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
