import ProductFeatures from "@/animata/hero/product-features";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Product Features",
  component: ProductFeatures,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProductFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
