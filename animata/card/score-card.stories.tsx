import Scorecard from "@/animata/card/score-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Score Card",
  component: Scorecard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Scorecard>;

export default meta;
type Story = StoryObj<typeof meta>;

const homeTeam = {
  name: "Brentford",
  logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg",
};

const awayTeam = {
  name: "Man. City",
  logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
};
export const Primary: Story = {
  args: {
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homeScore: 1,
    awayScore: 2,
    matchTime: "2nd Half - 70'",
    scorer: "Foden",
  },
};
