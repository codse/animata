import type { Meta, StoryObj } from "@storybook/react";
import Counter, { Formatter } from "@/animata/text/counter";

const meta = {
  title: "Text/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down"],
    },
  },
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
    format: (value) => `${value.toFixed(0)}%`,
  },
};

export const Currency: Story = {
  args: {
    targetValue: 1000,
    direction: "up",
    format: Formatter.currency,
  },
};
