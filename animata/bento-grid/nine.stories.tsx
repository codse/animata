import type { Meta, StoryObj } from "@storybook/react";
import Nine from "@/animata/bento-grid/nine";

const meta = {
  title: "Bento Grid/Nine",
  component: Nine,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Nine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
