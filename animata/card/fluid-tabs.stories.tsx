import type { Meta, StoryObj } from "@storybook/react";
import FluidTabs from "@/animata/card/fluid-tabs";

const meta = {
  title: "Card/Fluid Tabs",
  component: FluidTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FluidTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
