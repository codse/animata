import type { Meta, StoryObj } from "@storybook/react";
import TextExplodeIMessage from "@/animata/text/text-explode-imessage";

const meta = {
  title: "Text/Text Explode Imessage",
  component: TextExplodeIMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextExplodeIMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "iMessage text explode effect 🧨 🔥 🎃 🎉 🪅",
    className: "text-red-500",
  },
};
