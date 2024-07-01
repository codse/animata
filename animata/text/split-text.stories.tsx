import SplitText from "@/animata/text/split-text";
import { Meta, StoryObj } from "@storybook/react";

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
