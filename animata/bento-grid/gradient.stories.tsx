import type { Meta, StoryObj } from "@storybook/react";
import Gradient from "@/animata/bento-grid/gradient";

const meta = {
  title: "Bento Grid/Gradient",
  component: Gradient,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Gradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
