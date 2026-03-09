import type { Meta, StoryObj } from "@storybook/react";
import AvatarList from "@/animata/list/avatar-list";

const meta = {
  title: "List/Avatar List",
  component: AvatarList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof AvatarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
  },
};
