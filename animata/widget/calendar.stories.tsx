import { Meta, StoryObj } from "@storybook/react";
import Calendar from "@/animata/widget/calendar";

const meta = {
  title: "Widget/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    dates: [
      {
        title: "Backlog Updates",
        time: "10:30-10:45",
        color: "text-purple-900",
        bgcolor: "bg-purple-200",
        barcolor: "bg-purple-900",
        datecolor: "text-purple-400",
      },
      {
        title: "Review Jade A",
        time: "12:00-12:45",
        color: "text-cyan-900",
        bgcolor: "bg-cyan-200",
        barcolor: "bg-cyan-900",
        datecolor: "text-cyan-400",
      },
    ],
  },
};
