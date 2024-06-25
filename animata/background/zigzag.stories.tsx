import Zigzag from "@/animata/background/zigzag";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Zigzag",
  component: Zigzag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "range",
        min: 5,
        max: 100,
        step: 5,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Zigzag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
