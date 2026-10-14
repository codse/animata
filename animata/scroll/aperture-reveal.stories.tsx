import type { Meta, StoryObj } from "@storybook/react";

import ApertureReveal from "./aperture-reveal";

type SceneProps = {
  lead: string;
  trail: string;
  src: string;
  alt: string;
  text: string;
  action?: { label: string; href: string };
  hint?: string;
  viewportHeight?: number;
  length?: number;
};

const ridge: SceneProps = {
  lead: "Leave early,",
  trail: "arrive at first light",
  src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80",
  alt: "Snow-capped mountains above a forested valley and a braided river",
  text: "The ridge trail opens two hours before sunrise. Start with a guide, reach the lookout as the valley fills with light, and be back down before the heat.",
  action: { label: "Plan the climb", href: "#plan" },
  hint: "Scroll",
  viewportHeight: 640,
};

function Scene({ lead, trail, src, alt, text, action, hint, viewportHeight, length }: SceneProps) {
  return (
    <ApertureReveal viewportHeight={viewportHeight} length={length}>
      <ApertureReveal.Media>
        <img src={src} alt={alt} decoding="async" />
      </ApertureReveal.Media>
      <ApertureReveal.Headline>
        <ApertureReveal.Lead>{lead}</ApertureReveal.Lead>
        <ApertureReveal.Opening />
        <ApertureReveal.Trail>{trail}</ApertureReveal.Trail>
      </ApertureReveal.Headline>
      <ApertureReveal.Caption>
        <ApertureReveal.Text>{text}</ApertureReveal.Text>
        {action ? (
          <ApertureReveal.Action>
            <a href={action.href}>{action.label}</a>
          </ApertureReveal.Action>
        ) : null}
      </ApertureReveal.Caption>
      {hint ? <ApertureReveal.Hint>{hint}</ApertureReveal.Hint> : null}
    </ApertureReveal>
  );
}

const meta = {
  title: "Scroll/Aperture Reveal",
  component: Scene,
  parameters: { layout: "centered" },
  args: ridge,
  decorators: [
    (Story) => (
      <div style={{ width: "min(1040px, calc(100vw - 32px))" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Scene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Interior: Story = {
  args: {
    lead: "Rooms that",
    trail: "keep the afternoon",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80",
    alt: "Living room with a grey sofa, a brass arc lamp, and a long window below the ceiling",
    text: "We plan around where the sun falls at four o'clock. Walls, windows, and furniture follow the light, not the other way round.",
    action: { label: "See the studio", href: "#studio" },
  },
};

export const LongContent: Story = {
  args: {
    lead: "Every season of the guiding calendar",
    trail: "starts with one early morning on the ridge",
    text: "The ridge trail opens two hours before sunrise from April through October. Start with a guide who has walked it hundreds of times, reach the lookout as the valley fills with light, stop for breakfast at the hut, and be back at the trailhead before the afternoon heat sets in. Groups stay small, and every route has a shorter alternative if the weather turns.",
  },
};

export const NoAction: Story = {
  args: { action: undefined, hint: undefined },
};
