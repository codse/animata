import TiltedCard from "@/animata/card/tilted-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Tilted Card",
  component: TiltedCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TiltedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "This is a primary card and you can also customize the card.",
    className: "hover:bg-pink-500 hover:border-pink-500",
  },
};
