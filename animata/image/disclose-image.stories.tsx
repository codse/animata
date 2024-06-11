import DiscloseImage from "@/animata/image/disclose-image";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Disclose Image",
  component: DiscloseImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DiscloseImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3",
    alt: "A beautiful image",
    doorClassName: "bg-yellow-200",
  },
};
