import type { Meta, StoryObj } from "@storybook/react";
import LiveScore from "@/animata/widget/live-score";

const meta = {
  title: "Widget/Live Score",
  component: LiveScore,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LiveScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
