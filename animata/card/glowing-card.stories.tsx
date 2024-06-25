import GlowingCard from "@/animata/card/glowing-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Glowing Card",
  component: GlowingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlowingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fromColor: "#4158D0",
    viaColor: "#C850C0",
    toColor: "#FFCC70",
  },
};
