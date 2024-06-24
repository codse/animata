import AlarmClock from "@/animata/widget/alarm-clock";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Alarm Clock",
  component: AlarmClock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AlarmClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    alarms: [
      { id: 0, time: "7:30 AM", repetition: "Once" },
      { id: 1, time: "8:00 AM", repetition: "Daily" },
      { id: 2, time: "9:00 AM", repetition: "Weekdays" },
    ],
  },
};
