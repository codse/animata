import SwapCard from "@/animata/card/swap-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Swap Card",
  component: SwapCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwapCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    firstImage:
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    secondImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};
