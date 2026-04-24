import type { Meta, StoryObj } from "@storybook/react";
import SpringScaleIn from "@/animata/text/spring-scale-in";

const meta = {
  title: "Text/Spring Scale In",
  component: SpringScaleIn,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SpringScaleIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Fast. Crisp. Fluid.",
    speed: 0.72,
    holdMs: 550,
    gapMs: 320,
    className:
      "h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
  },
};
