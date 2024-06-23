import SleepTracker, { testSleepTrackerProps } from "@/animata/widget/sleep-tracker";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Sleep Tracker",
  component: SleepTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SleepTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testSleepTrackerProps,
};
