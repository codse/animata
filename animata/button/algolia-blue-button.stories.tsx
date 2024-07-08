import AlgoliaBlueButton from "@/animata/button/algolia-blue-button";
import { Meta, StoryObj } from "@storybook/react";

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
