import ExpenseTracker, { spendingTrackerProps } from "@/animata/widget/expense-tracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Expense Tracker",
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
  args: spendingTrackerProps,
};
