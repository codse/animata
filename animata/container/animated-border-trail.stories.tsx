import type { Meta, StoryObj } from "@storybook/react";
import AnimatedBorderTrail from "@/animata/container/animated-border-trail";

const meta = {
  title: "Container/Animated Border Trail",
  component: AnimatedBorderTrail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    trailSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof AnimatedBorderTrail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    duration: "10s",
    trailColor: "purple",
    trailSize: "sm",
    children: (
      <div className="max-w-sm text-balance p-4 text-center font-medium text-zinc-600">
        No longer wasting hours 🕕 looking for the inspiration or trying to write everything from
        scratch 📝.
      </div>
    ),
  },
};

export const Button: Story = {
  render: (args) => (
    <div className="flex items-center justify-center bg-zinc-900 p-12">
      <AnimatedBorderTrail {...args} />
    </div>
  ),
  args: {
    className: "rounded-full bg-zinc-600 hover:bg-zinc-500",
    contentClassName: "rounded-full bg-zinc-800",
    trailColor: "white",
    children: (
      <button className="rounded-full px-3 py-1 text-sm text-white">Learn more &rarr;</button>
    ),
  },
};
