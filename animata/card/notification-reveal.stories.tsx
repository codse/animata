import { Meta, StoryObj } from "@storybook/react";

import NotificationReveal from "./notification-reveal";

const meta: Meta<typeof NotificationReveal> = {
  title: "Card/Notification Reveal",
  component: NotificationReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NotificationReveal>;

export const Primary: Story = {
  args: {
    notifications: [
      {
        title: "Notification 1",
        description: "This is the first notification.",
        img: "",
      },
      {
        title: "Notification 2",
        description: "This is the second notification.",
        img: "",
      },
      {
        title: "Notification 3",
        description: "This is the third notification.",
        img: "",
      },
      {
        title: "Notification 4",
        description: "This is the third notification.",
        img: "",
      },
      {
        title: "Notification 5",
        description: "This is the third notification.",
        img: "",
      },
    ],
  },
};
