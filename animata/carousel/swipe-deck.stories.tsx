import type { Meta, StoryObj } from "@storybook/react";

import SwipeDeck from "@/animata/carousel/swipe-deck";

const meta = {
  title: "Carousel/Swipe Deck",
  component: SwipeDeck,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SwipeDeck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "w-full min-w-72 storybook-fix",
    items: [
      {
        id: "onboarding",
        badge: "Onboarding",
        title: "Welcome flow that keeps people moving",
        description:
          "Deliver setup tips and key actions in a swipe deck that feels natural on both touch and mouse.",
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "featured-post",
        badge: "Featured",
        title: "Highlight posts with high visual impact",
        description:
          "Snap cards into focus while users browse stories, updates, and curated editor picks.",
        image:
          "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "product-highlight",
        badge: "Product",
        title: "Showcase product benefits in sequence",
        description:
          "Each swipe reveals the next value prop with smooth indicator and arrow navigation.",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "recommendations",
        badge: "For You",
        title: "Personal recommendations, one card at a time",
        description:
          "Use gesture-friendly cards for picks based on activity, preferences, and intent.",
        image:
          "https://images.unsplash.com/photo-1551281044-8b4a2f5f6f2d?q=80&w=1400&auto=format&fit=crop",
      },
    ],
  },
};
