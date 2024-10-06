import DisclosureInteraction from "@/animata/button/disclosure-interaction";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Disclosure Interaction",
  component: DisclosureInteraction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DisclosureInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
