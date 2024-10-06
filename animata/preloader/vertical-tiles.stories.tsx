import React from "react";

import VerticalTiles from "@/animata/preloader/vertical-tiles";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Vertical Tiles",
  component: VerticalTiles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tileClassName: { control: "text" },
    minTileWidth: { control: { type: "number", min: 20, max: 200, step: 1 } },
    animationDuration: { control: { type: "number", min: 0.1, max: 5, step: 0.1 } },
    animationDelay: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    stagger: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
  },
} satisfies Meta<typeof VerticalTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tileClassName: "bg-gradient-to-r from-zinc-100 to-zinc-300",
    minTileWidth: 32,
    animationDuration: 0.5,
    animationDelay: 1,
    stagger: 0.05,
    children: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-800 p-24">
        <p className="text-2xl font-extrabold text-white">Welcome to our amazing website!</p>
      </div>
    ),
  },
};

export const Narrow: Story = {
  args: {
    tileClassName: "bg-gradient-to-r from-zinc-100 to-zinc-300",
    minTileWidth: 16,
    animationDuration: 0.5,
    animationDelay: 1,
    stagger: 0.05,
    children: (
      <div className="flex h-96 w-28 items-center justify-center bg-zinc-800 p-24">
        <p className="text-center text-2xl font-extrabold text-white">
          Welcome to our amazing website!
        </p>
      </div>
    ),
  },
};
