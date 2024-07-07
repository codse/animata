import GithubCardShiny from "@/animata/card/github-card-shiny";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Github Card Shiny",
  component: GithubCardShiny,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GithubCardShiny>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
