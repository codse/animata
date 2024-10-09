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
        description: (
          <p>
            Payment of <span className="bold text-blue-700">$20</span> sent for book club fee
          </p>
        ),
        img: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      },
      {
        title: "Notification 2",
        description: (
          <p>
            Paid you <span className="bold text-blue-700">$45</span> for shared ride service
          </p>
        ),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRPWpO-12m19irKlg8znjldmcZs5PO97B6A&s",
      },
      {
        title: "Notification 3",
        description: (
          <p>
            You received a payment of <span className="bold text-blue-700">$72</span>
          </p>
        ),
        img: "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg",
      },
      {
        title: "Notification 4",
        description: (
          <p>
            Paid you <span className="bold text-blue-700">$45</span> for shared ride service
          </p>
        ),
        img: "https://cdn6.f-cdn.com/files/download/38546484/28140e.jpg",
      },
      {
        title: "Notification 5",
        description: "This is the fifth notification.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWAke9JalGdtG8WstKTrhHikhibvwJFYdbIpyuc4QOwVcSCwly__Lw721P-nWX0YEmHAQ&usqp=CAU",
      },
    ],
  },
};
