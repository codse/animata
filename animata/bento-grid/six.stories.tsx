import Six from "@/animata/bento-grid/six";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Six",
  component: Six,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Six>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
