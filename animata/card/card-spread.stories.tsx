import CardSpread from "@/animata/card/card-spread";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Card Spread",
  component: CardSpread,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CardSpread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
