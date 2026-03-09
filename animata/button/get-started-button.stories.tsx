import type { Meta, StoryObj } from "@storybook/react";
import GetStartedButton from "@/animata/button/get-started-button";

const meta = {
  title: "Button/Get Started Button",
  component: GetStartedButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GetStartedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Get Started",
  },
};
