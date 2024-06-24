import CycleText from "@/animata/text/cycle-text";
import { Meta, StoryObj } from "@storybook/react";

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
