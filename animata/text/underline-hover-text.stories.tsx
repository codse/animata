import UnderlineHoverText, { UnderlineHoverTextProps } from "@/animata/text/underline-hover-text";
import { Meta, StoryFn } from "@storybook/react";

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

export const Default = Template.bind({});
Default.args = {
  text: "Hover over me",
};
