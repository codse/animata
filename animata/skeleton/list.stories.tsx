import List from "@/animata/skeleton/list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
