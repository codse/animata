import TrailingImage from "@/animata/image/trailing-image";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Trailing Image",
  component: TrailingImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TrailingImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
