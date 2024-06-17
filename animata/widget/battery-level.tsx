import DonutChart from "@/animata/graphs/donut-chart";
import { AppleIcon, Laptop, Phone, Watch } from "lucide-react";

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
    <div className="grid min-h-52 min-w-52 grid-cols-2 grid-rows-2 justify-evenly gap-3 rounded-3xl p-3">
      {items.map((item, index) => {
        return (
          <DonutChart
            progress={item.level}
            circleWidth={12}
            progressWidth={12}
            size={120}
            className="relative flex items-center justify-center"
            key={`item_${index}`}
          >
            <item.icon className="absolute" size={24} />
          </DonutChart>
        );
      })}
    </div>
  );
}
