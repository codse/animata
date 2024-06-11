import Counter, { Formatter } from "@/animata/text/counter";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    targetValue: 1000,
  },
};

export const Percentage: Story = {
  args: {
    targetValue: 100,
    direction: "up",
    format: (value) => value.toFixed(0) + "%",
  },
};

export const Currency: Story = {
  args: {
    targetValue: 1000,
    direction: "up",
    format: Formatter.currency,
  },
};
