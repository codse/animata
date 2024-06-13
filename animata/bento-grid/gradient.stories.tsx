import Gradient from "@/animata/bento-grid/gradient";
import { Meta, StoryObj } from "@storybook/react";

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
