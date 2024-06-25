import { AppleIcon, Laptop, Phone, Watch } from "lucide-react";

import DonutChart from "@/animata/graphs/donut-chart";

const items = [
  {
    level: 100,
    icon: AppleIcon,
  },
  {
    level: 40,
    icon: Phone,
  },
  {
    level: 80,
    icon: Laptop,
  },
  {
    level: 20,
    icon: Watch,
  },
];

export default function BatteryLevel() {
  return (
    <div className="grid size-52 grid-cols-2 grid-rows-2 justify-evenly rounded-3xl bg-foreground p-4 text-background">
      {items.map((item, index) => {
        return (
          <DonutChart
            progress={item.level}
            circleWidth={10}
            progressWidth={10}
            size={76}
            className="relative flex items-center justify-center"
            key={`item_${index}`}
            trackClassName="text-green-500/50 text-green-100/30"
          >
            <item.icon className="absolute" size={24} />
          </DonutChart>
        );
      })}
    </div>
  );
}
