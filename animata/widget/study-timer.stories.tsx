import type { Meta, StoryObj } from "@storybook/react";
import StudyTimer, { testStudyTimerProps } from "@/animata/widget/study-timer";

const meta = {
  title: "Widget/Study Timer",
  component: StudyTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StudyTimer>;

export default meta;

type Story = StoryObj<typeof StudyTimer>;

export const Primary: Story = {
  args: testStudyTimerProps,
};
