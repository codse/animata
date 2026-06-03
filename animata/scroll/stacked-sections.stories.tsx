import type { Meta, StoryObj } from "@storybook/react";
import { Inter, Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";

import StackedSections from "./stacked-sections";

/** PickFont — Tech + Minimal (Space Grotesk + Inter): https://pickfont.com */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const STACK_OFFSET = 48;

const PAD_X = "px-6 sm:px-7";
const PAD_Y = "py-6 sm:py-7";
const typeDisplay = "font-(family-name:--font-display) font-semibold tracking-[-0.04em]";
const typeCopy = "font-(family-name:--font-sans) font-medium tracking-[-0.01em]";
const typeBody = "font-(family-name:--font-sans) font-normal tracking-normal";

const paneLight = "bg-[#f4f0e8] text-[#1a1a1a]";
const paneDark = "bg-[#1a1a1a] text-[#f4f0e8]";

const meta = {
  title: "Scroll/Stacked Sections",
  component: StackedSections,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    withDramaEffect: true,
    stackOffset: STACK_OFFSET,
    scrollRunway: "min(75vh, 32rem)",
  },
} satisfies Meta<typeof StackedSections>;

export default meta;
type Story = StoryObj<typeof meta>;

function Pane({ label, title, tone }: { label: string; title: string; tone: "light" | "dark" }) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl ring-1 ring-black/8",
        tone === "light" ? paneLight : paneDark,
      )}
    >
      <div
        style={{ height: STACK_OFFSET }}
        className={cn(
          "flex items-center border-b border-current/12 text-[11px] uppercase tracking-[0.22em] opacity-70",
          PAD_X,
          typeCopy,
        )}
      >
        {label}
      </div>
      <div className={cn("flex flex-col gap-2", PAD_X, PAD_Y)}>
        <h2 className={cn(typeDisplay, "text-2xl tracking-[-0.02em] sm:text-3xl")}>{title}</h2>
        <p className={cn("max-w-xs text-sm leading-[1.6] opacity-75", typeBody)}>
          Pins here, then the next pane stacks on top.
        </p>
      </div>
    </section>
  );
}

export const Primary: Story = {
  render: (args) => (
    <div
      className={cn(
        display.variable,
        display.className,
        sans.variable,
        sans.className,
        "w-full full-content overflow-y-auto bg-[#e8e4dc] text-[#1a1a1a]",
      )}
      style={{ height: "min(720px, 100svh)" }}
    >
      <p
        className={cn(
          "py-6 text-center text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/50",
          typeCopy,
        )}
      >
        Scroll
      </p>
      <div className="mx-auto w-full max-w-md px-4">
        <StackedSections {...args}>
          <Pane label="01" title="First" tone="light" />
          <Pane label="02" title="Second" tone="dark" />
          <Pane label="03" title="Third" tone="light" />
          <Pane label="04" title="Fourth" tone="dark" />
        </StackedSections>
      </div>
      <p
        className={cn(
          "py-6 text-center text-[11px] uppercase tracking-[0.22em] text-[#1a1a1a]/50",
          typeCopy,
        )}
      >
        End
      </p>
    </div>
  ),
};
