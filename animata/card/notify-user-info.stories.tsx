import NotifyUserInfo from "@/animata/card/notify-user-info";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Notify User Info",
  component: NotifyUserInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NotifyUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    aiName: "Rostra AI",
    userName: "Sandra",
    paperTopic: "neural conditions",
    doctorName: "DoctorLLM",
    earnings: "$0.25c",
    weekTotal: "$400",
  },
};
