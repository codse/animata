import ExpenseTracker from "@/animata/widget/expense-tracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Spending Tracker",
  component: ExpenseTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ExpenseTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    spending: [
      { day: "M", amount: 12000 },
      { day: "T", amount: 16000 },
      { day: "W", amount: 42000 },
      { day: "T", amount: 4000 },
      { day: "F", amount: 28000 },
      { day: "Sa", amount: 20000 },
      { day: "Su", amount: 1000 },
    ],
  },
};
