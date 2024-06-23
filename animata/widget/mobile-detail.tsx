import { BatteryMedium, Cpu, Database, Volume1 } from "lucide-react";

interface ProgressBarData {
  label: string;
  value: number;
  max: number;
  icon?: JSX.Element;
}

const progressBarsData: ProgressBarData[] = [
  {
    label: "Battery",
    value: 25,
    max: 100,
    icon: (
      <BatteryMedium
        size={10}
        className="text-zinc-400 transition-colors group-hover:text-zinc-300"
      />
    ),
  },
  {
    label: "Volume",
    value: 50,
    max: 100,
    icon: (
      <Volume1
        size={10}
        className="text-zinc-400 transition-colors group-hover:text-zinc-300"
      />
    ),
  },
  {
    label: "Ram",
    value: 75,
    max: 100,
    icon: (
      <Cpu
        size={10}
        className="text-zinc-400 transition-colors group-hover:text-zinc-300"
      />
    ),
  },
  {
    label: "Storage",
    value: 90,
    max: 100,
    icon: (
      <Database
        size={10}
        className="text-zinc-400 transition-colors group-hover:text-zinc-300"
      />
    ),
  },
];

export default function MobileDetail() {
  return (
    <div className="grid size-52 grid-cols-2 grid-rows-2 gap-4 rounded-3xl bg-zinc-900 p-4">
      {progressBarsData.map((bar) => {
        const percentage = (bar.value / bar.max) * 100;

        return (
          <div
            key={`item-${bar.label}`}
            className="group relative flex flex-col-reverse overflow-hidden rounded-2xl bg-zinc-800"
          >
            <div
              className="w-full bg-stone-700"
              style={{ height: `${percentage}%` }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {bar.icon && (
                <div className="absolute left-2 top-2">{bar.icon}</div>
              )}
              <p className="text-xs font-bold text-zinc-400 transition-colors group-hover:text-zinc-300">
                {bar.label}
              </p>
              <p className="text-[10px] font-bold text-zinc-400 transition-colors group-hover:text-zinc-300">
                {percentage}%
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
