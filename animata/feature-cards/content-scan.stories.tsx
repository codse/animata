import ContentScan from "@/animata/feature-cards/content-scan";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feature Cards/Content Scan",
  component: ContentScan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ContentScan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content:
      "Ten years ago there were only five private prisons in the country, with a population of 2,000 inmates; now, 30 there are 100, with 62,000 inmates. It is expected that by the coming decade, the number will hit 360,000 according to reports. The private contracting of prisoners for work fosters.",
    highlightWords: [
      "Ten years ago",
      "only five private prisons",
      "now, 30",
      "62,000",
      "are 100",
      "62\\,000 inmates",
      "expected",
      "coming decade",
    ],
    scanDuration: 4,
    reverseDuration: 1,
  },
};
