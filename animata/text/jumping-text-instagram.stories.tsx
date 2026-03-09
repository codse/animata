import type { Meta, StoryObj } from "@storybook/react";
import JumpingTextInstagram from "@/animata/text/jumping-text-instagram";

const meta = {
  title: "Text/Jumping Text Instagram",
  component: JumpingTextInstagram,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["word", "character"],
    },
  },
} satisfies Meta<typeof JumpingTextInstagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "This is a jumping text effect",
  },
};
