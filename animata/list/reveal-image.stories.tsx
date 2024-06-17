import RevealImageListItem from "@/animata/list/reveal-image";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Reveal image",
  component: RevealImageListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RevealImageListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Branding",
    images: [
      {
        src: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGJyYW5kaW5nfGVufDB8fDB8fHww",
        alt: "Image 1",
      },
      {
        src: "https://images.unsplash.com/photo-1567262439850-1d4dc1fefdd0?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJyYW5kaW5nfGVufDB8fDB8fHww",
        alt: "Image 2",
      },
    ],
  },
};
