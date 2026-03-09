import type { Meta, StoryObj } from "@storybook/react";
import WeeklyProgress from "@/animata/widget/weekly-progress";

const meta = {
  title: "Widget/Weekly Progress",
  component: WeeklyProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WeeklyProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
