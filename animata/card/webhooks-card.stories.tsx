import { WebHooks } from "@/animata/card/WebHooks-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Web Hooks",
  component: WebHooks,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WebHooks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    leftBoxElem: "Button Down ",
    rightBoxElem: "Your app",
  },
};
