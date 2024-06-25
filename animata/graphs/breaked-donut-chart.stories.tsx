import BreakedDonutChart from "@/animata/graphs/breaked-donut-chart";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Graphs/Breaked Donut Chart",
  component: BreakedDonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BreakedDonutChart>;

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
