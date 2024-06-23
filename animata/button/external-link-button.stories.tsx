import ExternalLinkButton from "@/animata/button/external-link-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/External link",
  component: ExternalLinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ExternalLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Open Link",
  },
};
