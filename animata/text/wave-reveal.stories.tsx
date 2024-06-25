import WaveReveal from "@/animata/text/wave-reveal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Wave Reveal",
  component: WaveReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WaveReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello World",
    className: "text-foreground",
  },
};
