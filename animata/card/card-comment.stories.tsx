import type { Meta, StoryObj } from "@storybook/react";
import { CardComment } from "@/animata/card/card-comment";

const meta = {
  title: "Card/Card Comment",
  component: CardComment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CardComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    commenter: "Anna ",
    replier: "Sumana",
  },
};
