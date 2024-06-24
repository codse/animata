import NavTabs from "@/animata/container/nav-tabs";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Container/Nav Tabs",
  component: NavTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NavTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: ["Profile", "Search", "About Us", "Contact Us", "Settings"],
  },
};
