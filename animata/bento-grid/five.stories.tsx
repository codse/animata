import type { Meta, StoryObj } from "@storybook/react";
import Five from "@/animata/bento-grid/five";

const meta = {
  title: "Bento Grid/Five",
  component: Five,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Five>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
