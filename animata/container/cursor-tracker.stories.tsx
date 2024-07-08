import CursorTracker from "@/animata/container/cursor-tracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Container/Cursor Tracker",
  component: CursorTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CursorTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
