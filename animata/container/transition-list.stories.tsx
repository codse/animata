import TransitionList from "@/animata/container/transition-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Container/Transition List",
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
