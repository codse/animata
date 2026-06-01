import type { Meta, StoryObj } from "@storybook/react";
import Reminder from "@/animata/widget/reminder";

const meta = {
  title: "Widget/Reminder",
  component: Reminder,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Reminder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandupIn30: Story = {
  name: "Standup in 30",
  args: {
    title: "Today",
    buckets: [
      { label: "Work", count: 2, className: "bg-violet-200 dark:bg-violet-500/35" },
      { label: "Personal", count: 1, className: "bg-emerald-200 dark:bg-emerald-500/35" },
    ],
    nextLabel: "Engineering standup in 30 min",
  },
};

export const WeekendErrands: Story = {
  name: "Weekend errands",
  args: {
    title: "Saturday",
    buckets: [
      { label: "Home", count: 4, className: "bg-emerald-200 dark:bg-emerald-500/35" },
      { label: "Shop", count: 2, className: "bg-amber-200 dark:bg-amber-500/35" },
    ],
    nextLabel: "Grocery pickup at 2:00 PM",
  },
};
