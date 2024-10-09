import CommentReplayCard from "@/animata/card/comment-replay-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Comment Replay Card",
  component: CommentReplayCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CommentReplayCard>;

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
