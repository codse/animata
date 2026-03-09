import type { Meta, StoryFn } from "@storybook/react";
import UnderlineHoverText, {
  type UnderlineHoverTextProps,
} from "@/animata/text/underline-hover-text";

export default {
  title: "text/Underline hover text",
  component: UnderlineHoverText,
  argTypes: {
    text: { control: "text" },
    textColor: { control: "color" },
    hoverTextColor: { control: "color" },
    hoverColor: { control: "color" },
    fontSize: { control: "text" },
    fontWeight: { control: "text" },
    className: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnderlineHoverText>;

const Template: StoryFn<UnderlineHoverTextProps> = (args) => <UnderlineHoverText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Hover over me",
  textColor: "text-yellow-600",
  hoverTextColor: "hover:text-white",
  hoverColor: "hover:after:bg-indigo-500",
  fontSize: "text-2xl",
  fontWeight: "font-medium",
};
