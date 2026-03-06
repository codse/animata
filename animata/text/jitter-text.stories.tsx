import type { Meta, StoryObj } from "@storybook/react";
import JitterText from "@/animata/text/jitter-text";

const meta = {
  title: "Text/Jitter Text",
  component: JitterText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof JitterText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Jitter Text",
    className: "text-6xl font-black",
  },
};
