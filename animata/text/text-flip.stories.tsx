import TextFlip from "@/animata/text/text-flip";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Flip",
  component: TextFlip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextFlip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
