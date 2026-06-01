import type { Meta, StoryObj } from "@storybook/react";
import ShoppingList from "@/animata/widget/shopping-list";

const meta = {
  title: "Widget/Shopping List",
  component: ShoppingList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShoppingList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroceryRun: Story = {
  name: "Grocery run",
  args: {
    title: "Shopping list",
  },
};

export const Primary = GroceryRun;
