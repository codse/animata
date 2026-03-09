import type { Meta, StoryObj } from "@storybook/react";
import IntegrationPills from "@/animata/card/integration-pills";

const meta = {
  title: "Card/Integration pills",
  component: IntegrationPills,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof IntegrationPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
