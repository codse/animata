import { Meta, StoryObj } from "@storybook/react";
import ShiftTabs from "@/animata/container/shift-tabs";

const meta = {
  title: "Container/Shift Tabs",
  component: ShiftTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShiftTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: ["Issues", "Pull Requests", "Actions", "Projects"],
  },
};
