import ProductWhatsNew from "@/animata/hero/product-whats-new";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Product What's New",
  component: ProductWhatsNew,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProductWhatsNew>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
