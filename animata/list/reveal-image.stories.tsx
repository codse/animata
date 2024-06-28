import RevealImageList from "@/animata/list/reveal-image";
import { Meta, StoryObj } from "@storybook/react";

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
