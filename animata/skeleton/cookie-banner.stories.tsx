import CookieBanner from "@/animata/skeleton/cookie-banner";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/Cookie Banner",
  component: CookieBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
