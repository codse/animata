import React from "react";
import SocialMediaIconList, { SocialMediaIconListProps } from "@/animata/list/social-media-icon-list";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SocialMediaIconList> = {
  title: "List/Social Media Icon List",
  component: SocialMediaIconList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "number",
        defaultValue: 24,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = (args: SocialMediaIconListProps) => <SocialMediaIconList {...args} />;
Primary.args = {};
