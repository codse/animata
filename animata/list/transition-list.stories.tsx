import type { Meta, StoryObj } from "@storybook/react";
import TransitionList from "@/animata/list/transition-list";

const meta = {
  title: "List/Transition List",
  component: TransitionList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TransitionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
