import type { Meta, StoryObj } from "@storybook/react";
import { Package, Sparkles, Zap } from "lucide-react";
import AnnouncementRibbon from "@/animata/container/announcement-ribbon";

const meta = {
  title: "Container/Announcement Ribbon",
  component: AnnouncementRibbon,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    badge: { control: "text" },
    ctaText: { control: "text" },
    repeat: { control: { type: "number", min: 2, max: 8 } },
    pauseOnHover: { control: "boolean" },
  },
} satisfies Meta<typeof AnnouncementRibbon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    pauseOnHover: true,
  },
};

export const NoControls: Story = {
  args: {
    badge: null,
    ctaText: null,
    pauseOnHover: true,
  },
};

export const CustomMessage: Story = {
  args: {
    badge: "V2",
    ctaText: "Read the docs",
    message: (
      <span className="flex items-center gap-2 whitespace-nowrap">
        <Zap className="h-3 w-3 shrink-0 text-black/75" aria-hidden />
        <span className="text-black/75">
          Animata <strong className="font-medium">2.0</strong> is here — faster animations, smaller
          bundles, zero config
        </span>
      </span>
    ),
    pauseOnHover: true,
  },
};
