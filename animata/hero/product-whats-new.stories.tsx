import ProductWhatsNew from "@/animata/hero/product-whats-new";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Product Whats New", // Changed to avoid special characters
  component: ProductWhatsNew,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProductWhatsNew>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "card1",
    title: "Liongron Bay",
    description: "The darkness of the falcons heart that rendered the princes at bay.",
    image:
      "https://assets.lummi.ai/assets/Qma1aBRXFsApFohRJrpJczE5QXGY6HhHKz24ybuw1khbou?auto=format&w=400",
    link: "http://www.animata.com",
    type: "SimpleCard",
    customStyle: "bg-slate-300", // Used in className property
    collection: [
      {
        title: "A Twisted Tails - The enchanted forests of Argentina.",
        image:
          "https://assets.lummi.ai/assets/QmSxHGeLuiXMzUSFM9hhVJToRXVeQCBEtno96zgAXB3uVN?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
      {
        title: "Rocky Road - Stories on the road in the south.",
        image:
          "https://assets.lummi.ai/assets/QmXm6HVi3wwGy3jaCmECfoL8AULPerjQQh6abKTVhFMewK?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
      {
        title: "Duango Ridley - Presence of an interior essence of calm.",
        image:
          "https://assets.lummi.ai/assets/QmbMZFEfk2qwQkkmXYncpvHapkNQF5HuTrcascJC7edpfW?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
    ],
  },
};
