import NotificationCard from "@/animata/card/notification-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Notification Card",
  component: NotificationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;
const RosettaLogo: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#10B981" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="white"
      fontSize="20"
      fontWeight="bold"
    >
      R
    </text>
  </svg>
);

export const Primary: Story = {
  args: {
    title: "Rosetta AI",
    message: "Your dataset on renewable energy efficiency has just been cited by Dr. A. Scott",
    RosettaLogo,
    userInfo: {
      name: "Dr. A. Scott",
      title: "Senior Researcher",
      avatar: "https://avatars.githubusercontent.com/u/17984567?v=4",
    },
  },
};
