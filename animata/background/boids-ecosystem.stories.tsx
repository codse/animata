import type { Meta, StoryObj } from "@storybook/react";
import BoidsEcosystem from "@/animata/background/boids-ecosystem";

const meta = {
  title: "Background/Boids Ecosystem",
  component: BoidsEcosystem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "number", min: 20, max: 400, step: 10 } },
    cursorRadius: { control: { type: "number", min: 20, max: 260, step: 10 } },
    background: { control: { type: "color" } },
  },
} satisfies Meta<typeof BoidsEcosystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    count: 140,
    cursorRadius: 110,
    background: "#0b0b12",
    palette: ["#f5f5f4", "#fde68a", "#93c5fd", "#fca5a5"],
  },
  render: (args) => (
    <div className="w-full h-96 full-content">
      <BoidsEcosystem {...args}>
        <h3 className="text-center pointer-events-none text-xl font-semibold tracking-tight text-white/90">
          Move your cursor — watch the flock part.
        </h3>
      </BoidsEcosystem>
    </div>
  ),
};
