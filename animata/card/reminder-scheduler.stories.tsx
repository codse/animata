import { useState } from "react";

import ReminderScheduler from "@/animata/card/reminder-scheduler";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Reminder Scheduler",
  component: ReminderScheduler,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isRepeating: { control: "boolean" },
    repeatInterval: { control: "text" },
  },
} satisfies Meta<typeof ReminderScheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const [isRepeating, setIsRepeating] = useState(args.isRepeating);
    const [repeatInterval, setRepeatInterval] = useState(args.repeatInterval);

    const toggleRepeating = () => {
      setIsRepeating((prev) => !prev);
    };

    return (
      <ReminderScheduler
        {...args}
        isRepeating={isRepeating}
        toggleRepeating={toggleRepeating}
        repeatInterval={repeatInterval}
        setRepeatInterval={setRepeatInterval}
        daysOfWeek={["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]}
      />
    );
  },
  args: {
    isRepeating: true,
    repeatInterval: "Weekly",
    toggleRepeating: () => {},
    setRepeatInterval: () => {},
    daysOfWeek: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  },
};
