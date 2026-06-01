import type { Meta, StoryObj } from "@storybook/react";
import WaterTracker from "@/animata/widget/water-tracker";

const meta = {
  title: "Widget/Water Tracker",
  component: WaterTracker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WaterTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MorningStart: Story = {
  name: "Morning start",
  args: {
    dailyGoal: 2000,
    defaultIntake: 500,
    sipMl: 250,
  },
};

export const AfternoonCatchUp: Story = {
  name: "Afternoon catch-up",
  args: {
    dailyGoal: 2500,
    defaultIntake: 1400,
    sipMl: 300,
  },
};
