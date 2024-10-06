import CommentReply from "@/animata/card/comment-reply";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Comment Reply",
  component: CommentReply,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CommentReply>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
