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
    secondtext: "Get Passesssssssssss",
    firsttext: "Get Passessssssssssss",
    firstClass: "bg-red-500 text-blue-800",
    secondClass: "bg-black text-white",
  },
};
