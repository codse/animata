import type { Meta, StoryObj } from "@storybook/react";
import SplitText from "@/animata/text/split-text";

const meta = {
  title: "Text/Split Text",
  component: SplitText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SplitText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "ANIMATA",
  },
};
