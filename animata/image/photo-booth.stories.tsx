import PhotoBooth from "@/animata/image/photo-booth";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Photo Booth",
  component: PhotoBooth,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PhotoBooth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    collections: [
      "https://images.unsplash.com/photo-1718147155878-e2baab858e74?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1711431780220-949eb0f9c5d4?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1712780649761-6ab2bebf4aa0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1716749231987-63c02babbdfd?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    className: "scale-1.3",
  },
};
