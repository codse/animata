import type { Meta, StoryObj } from "@storybook/react";
import Dot from "@/animata/background/dot";

const meta = {
  title: "Background/Dot",
  component: Dot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
