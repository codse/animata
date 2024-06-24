import { Meta, StoryObj } from "@storybook/react";

import BlurryBlob from "./blurry-blob";

const meta = {
  title: "Background/Blurry Blob",
  component: BlurryBlob,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BlurryBlob>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "rounded-xl opacity-45",
    firstBlobColor: "bg-purple-400",
    secondBlobColor: "bg-blue-400",
  },
};
