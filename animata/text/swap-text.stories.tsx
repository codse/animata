import SwapText from "@/animata/text/swap-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Swap Text",
  component: SwapText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwapText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialText: "Open",
    finalText: "Close",
    supportsHover: true,
  },
};

export const ClickOnly: Story = {
  args: {
    initialText: "Menu",
    finalText: "Close",
    supportsHover: false,
    className: "text-blue-500",
  },
};
