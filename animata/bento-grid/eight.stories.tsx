import Eight from "@/animata/bento-grid/eight";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Eight",
  component: Eight,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Eight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
