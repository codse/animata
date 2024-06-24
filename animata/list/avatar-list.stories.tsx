import AvatarList from "@/animata/list/avatar-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Avatar List",
  component: AvatarList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AvatarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
