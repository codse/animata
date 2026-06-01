import type { Meta, StoryObj } from "@storybook/react";
import CalorieCounter from "@/animata/widget/calorie-counter";

const meta = {
  title: "Widget/Calorie Counter",
  component: CalorieCounter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CalorieCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    goal: 4000,
    fulfilled: 120,
  },
};
