import type { Meta, StoryObj } from "@storybook/react";
import BoldCopy from "@/animata/text/bold-copy";

const meta = {
  title: "Text/Bold Copy",
  component: BoldCopy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BoldCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Animata",
  },
};
