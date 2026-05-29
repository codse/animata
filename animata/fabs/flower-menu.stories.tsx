import type { Meta, StoryObj } from "@storybook/react";
import {
  Codepen,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitch,
  Twitter,
  Youtube,
} from "lucide-react";
import FlowerMenu from "@/animata/fabs/flower-menu";

const meta = {
  title: "Fabs/Flower Menu",
  component: FlowerMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FlowerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    menuItems: [
      { icon: Github, href: "https://github.com/", label: "GitHub" },
      { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
      { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
      { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
      { icon: Youtube, href: "https://www.youtube.com/", label: "YouTube" },
      { icon: Twitch, href: "https://www.twitch.tv/", label: "Twitch" },
      { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
      { icon: Codepen, href: "https://www.codepen.io/", label: "Codepen" },
    ],
    iconColor: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    animationDuration: 220,
    togglerSize: 44,
    triggerLabel: "Social links",
  },
};
