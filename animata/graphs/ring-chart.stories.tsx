import type { Meta, StoryObj } from "@storybook/react";
import Rings from "@/animata/graphs/ring-chart";

const meta = {
  title: "Graphs/Ring Chart",
  component: Rings,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Rings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 96,
    gap: 4,
    width: 20,
    rings: [
      {
        progress: 10,
        trackClassName: "text-rose-600/10",
        progressClassName: "text-rose-600",
      },
      {
        progress: 60,
        trackClassName: "text-lime-500/20",
        progressClassName: "text-lime-500",
      },
      {
        progress: 40,
        trackClassName: "text-teal-400/30",
        progressClassName: "text-teal-400",
      },
    ],
  },
};
