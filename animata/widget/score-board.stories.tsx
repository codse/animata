import ScoreBoard from "@/animata/widget/score-board";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Score Board",
  component: ScoreBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScoreBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: "A",
        progress: 34,
        className: "rounded-md bg-green-500",
      },
      {
        label: "B",
        progress: 14,
        className: "rounded-md bg-red-500",
      },
      {
        label: "C",
        progress: 34,
        className: "rounded-md bg-green-500",
      },
      {
        label: "D",
        progress: 70,
        className: "rounded-md bg-green-500",
      },
      {
        label: "E",
        progress: 52,
        className: "rounded-md bg-green-500",
      },
      {
        label: "F",
        progress: 30,
        className: "rounded-md bg-green-500",
      },
      {
        label: "G",
        progress: 37,
        className: "rounded-md bg-green-500",
      },
      {
        label: "H",
        progress: 72,
        className: "rounded-md bg-green-500",
      },
      {
        label: "I",
        progress: 42,
        className: "rounded-md bg-green-500",
      },
    ],
  },
};
