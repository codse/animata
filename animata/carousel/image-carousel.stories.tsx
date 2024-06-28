import ImageCarousel from "@/animata/carousel/image-carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Image Carousel",
  component: ImageCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        id: 1,
        title: "Item 1",
        image:
          "https://plus.unsplash.com/premium_photo-1718204436526-277f9f34607c?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        title: "Item 2",
        image:
          "https://images.unsplash.com/photo-1718717722247-26f4c6c09192?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
      },
      {
        id: 3,
        title: "Item 3",
        image:
          "https://plus.unsplash.com/premium_photo-1718570262641-54c3ea3142e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        title: "Item 4",
        image:
          "https://images.unsplash.com/photo-1718524767488-10ee93e05e9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        title: "Item 4",
        image:
          "https://images.unsplash.com/photo-1718524767488-10ee93e05e9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
};
