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
    repeat: true,
    grow: false,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
      <TypingText {...props} />
    </div>
  ),
};

export const Quote: Story = {
  args: {
    text: "The following excerpt from Carl Sagan's book Pale Blue Dot was inspired by an image taken, at Sagan's suggestion, by Voyager 1 on 14 February 1990. As the spacecraft was departing our planetary neighborhood for the fringes of the solar system, it turned it around for one last look at its home planet.",
    repeat: true,
    delay: 16,
    alwaysVisibleCount: 0,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-blue-200 px-4 py-2 text-blue-600 shadow-lg">
      <div className="mb-1 text-lg font-bold">Quote</div>
      <TypingText {...props} />
    </div>
  ),
};
