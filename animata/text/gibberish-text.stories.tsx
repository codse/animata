import GibberishText from "@/animata/text/gibberish-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Gibberish Text",
  component: GibberishText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GibberishText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello World",
    className: "text-6xl font-black",
  },
};
