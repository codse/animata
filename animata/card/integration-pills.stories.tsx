import IntegrationPills from "@/animata/card/integration-pills";
import { Meta, StoryObj } from "@storybook/react";

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
