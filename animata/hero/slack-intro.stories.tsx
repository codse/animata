import SlackIntro from "@/animata/hero/slack-intro";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Slack Intro",
  component: SlackIntro,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SlackIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
