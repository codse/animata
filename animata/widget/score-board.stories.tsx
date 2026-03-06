import type { Meta, StoryObj } from "@storybook/react";
import ScoreBoard, { testScoreBoardProps } from "@/animata/widget/score-board";

const meta = {
  title: "Widget/Score Board",
  component: ScoreBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScoreBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: testScoreBoardProps,
};
