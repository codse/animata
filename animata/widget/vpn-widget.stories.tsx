import type { Meta, StoryObj } from "@storybook/react";
import VpnConnection from "@/animata/widget/vpn-widget";

const meta = {
  title: "Widget/VPN Connection",
  component: VpnConnection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof VpnConnection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  name: "Connected",
  args: {
    serverName: "Tokyo",
    latency: "48 ms",
    downloadMbps: "112.3",
    defaultConnected: true,
  },
};

export const Disconnected: Story = {
  name: "Disconnected",
  args: {
    serverName: "Frankfurt",
    latency: "—",
    downloadMbps: "0",
    defaultConnected: false,
  },
};
