import { cn } from "@/lib/utils";

interface ButtonProps {
  item: string;
  index?: number;
}
const Button = ({ item, index }: ButtonProps) => {
  return (
    <div
      className={cn("rounded-lg bg-black", {
        "border-b-2 border-b-indigo-500": index === 0,
      })}
    >
      <div
        className={cn(
          "flex h-10 cursor-pointer items-center justify-center rounded-md border-2 bg-white p-3 transition-all",
          {
            "border-2 border-indigo-500 text-indigo-600": index === 0,
            "origin-top-left ease-in hover:-rotate-6": index !== 0,
          },
        )}
      >
        <p className="p-2 text-center font-mono">{item}</p>
      </div>
    </div>
  );
};

export default function ShiftTabs({ items }: { items: string[] }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {items.map((item, index) => (
        <Button item={item} index={index} />
      ))}
    </div>
  );
}
