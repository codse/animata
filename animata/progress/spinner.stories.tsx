import Spinner from "@/animata/progress/spinner";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Progress/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "bg-gradient-to-bl from-black to-blue-400",
    outerSize: "h-8 w-8",
    childSize: "h-6 w-6",
  },
};
