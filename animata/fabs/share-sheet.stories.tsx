import React from "react";

import ShareSheet from "@/animata/fabs/share-sheet";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Fabs/Share Sheet",
  component: ShareSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    platforms: {
      description:
        "Array of platforms available to share through. Each platform should have an image, label, action function, and color.",
      table: {
        type: { summary: "Array of objects" },
      },
    },
  },
} satisfies Meta<typeof ShareSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const platforms = [
  {
    image: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
        alt="Smiley"
        className="h-8 w-8"
      />
    ),
    label: "Smiley Emoji",
    key: "smiley",
    action: () => console.log("Smiley Share clicked"),
  },
  {
    image: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/2164/2164594.png"
        alt="Rocket"
        className="h-8 w-8"
      />
    ),
    label: "Rocket Emoji",
    key: "rocket",
    action: () => console.log("Rocket Share clicked"),
  },
  {
    image: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616490.png"
        alt="Pizza"
        className="h-8 w-8"
      />
    ),
    label: "Pizza Emoji",
    key: "pizza",
    action: () => console.log("Pizza Share clicked"),
  },
  {
    image: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616554.png"
        alt="Heart"
        className="h-8 w-8"
      />
    ),
    label: "Heart Emoji",
    key: "heart",
    action: () => console.log("Heart Share clicked"),
  },
  {
    image: (
      <img
        src="https://cdn-icons-png.flaticon.com/512/616/616576.png"
        alt="Star"
        className="h-8 w-8"
      />
    ),
    label: "Star Emoji",
    key: "star",
    action: () => console.log("Star Share clicked"),
  },
];

export const Primary: Story = {
  args: {
    platforms: platforms,
  },
};
