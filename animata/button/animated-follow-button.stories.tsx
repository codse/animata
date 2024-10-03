import AnimatedFollowButton from "@/animata/button/animated-follow-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Animated Follow Button",
  component: AnimatedFollowButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialText: { control: "text" },
    changeText: { control: "text" },
    className: { control: "text" },
    changeTextClassName: { control: "text" },
  },
} satisfies Meta<typeof AnimatedFollowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialText: "Follow",
    changeText: "Following!",
    className: "h-16 bg-green-100 text-green-700 flex rounded-full items-center justify-center",
    changeTextClassName:
      "h-16 bg-green-700 text-green-100 rounded-full text-white flex items-center justify-center",
  },
  render: (args) => (
    <div className="relative flex h-40 items-center justify-center">
      <AnimatedFollowButton {...args} />
    </div>
  ),
};

export const DifferentAnimations: Story = {
  render: () => (
    <div className="relative grid grid-cols-3 gap-6 h-60 w-full items-center justify-center">
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
        changeTextClassName="h-16 bg-blue-600 text-blue-100 rounded-xl text-white flex items-center justify-center"
        initialText={
          <span className="inline-flex items-center">
            Default
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Up To Down
          </span>
        }
      />
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600"
        changeTextClassName="h-16 bg-zinc-600 text-zinc-100 rounded-xl text-white flex items-center justify-center"
        animationType="down-to-up"
        initialText={
          <span className="inline-flex items-center">
            Click Me
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Down To Up
          </span>
        }
      />
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-red-100 text-red-600"
        changeTextClassName="h-16 bg-red-600 text-red-100 rounded-xl text-white flex items-center justify-center"
        animationType="zoom-in"
        initialText={
          <span className="inline-flex items-center">
            Click Me
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Zoom In
          </span>
        }
      />
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600"
        changeTextClassName="h-16 bg-yellow-600 text-yellow-100 rounded-xl text-white flex items-center justify-center"
        animationType="zoom-out"
        initialText={
          <span className="inline-flex items-center">
            Click Me
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Zoom Out
          </span>
        }
      />
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-orange-100 text-orange-600"
        changeTextClassName="h-16 bg-orange-600 text-orange-100 rounded-xl text-white flex items-center justify-center"
        animationType="left-to-right"
        initialText={
          <span className="inline-flex items-center">
            Click Me
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Left To Right
          </span>
        }
      />
      <AnimatedFollowButton
        className="flex h-16 items-center justify-center rounded-xl bg-purple-100 text-purple-600"
        changeTextClassName="h-16 bg-purple-600 text-purple-100 rounded-xl text-white flex items-center justify-center"
        animationType="right-to-left"
        initialText={
          <span className="inline-flex items-center">
            Click Me
          </span>
        }
        changeText={
          <span className="inline-flex items-center">
            Right To Left
          </span>
        }
      />
    </div>
  ),
};
