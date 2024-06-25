import GaugeChart from "@/animata/graphs/gauge-chart";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Graphs/Gauge Chart",
  component: GaugeChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gap: 100,
    progress: 70,
    size: 150,
    progressWidth: 10,
    circleWidth: 10,
    rounded: true,
    showValue: true,
  },
};
