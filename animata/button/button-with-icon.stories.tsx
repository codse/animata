import ButtonWithIcon from "@/animata/button/button-with-icon";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Button With Icon",
  component: ButtonWithIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ButtonWithIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Instagram",
  },
};
