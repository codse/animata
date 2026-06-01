import type { Meta, StoryObj } from "@storybook/react";
import CalendarEvent from "@/animata/widget/calendar-event";

const workdayEvents = [
  { title: "Design critique", time: "10:00 – 10:45", variant: "violet" as const },
  { title: "Lunch with Alex", time: "12:30 – 1:15", variant: "cyan" as const },
  { title: "Ship review", time: "3:00 – 4:00", variant: "emerald" as const },
  { title: "Yoga", time: "6:30 – 7:30", variant: "amber" as const },
];

const meta = {
  title: "Widget/Calendar Event",
  component: CalendarEvent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    date: new Date(2026, 4, 30),
    events: workdayEvents,
  },
} satisfies Meta<typeof CalendarEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkdayGlance: Story = {
  name: "Workday glance",
};

export const LightAfternoon: Story = {
  name: "Light afternoon",
  args: {
    events: [
      { title: "Focus block", time: "2:00 – 4:00", variant: "violet" },
      { title: "1:1", time: "4:30 – 5:00", variant: "rose" },
    ],
  },
};

export const Primary = WorkdayGlance;
