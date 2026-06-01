import type { Meta, StoryObj } from "@storybook/react";
import AlarmClock from "@/animata/widget/alarm-clock";

const meta = {
  title: "Widget/Alarm Clock",
  component: AlarmClock,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AlarmClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeekdayRoutine: Story = {
  name: "Weekday routine",
  args: {
    alarms: [
      { id: "weekday", time: "6:45 AM", schedule: "Weekdays" },
      { id: "gym", time: "7:15 AM", schedule: "Mon, Wed, Fri" },
    ],
    defaultEnabledIds: ["weekday"],
  },
};

export const WeekendSleepIn: Story = {
  name: "Weekend sleep in",
  args: {
    alarms: [{ id: "weekend", time: "9:30 AM", schedule: "Sat & Sun" }],
    defaultEnabledIds: [],
  },
};
