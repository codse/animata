import MaskText from "@/animata/text/mask-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Mask Text",
  component: MaskText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MaskText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "h-[30rem]",
    revealText: "I find joy in PHP.",
    originalText: <p>I am a Javascript developer.</p>,
  },
};
