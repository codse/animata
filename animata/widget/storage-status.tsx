import { cn } from "@/lib/utils";

interface SectionItem {
  label: string;
  value: number;
  color: string;
  stretch?: boolean;
}

function Section({ label, value, color, total, stretch }: SectionItem & { total: number }) {
  return (
    <div
      className={cn("relative w-full rounded-md transition-all", color, {
        "flex-1 text-gray-500": stretch,
      })}
      style={{ height: `${(value / total) * 100}%` }}
    >
      <div
        className={cn(
          "absolute left-full top-1/2 size-4 -translate-y-1/2 translate-x-1 rotate-45",
          color,
        )}
      ></div>
      <div
        className={cn(
          "absolute left-full top-1/2 flex w-20 -translate-y-1/2 translate-x-3 justify-center rounded-md",
          color,
        )}
      >
        <div className="relative px-3 py-2 font-bold">{value} GB</div>
      </div>
      <div className="flex h-full w-full items-center justify-center text-lg font-bold">
        {label}
      </div>
    </div>
  );
}

const total = 512;

const items = [
  {
    stretch: true,
    label: "Free",
    value: 0,
    color: "bg-gray-300",
  },
  {
    label: "System",
    value: 50,
    color: "bg-slate-500",
  },
  {
    label: "Audio",
    value: 80,
    color: "bg-purple-500",
  },
  {
    label: "Video",
    value: 150,
    color: "bg-orange-500",
  },
];

// Calculate free space
items[0].value = Math.max(0, total - items.slice(1).reduce((acc, item) => acc + item.value, 0));

export default function StorageStatus() {
  return (
    <div className="group flex h-96 w-32 flex-col gap-1 rounded-md bg-black p-1 text-white">
      {items.map((item, index) => (
        <Section key={index} {...item} total={total} />
      ))}
    </div>
  );
}
