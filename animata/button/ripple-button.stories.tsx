import RippleButton from "@/animata/button/ripple-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Ripple Button",
  component: RippleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof RippleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Homepage: Story = {
  args: {
    children: "Homepage",
  },
};
