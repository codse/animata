import FluidTabs from "@/animata/card/fluid-tabs";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Tabs/Fluid Tabs",
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
