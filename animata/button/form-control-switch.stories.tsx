import { FormControlSwitch } from "@/animata/button/form-control-switch";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Form Control Switch",
  component: FormControlSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FormControlSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: (_value: boolean) => {},
  },
};
