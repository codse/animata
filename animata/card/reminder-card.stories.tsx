import ReminderCard from "@/animata/card/reminder-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Reminder Card",
  component: ReminderCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReminderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
