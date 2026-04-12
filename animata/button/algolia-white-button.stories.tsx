import type { Meta, StoryObj } from "@storybook/react";
import AlgoliaWhiteButton from "@/animata/button/algolia-white-button";

const meta = {
  title: "Button/Algolia White Button",
  component: AlgoliaWhiteButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AlgoliaWhiteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
