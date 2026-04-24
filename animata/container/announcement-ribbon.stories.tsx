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
        <Zap className="h-3 w-3 shrink-0 text-sky-400" aria-hidden />
        <span className="text-white/75">
          Animata <strong className="font-semibold text-sky-300">2.0</strong> is here — faster
          animations, smaller bundles, zero config
        </span>
      </span>
    ),
    pauseOnHover: true,
  },
};

export const RegistryRelease: Story = {
  name: "Registry Release (Full Page Preview)",
  args: {},
  render: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementRibbon />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-100/60 px-3 py-1 dark:border-amber-700/30 dark:bg-amber-950/30">
          <Package className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
            shadcn registry
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Beautiful UI components
          <br />
          <span className="text-muted-foreground">ready to install</span>
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Copy, paste, and own every component — no black boxes, no abstractions you can't control.
        </p>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-4 py-2 font-mono text-sm text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          npx shadcn add
        </div>
      </div>
    </div>
  ),
};
