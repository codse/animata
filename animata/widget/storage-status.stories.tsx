import type { Meta, StoryObj } from "@storybook/react";
import StorageStatus from "@/animata/widget/storage-status";

const meta = {
  title: "Widget/Storage Status",
  component: StorageStatus,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorageStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
