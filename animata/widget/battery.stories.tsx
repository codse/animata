import Battery from "@/animata/widget/battery";
import { Meta, StoryObj } from "@storybook/react";

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
