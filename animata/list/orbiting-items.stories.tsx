import OrbitingItems, { testOrbitingItems } from "@/animata/list/orbiting-items";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Orbiting Items",
  component: OrbitingItems,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrbitingItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: testOrbitingItems,
    radius: 50,
  },
};
