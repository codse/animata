import Eleven from "@/animata/bento-grid/eleven";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Eleven",
  component: Eleven,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Eleven>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
