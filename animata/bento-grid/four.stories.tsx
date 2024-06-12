import Four from "@/animata/bento-grid/four";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Bento Grid/Four",
  component: Four,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Four>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
