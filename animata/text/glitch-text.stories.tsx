import type { Meta, StoryObj } from "@storybook/react";

import GlitchText from "@/animata/text/glitch-text";

const meta = {
  title: "Text/Glitch Text",
  component: GlitchText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof GlitchText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "404",
    className: "font-(family-name:--font-mono) text-8xl font-bold tracking-tight text-white",
  },
  render: (args) => (
    <div className="full-content w-full text-center bg-[#030380] px-12 py-16">
      <GlitchText {...args} />
    </div>
  ),
};
