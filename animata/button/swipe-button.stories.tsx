import SwipeButton from "@/animata/button/swipe-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Swipe Button",
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
    className: "",
    secondText: "Get access",
    firstText: "Get access",
    firstClass: "bg-orange-500 text-white",
    secondClass: "bg-red-500 text-white",
  },
};
