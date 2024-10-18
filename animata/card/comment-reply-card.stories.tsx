import CommentReplyCard from "@/animata/card/comment-reply-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Comment Reply Card",
  component: CommentReplyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CommentReplyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialComments = [
  {
    id: 1,
    user: "Mike",
    text: ["Is it just me, or is the font size on this page designed for ants?"],
    time: "13 hours ago",
    avatarColor: "#e8824b",
  },
];

export const Primary: Story = {
  args: { initialComments },
};
