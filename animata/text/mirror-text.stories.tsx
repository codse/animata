import type { Meta, StoryObj } from "@storybook/react";
import MirrorText from "@/animata/text/mirror-text";

const meta = {
  title: "Text/Mirror Text",
  component: MirrorText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MirrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "ANIMATA",
  },
};
