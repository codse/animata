import CommitGraph from "@/animata/graphs/commit-graph";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Graphs/Commit Graph",
  component: CommitGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CommitGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
