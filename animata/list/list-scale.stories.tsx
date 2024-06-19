import ListScale from "@/animata/list/list-scale";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/List Scale",
  component: ListScale,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ListScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
