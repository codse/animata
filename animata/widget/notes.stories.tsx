import type { Meta, StoryObj } from "@storybook/react";
import Notes from "@/animata/widget/notes";

const meta = {
  title: "Widget/Notes",
  component: Notes,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutJohn: Story = {
  name: "About John",
  args: {},
};

export const Primary = AboutJohn;
