import WaterTracker from "@/animata/widget/water-tracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Water Tracker",
  component: WaterTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WaterTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    dailyGoal: 3000,
  },
};
