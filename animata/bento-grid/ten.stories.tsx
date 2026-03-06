import type { Meta, StoryObj } from "@storybook/react";
import Ten from "@/animata/bento-grid/ten";

const meta = {
  title: "Bento Grid/Ten",
  component: Ten,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Ten>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
