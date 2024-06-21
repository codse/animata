import CalorieCounter from "@/animata/widget/calorie-counter";
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
  args: {
    goal: 4000,
    fulfilled: 120,
    image: "https://plus.unsplash.com/premium_vector-1689096672037-98309fdc7f44?bg=FFFFFF&q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};
