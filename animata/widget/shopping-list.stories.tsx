import ShoppingList from "@/animata/widget/shopping-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Shopping List",
  component: ShoppingList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShoppingList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
