import ChecklistCompletion from "@/animata/progress/checklist-completion";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Progress/Checklist Completion",
  component: ChecklistCompletion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ChecklistCompletion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
