import TeamClock from "@/animata/widget/team-clock";
import { Meta, StoryObj } from "@storybook/react";

const testTeamClockProps = {
  users: [
    {
      name: "User 1",
      city: "New York",
      country: "USA",
      timeDifference: "-5",
      pfp: "https://avatar.vercel.sh/1",
    },
    {
      name: "User 2",
      city: "London",
      country: "UK",
      timeDifference: "+5",
      pfp: "https://avatar.vercel.sh/2",
    },
  ],
  clockSize: 250,
  animationDuration: 0.3,
  accentColor: "#34D399",
  backgroundColor: "#ECFDF5",
  textColor: "#065F46",
  borderColor: "#D1FAE5",
  hoverBackgroundColor: "#D1FAE5",
  showSeconds: true,
  use24HourFormat: false,
};

const meta = {
  title: "Widget/Team Clock",
  component: TeamClock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testTeamClockProps,
};
