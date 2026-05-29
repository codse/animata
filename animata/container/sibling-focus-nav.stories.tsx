import { ArrowRight } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import SiblingFocusNav from "@/animata/container/sibling-focus-nav";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = ["Docs", "Changelog", "GitHub", "Terms", "Privacy"] as const;

/** Warm editorial palette for the blur demo. */
const BLUR_DEMO = {
  teaGreen: "#ccd5ae",
  beige: "#e9edc9",
  cornsilk: "#fefae0",
  papayaWhip: "#faedcd",
  lightBronze: "#d4a373",
  /** Darkened bronze for readable type on cornsilk. */
  link: "#6b4a28",
} as const;

const footerLinkClassName = cn(
  "gap-1.5 text-[12px] font-medium tracking-[0.02em] text-white/92",
  "focus-visible:ring-white/70 focus-visible:ring-offset-0 lg:min-h-0",
);

function FooterGradientFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="full-content flex w-full min-w-[min(100%,36rem)] items-end bg-[linear-gradient(180deg,oklch(0.11_0.038_258),oklch(0.52_0.16_264))] px-8 py-12 sm:px-10"
      style={{ minHeight: "min(42vh, 20rem)" }}
    >
      <div className="w-full max-w-3xl">{children}</div>
    </div>
  );
}

const meta = {
  title: "Container/Sibling Focus Nav",
  component: SiblingFocusNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiblingFocusNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Lucien-style footer row — opacity mode on a dark gradient. */
export const Primary: Story = {
  render: () => (
    <FooterGradientFrame>
      <SiblingFocusNav aria-label="Footer links" className="flex-wrap gap-x-6 gap-y-2">
        {FOOTER_LINKS.map((label) => (
          <SiblingFocusNav.Link key={label} href="#" className={footerLinkClassName}>
            <ArrowRight
              aria-hidden
              weight="light"
              className="relative top-px size-[1em] shrink-0 text-white/55"
            />
            <span className="leading-none">{label}</span>
          </SiblingFocusNav.Link>
        ))}
      </SiblingFocusNav>
    </FooterGradientFrame>
  ),
};

/** Editorial nav — blur mode on a solid cornsilk surface. */
export const Blur: Story = {
  render: () => (
    <div
      className="full-content flex w-full min-w-[min(100%,36rem)] flex-col justify-center px-8 py-12 sm:px-10"
      style={{
        minHeight: "min(42vh, 20rem)",
        backgroundColor: BLUR_DEMO.cornsilk,
      }}
    >
      <SiblingFocusNav
        mode="blur"
        aria-label="Studio navigation"
        className="flex-wrap gap-x-8 gap-y-3 sm:gap-x-10"
      >
        {["Work", "Studio", "Journal", "Contact"].map((label) => (
          <SiblingFocusNav.Link
            key={label}
            href="#"
            className="font-(family-name:--font-display) text-2xl tracking-tight focus-visible:ring-[#d4a373] sm:text-3xl lg:min-h-0"
            style={{ color: BLUR_DEMO.link }}
          >
            {label}
          </SiblingFocusNav.Link>
        ))}
      </SiblingFocusNav>
    </div>
  ),
};
