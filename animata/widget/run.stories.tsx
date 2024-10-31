import Run from "@/animata/widget/run";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Run",
  component: Run,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Run>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
