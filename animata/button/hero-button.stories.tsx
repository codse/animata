import HeroButton from "@/animata/button/hero-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Hero Button",
  component: HeroButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeroButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Get Started",
  },
};
