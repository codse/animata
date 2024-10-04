import SurveyCard from "@/animata/card/survey-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Survey Card",
  component: SurveyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SurveyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        vote: 50,
        itemName: "Charmander",
      },
      {
        vote: 60,
        itemName: "Pikachu",
      },
      {
        vote: 20,
        itemName: "Squirtle",
      },
    ],
    width: 250, // Fixed width
    surveyTitle: "Pokemon Survey ?",
  },
  render: (args) => {
    return (
      <>
        <strong className="my-2 p-3 text-3xl text-blue-500">Survey Card</strong>
        <div className="group rounded-xl border bg-white p-9 shadow-2xl">
          {/* Adjust width to be fixed and control growth by width */}
          <div className="border-bottom relative box-border h-auto w-full overflow-visible">
            <SurveyCard {...args} />
          </div>
        </div>
      </>
    );
  },
};
