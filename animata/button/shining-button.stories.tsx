import type { Meta, StoryObj } from "@storybook/react";
import ShiningButton from "@/animata/button/shining-button";

const meta = {
  title: "Button/Shining Button",
  component: ShiningButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShiningButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
