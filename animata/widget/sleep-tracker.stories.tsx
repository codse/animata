import { Meta, StoryObj } from "@storybook/react";
import SleepTracker from "@/animata/widget/sleep-tracker";

const meta = {
  title: "Widget/Sleep Tracker",
  component: SleepTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SleepTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: "A",
        progress: 45,
        className: "rounded-md bg-blue-600/45",
      },
      { label: "B", progress: 25, className: "rounded-md bg-blue-600/25" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "D", progress: 30, className: "rounded-md bg-blue-600/30" },
      { label: "E", progress: 70, className: "rounded-md bg-blue-600/70" },
      {
        label: "A",
        progress: 45,
        className: "rounded-md bg-blue-600/45",
      },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 15, className: "rounded-md bg-blue-600/15" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "B", progress: 10, className: "rounded-md bg-blue-600/20" },
      { label: "C", progress: 85, className: "rounded-md bg-blue-600/85" },
      {
        label: "D",
        progress: 90,
        className: "rounded-md bg-blue-600/90",
      },
      { label: "E", progress: 15, className: "rounded-md bg-blue-600/15" },
    ],
    image: "https://plus.unsplash.com/premium_photo-1675107359574-e3ba5f47a1a2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};
