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
    labelMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt. Vestibulum eleifend nibh a est tristique sollicitudin.",
  },
};
