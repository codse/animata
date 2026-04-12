import type { Meta, StoryObj } from "@storybook/react";
import CycleText from "@/animata/text/cycle-text";

const meta = {
  title: "Text/Cycle Text",
  component: CycleText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CycleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
