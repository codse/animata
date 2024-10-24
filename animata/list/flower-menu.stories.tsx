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

import FlowerMenu from "@/animata/list/flower-menu";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Flower Menu",
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
      { icon: Github, href: "https://github.com/" },
      { icon: Twitter, href: "https://twitter.com/" },
      { icon: Instagram, href: "https://instagram.com/" },
      { icon: Linkedin, href: "https://www.linkedin.com/" },
      { icon: Youtube, href: "https://www.youtube.com/" },
      { icon: Twitch, href: "https://www.twitch.tv/" },
      { icon: Facebook, href: "https://www.facebook.com/" },
      { icon: Codepen, href: "https://www.codepen.io/" },
    ],
    iconColor: "#ffffff",
    backgroundColor: "rgba(0, 0, 0)",
    animationDuration: 700,
    togglerSize: 40,
  },
};
