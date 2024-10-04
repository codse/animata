import ImagesReveal from "@/animata/image/images-reveal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Images Reveal",
  component: ImagesReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ImagesReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
