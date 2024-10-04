import ReminderScheduler from "@/animata/card/reminder-scheduler";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Reminder Scheduler",
  component: ReminderScheduler,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReminderScheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
