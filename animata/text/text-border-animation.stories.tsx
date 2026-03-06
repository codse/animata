import type { Meta, StoryObj } from "@storybook/react";
import TextBorderAnimation from "@/animata/text/text-border-animation";

const meta = {
  title: "Text/Text Border Animation",
  component: TextBorderAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextBorderAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Programming",
  },
};
