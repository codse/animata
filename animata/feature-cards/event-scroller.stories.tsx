import { EventScroller } from "@/animata/feature-cards/event-scroller";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feature Cards/Event Scroller",
  component: EventScroller,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof EventScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cardData: [
      {
        date: 28,
        day: "mon",
        heading: "Shift",
        content1: "🕗23:00   to   🕗2:00",
        button1: "California",
      },
      {
        date: 29,
        day: " tue",
        heading: "Christmas party 24",
        content1: "🗓️ 25 dec  🕗 18:00 ",
        content2: "🎅 🎅🏻 🎅🏼  🎉 🎉 🎉",
      },
      { date: 30, day: "wed", heading: "Workday", button1: "California", button2: "chefs" },
    ],
  },
};
