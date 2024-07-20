import LedBoard from "@/animata/card/led-board";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Led Board",
  component: LedBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LedBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    word: "copy",
  },
};
