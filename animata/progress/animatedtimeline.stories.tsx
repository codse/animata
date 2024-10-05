import Animatedtimeline, { TimelineEvent } from "@/animata/progress/animatedtimeline";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Progress/Animatedtimeline",
  component: Animatedtimeline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Animatedtimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const events = [
  {
    id: "1",
    title: "Event 1",
    description: "This is the first event",
    date: "2021-01-01",
  },
  {
    id: "2",
    title: "Event 2",
    description: "This is the second event",
    date: "2021-02-01",
  },
  {
    id: "3",
    title: "Event 3",
    description: "This is the third event",
    date: "2021-03-01",
  },
];

const customEventRender = (event: TimelineEvent) => (
  <div>
    <h3 className="text-lg font-semibold">{event.title}</h3>
    <p>{event.description}</p>
    <span className="text-sm">{event.date}</span>
  </div>
);

const onEventClick = () => null;

export const Primary: Story = {
  args: {
    events: events,
    title: "Timeline",
    containerClassName: "",
    timelineStyles: {
      lineColor: "#d1d5db",
      activeLineColor: "#22c55e",
      dotColor: "#d1d5db",
      activeDotColor: "#22c55e",
      dotSize: "1.5rem",
      titleColor: "inherit",
      descriptionColor: "inherit",
      dateColor: "inherit",
    },
    customEventRender: customEventRender,
    onEventHover: () => null,
    onEventClick: onEventClick,
    initialActiveIndex: -1,
  },
};
