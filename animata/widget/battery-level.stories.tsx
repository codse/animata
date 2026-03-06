import type { Meta, StoryObj } from "@storybook/react";
import BatteryLevel from "@/animata/widget/battery-level";

const meta = {
  title: "Widget/Battery Level",
  component: BatteryLevel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BatteryLevel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
