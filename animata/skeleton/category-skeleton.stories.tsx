import type { Meta, StoryObj } from "@storybook/react";

import CategorySkeleton from "@/animata/skeleton/category-skeleton";

const meta = {
  title: "Skeleton/Category Skeleton",
  component: CategorySkeleton,
  parameters: { layout: "centered", backgrounds: { default: "dark" } },
  tags: ["autodocs"],
} satisfies Meta<typeof CategorySkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text", className: "w-80" },
};

export const Background: Story = {
  args: { variant: "background", className: "w-80" },
};

export const Widget: Story = {
  args: { variant: "widget", className: "w-80" },
};

export const Carousel: Story = {
  args: { variant: "carousel", className: "w-80" },
};
