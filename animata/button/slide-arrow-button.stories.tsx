import SlideArrowButton from "@/animata/button/slide-arrow-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Slide Arrow Button",
  component: SlideArrowButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SlideArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Get Started",
    primaryColor: "#6f3cff",
  },
};
