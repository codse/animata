import PolarisButtonSecondary from "@/animata/button/polaris-button-secondary";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Polaris Button Secondary",
  component: PolarisButtonSecondary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PolarisButtonSecondary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
