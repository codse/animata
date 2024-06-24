import Cycling from "@/animata/widget/cycling";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Cycling",
  component: Cycling,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Cycling>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
