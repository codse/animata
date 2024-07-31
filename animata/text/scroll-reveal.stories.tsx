import { Baby, File } from "lucide-react";

import ScrollReveal from "@/animata/text/scroll-reveal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Scroll Reveal",
  component: ScrollReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "md:text-2xl",
    children: (
      <>
        This component reveals its children{" "}
        <Baby className="scroll-baby size-5 transition-all duration-75 ease-in-out md:size-8" /> as
        you scroll down the page{" "}
        <File className="scroll-file size-5 transition-all duration-75 ease-in-out md:size-8" />
        .
        <div className="my-4 w-full" />
        It uses a sticky container with a fixed height and a large space at the bottom. Finally, it
        calculates the scroll position and applies an opacity effect to each child based on its
        position.
        <div className="mt-4 w-full">Node with children.</div>
      </>
    ),
  },
};

export const TextOnly: Story = {
  args: {
    className: "md:text-3xl text-blue-200 dark:text-blue-800",
    children:
      "It uses a sticky container with a fixed height and a large space at the bottom. Finally, it calculates the scroll position and applies an opacity effect to each child based on its position.",
  },
};
