import VideoChat from "@/animata/widget/video-chat";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Video Chat",
  component: VideoChat,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VideoChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
