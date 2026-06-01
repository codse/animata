import type { Meta, StoryObj } from "@storybook/react";
import ReminderWidget from "@/animata/widget/reminder-widget";

const meta = {
  title: "Widget/Reminder Widget",
  component: ReminderWidget,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ReminderWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TripPacking: Story = {
  name: "Trip packing",
  args: {
    title: "Packing",
  },
};

export const Primary = TripPacking;
