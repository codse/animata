import { Meta, StoryObj } from "@storybook/react";
import VpnConnection from "@/animata/widget/Vpn-Connection";

const meta: Meta<typeof VpnConnection> = {
  title: "Widget/VpnConnection",
  component: VpnConnection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: { control: "text" },
    latency: { control: "text" },
    netSpeed: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    userName: "Drammen",
    latency: "5ms",
    netSpeed: "10",
  },
};

export const VpnConnectionStory: Story = {
  args: {
    userName: "Drammen",
    latency: "5ms",
    netSpeed: "10",
    className: "",
  },
};
