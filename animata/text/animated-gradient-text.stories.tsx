import { ArrowRight, Combine } from "lucide-react";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { Separator } from "@/components/ui/separator";
import { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "Text/Animated Gradient Text",
  component: AnimatedGradientText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedGradientText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Hello, world!",
    className: "text-6xl",
  },
};

export const CustomColors: Story = {
  args: {
    children: (
      <>
        <Combine className="h-4 w-4 text-blue-400" />{" "}
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Custom children & colors</span>
        <ArrowRight className="ml-1 h-4 w-4 text-blue-400" />{" "}
      </>
    ),
    className:
      "text-lg inline-flex cursor-pointer items-center rounded-lg border-2 hover:border-sky-500 border-sky-300 bg-muted px-3 py-1  md:border-4 md:px-6 md:py-2 md:text-2xl font-bold from-blue-300 via-blue-600 to-purple-300",
  },
};
