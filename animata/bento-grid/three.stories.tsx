import Three from "@/animata/bento-grid/three";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Three",
  component: Three,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Three>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
