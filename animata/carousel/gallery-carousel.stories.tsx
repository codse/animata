import { Meta, StoryObj } from "@storybook/react";

import GalleryCarousel from "./gallery-carousel";

const meta = {
  title: "Carousel/Gallery Carousel",
  component: GalleryCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GalleryCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    images: [
      "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
      "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
      "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
      "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg",
    ],
  },
};
