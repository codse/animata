import type { Meta, StoryObj } from "@storybook/react";
import StorageWidget from "@/animata/widget/storage-widget";

const meta = {
  title: "Widget/Storage Widget",
  component: StorageWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorageWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
