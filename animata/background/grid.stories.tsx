import Grid from "@/animata/background/grid";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Grid",
  component: Grid,
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
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
