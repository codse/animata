import CalorieCounter, { testCalorieCounterProps } from "@/animata/widget/calorie-counter";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Calorie Counter",
  component: CalorieCounter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CalorieCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testCalorieCounterProps,
};
