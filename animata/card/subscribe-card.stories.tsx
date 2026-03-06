import type { Meta, StoryObj } from "@storybook/react";
import SubscribeCard from "@/animata/card/subscribe-card";

const meta = {
  title: "Card/Subscribe Card",
  component: SubscribeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SubscribeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
