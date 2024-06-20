import StudyTimer from "@/animata/widget/study-timer";
import { Meta, StoryObj } from "@storybook/react";

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
  args: {
    segments: [
      { value: 57, color: "orange" },
      { value: 24, color: "pink" },
      { value: 26, color: "yellow" },
    ],
  },
};
