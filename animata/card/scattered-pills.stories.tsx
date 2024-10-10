import ScatteredPills from "@/animata/card/scattered-pills";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Scattered Pills",
  component: ScatteredPills,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScatteredPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
