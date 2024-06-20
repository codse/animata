import { Meta, StoryObj } from "@storybook/react";
import SwipeButton from "./swipe-button";

const meta = {
  title: "Button/Slide Button",
  component: SwipeButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwipeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    borderColor: "#192de3",
    firstBg: "#f5cb42",
    secondBg: "#080807",
    firstTextColor: "#192de3",
    secondTextColor: "#f5f6fc",
    secondtext: "Get Passes",
    firsttext: "Get Passes",
  },
};
