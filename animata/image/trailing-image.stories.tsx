import type { Meta, StoryObj } from "@storybook/react";
import TrailingImage from "@/animata/image/trailing-image";

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
  args: {
    className: "h-96 w-full max-w-md rounded-xl border border-border",
    children: <div aria-hidden className="h-full w-full" />,
  },
};
