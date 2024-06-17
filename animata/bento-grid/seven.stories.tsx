import Seven from "@/animata/bento-grid/seven";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Seven",
  component: Seven,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Seven>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
