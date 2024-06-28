import ToggleSwitch from "@/animata/button/toggle-switch";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Toggle Switch",
  component: ToggleSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    onChange: () => {},
  },
};
