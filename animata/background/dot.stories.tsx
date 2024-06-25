import Dot from "@/animata/background/dot";
import { Meta, StoryObj } from "@storybook/react";

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
