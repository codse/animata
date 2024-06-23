import VpnWidget from "@/animata/widget/vpn-widget";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof VpnWidget> = {
  title: "Widget/Vpn Widget",
  component: VpnWidget,
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
    userName: "Animata",
    latency: "5ms",
    netSpeed: "10",
  },
};

export const VpnWidgetStory: Story = {
  args: {
    userName: "Animata",
    latency: "5ms",
    netSpeed: "15.75",
    className: "",
    defaultConnected: true,
  },
};
