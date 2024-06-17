import { Meta, StoryObj } from "@storybook/react";
import WaterTracker from "./water-tracker";

const meta = {
  title: "Widget/Watertracker",
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
    dailyGoal: 5000,
  },
};
