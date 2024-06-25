import DiagonalLines from "@/animata/background/diagonal-lines";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Diagonal Lines",
  component: DiagonalLines,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
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
} satisfies Meta<typeof DiagonalLines>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
