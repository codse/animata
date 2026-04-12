import type { Meta, StoryObj } from "@storybook/react";
import RippleButton from "@/animata/button/ripple-button";

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

export const Primary: Story = {
  args: {
    children: "Homepage",
  },
};
