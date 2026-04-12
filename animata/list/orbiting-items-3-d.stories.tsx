import type { Meta, StoryObj } from "@storybook/react";
import OrbitingItems3D, { LucideIcons } from "@/animata/list/orbiting-items-3-d";

const meta = {
  title: "List/Orbiting Items 3 D",
  component: OrbitingItems3D,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrbitingItems3D>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    radiusX: 120,
    radiusY: 30,
    items: LucideIcons,
    duration: 25,
    tiltAngle: 360 - 30,
  },
};
