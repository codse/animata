import type { Meta, StoryObj } from "@storybook/react";
import Battery from "@/animata/widget/battery";

const meta = {
  title: "Widget/Battery",
  component: Battery,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Battery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
