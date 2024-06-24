import ArrowButton from "@/animata/button/arrow-button";
import { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "Button/Arrow Button",
  component: ArrowButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ArrowButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello",
    textColor: "black",
    buttonOverlayColor: "#bf49ff",
    borderColor: "#c284f9",
    iconColor: "white",
  },
};
