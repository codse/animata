import type { Meta, StoryObj } from "@storybook/react";
import AiButton from "@/animata/button/ai-button";

const meta = {
  title: "Button/Ai Button",
  component: AiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
