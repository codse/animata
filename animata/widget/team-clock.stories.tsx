import TeamClock, { testTeamClockProps } from "@/animata/widget/team-clock";
import { Meta, StoryObj } from "@storybook/react";

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