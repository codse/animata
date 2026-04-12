import type { Meta, StoryObj } from "@storybook/react";
import AlgoliaBlueButton from "@/animata/button/algolia-blue-button";

const meta = {
  title: "Button/Algolia Blue Button",
  component: AlgoliaBlueButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AlgoliaBlueButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
