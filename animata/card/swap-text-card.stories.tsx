import SwapTextCard from "@/animata/card/swap-text-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Swap Text Card",
  component: SwapTextCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwapTextCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialText: "Hand-crafted ✍️ interaction animation on internet",
    finalText:
      "Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time.",
  },
};
