import Modal from "@/animata/overlay/modal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Overlay/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    modalSize: "sm",
  },
};

export const Seconday: Story = {
  args: {
    modalSize: "lg",
  },
};
