import type { Meta, StoryObj } from "@storybook/react";
import BlurStackCard from "@/animata/card/blur-stack-card";

const meta = {
  title: "Card/Blur Stack Card",
  component: BlurStackCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlurStackCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
