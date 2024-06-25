import ReminderWidget from "@/animata/widget/reminder-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Reminder Widget",
  component: ReminderWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReminderWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
