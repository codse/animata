import type { Meta, StoryObj } from "@storybook/react";
import Modal from "@/animata/overlay/modal";

const meta = {
  title: "Overlay/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    modalSize: {
      control: { type: "select" },
      options: ["sm", "lg"],
    },
  },
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
