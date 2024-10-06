import ConfirmationMessage from "@/animata/feature-cards/confirmation-message";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feature Cards/Confirmation Message",
  component: ConfirmationMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ConfirmationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    successMessage: "Process Successful",
    labelName: "Animata",
    labelMessage: `The Confirmation Message component is a sleek, animated UI element that displays a checkmark with a success message.
      It expands to reveal a personalized detailed description of the process.`,
  },
};
