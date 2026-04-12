import type { Meta, StoryObj } from "@storybook/react";
import GithubCardShiny from "@/animata/card/github-card-shiny";

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
