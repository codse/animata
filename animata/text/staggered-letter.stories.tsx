import type { Meta, StoryObj } from "@storybook/react";
import StaggeredLetter from "@/animata/text/staggered-letter";

const meta = {
  title: "Text/Staggered Letter",
  component: StaggeredLetter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "drop"],
    },
  },
} satisfies Meta<typeof StaggeredLetter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Animata",
    delay: 0.09,
    applyMask: true,
    direction: "drop",
  },
};
