import Nine from "@/animata/bento-grid/nine";
import { Meta, StoryObj } from "@storybook/react";

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
