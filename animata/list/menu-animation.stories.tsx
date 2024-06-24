import MenuAnimation from "@/animata/list/menu-animation";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Menu Animation",
  component: MenuAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MenuAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    menuItems: [
      "Home",
      "Features",
      "Company",
      "FAQs",
      "Terms of Use",
      "Get In Touch",
    ],
  },
};
