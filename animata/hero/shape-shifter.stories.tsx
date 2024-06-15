import ShapeShifter from "@/animata/hero/shape-shifter";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Shape Shifter",
  component: ShapeShifter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShapeShifter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
