import type { Meta, StoryObj } from "@storybook/react";
import FundWidget from "@/animata/widget/fund-widget";

const meta = {
  title: "Widget/Fund Widget",
  component: FundWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FundWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    funds: [
      { value: "2.7Cr", change: 12, label: "Stocks" },
      { value: "3.5Cr", change: -8, label: "Funds" },
      { value: "1.2Cr", change: 6, label: "Deposits" },
    ],
  },
};
