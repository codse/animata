import type { Meta, StoryObj } from "@storybook/react";
import FibonacciLines from "@/animata/container/fibonacci-lines";

const meta = {
  title: "Container/Fibonacci Lines",
  component: FibonacciLines,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FibonacciLines>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    reverse: false,
    className: "storybook-fix w-full",
  },
};
