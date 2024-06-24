import DoubleUnderline from "@/animata/text/double-underline";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Double Underline",
  component: DoubleUnderline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DoubleUnderline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Built using",
    className: "text-2xl font-bold",
  },
};
