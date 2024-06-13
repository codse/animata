import Clock from "@/animata/widget/clock";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Clock",
  component: Clock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Clock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
