import Ticker from "@/animata/text/ticker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Ticker",
  component: Ticker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Ticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "456.78",
    className: "text-4xl md:text-7xl font-black",
  },
};
