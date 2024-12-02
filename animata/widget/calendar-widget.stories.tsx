import CalendarWidget from "@/animata/widget/calendar-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Calendar Widget",
  component: CalendarWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialSelectedDate: {
      control: { type: "number", min: 1, max: 30 },
      defaultValue: 1,
    },
    initialShowEvents: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    eventsData: {
      control: { type: "object" },
      defaultValue: [
        { date: 3, title: "Project Review", time: "10:00 - 11:00 AM" },
        { date: 5, title: "Client Meeting", time: "9:00 - 9:45 AM" },
        { date: 18, title: "Walk", time: "6:00 - 7:00 AM" },
      ],
    },
  },
} satisfies Meta<typeof CalendarWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialSelectedDate: 1,
    initialShowEvents: true,
    eventsData: [
      { date: 3, title: "Project Review", time: "10:00 - 11:00 AM" },
      { date: 3, title: "Project discussion", time: "11:00 - 12:00 AM" },
      { date: 5, title: "Client Meeting", time: "9:00 - 9:45 AM" },
      { date: 18, title: "Walk", time: "6:00 - 7:00 AM" },
    ],
    month: 3,
    year: 2023,
  },
};
