import TypingText from "@/animata/text/typing-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Typing Text",
  component: TypingText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TypingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "> yarn add @animata/awesomeness",
    grow: false,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
      <TypingText {...props} />
    </div>
  ),
};

export const Smooth: Story = {
  args: {
    text: "This is a smooth typing text",
    delay: 50,
    alwaysVisibleCount: 0,
    smooth: true,
    waitTime: 5000,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
      <TypingText {...props} />
    </div>
  ),
};
