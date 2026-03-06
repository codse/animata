import type { Meta, StoryObj } from "@storybook/react";
import RevealImageList from "@/animata/list/reveal-image";

const meta = {
  title: "List/Reveal image",
  component: RevealImageList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RevealImageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
