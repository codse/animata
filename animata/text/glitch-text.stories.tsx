import GlitchText from "@/animata/text/glitch-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Glitch Text",
  component: GlitchText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlitchText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "1000 Stars",
    starCount: 50,
  },
};
