import type { Meta, StoryObj } from "@storybook/react";
import WaveReveal from "@/animata/text/wave-reveal";

const meta = {
  title: "Text/Wave Reveal",
  component: WaveReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down"],
    },
    mode: {
      control: { type: "select" },
      options: ["letter", "word"],
    },
  },
} satisfies Meta<typeof WaveReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello World",
    direction: "down",
    mode: "letter",
    duration: "2000ms",
    delay: 0,
    blur: true,
    className: "text-foreground",
  },
};
