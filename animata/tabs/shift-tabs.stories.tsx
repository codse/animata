import type { Meta, StoryObj } from "@storybook/react";

import ShiftTabs from "@/animata/tabs/shift-tabs";

const meta = {
  title: "Tabs/Shift Tabs",
  component: ShiftTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof ShiftTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: null },
  render: () => (
    <ShiftTabs defaultActiveIndex={0}>
      <ShiftTabs.List aria-label="Shift tabs">
        <ShiftTabs.Tab label="Issues">
          <ShiftTabs.Label>Issues</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Pull Requests">
          <ShiftTabs.Label>Pull Requests</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Actions">
          <ShiftTabs.Label>Actions</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Projects">
          <ShiftTabs.Label>Projects</ShiftTabs.Label>
        </ShiftTabs.Tab>
      </ShiftTabs.List>
    </ShiftTabs>
  ),
};
