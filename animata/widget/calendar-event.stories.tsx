import type { Meta, StoryObj } from "@storybook/react";
import CalendarEvent, { testCalendarEventProps } from "@/animata/widget/calendar-event";

const meta = {
  title: "Widget/Calendar event",
  component: CalendarEvent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CalendarEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testCalendarEventProps,
};
