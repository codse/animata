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
    title: "Lorem ipsum.",
    className: "hover:bg-blue-400 hover:border-blue-400 ",
  },
};
