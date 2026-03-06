import type { Meta, StoryObj } from "@storybook/react";
import DonutChart from "@/animata/graphs/donut-chart";

const meta = {
  title: "Graphs/Donut Chart",
  component: DonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 200,
    progress: 30,
  },
};
