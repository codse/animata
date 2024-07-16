import { cn } from "@/lib/utils";

function Checkbox({ title, checked }: { title: string; checked?: boolean }) {
  return (
    <div className="flex items-center">
      <div
        className={cn("rounded-md border-2 border-gray-300 text-white", {
          "border-black bg-black": checked,
        })}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill={checked ? "currentColor" : "none"}
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ms-2 text-sm text-gray-900">{title}</div>
    </div>
  );
}

const list = [
  {
    title: "Milk",
  },
  {
    title: "Eggs",
    checked: true,
  },
  {
    title: "Ground Pepper",
    checked: true,
  },
  {
    title: "Spaghetti",
  },
  {
    title: "Butter",
  },
];

export default function ShoppingList({
  data = list,
  title,
}: {
  title?: string;
  data?: {
    title: string;
    checked?: boolean;
  }[];
}) {
  return (
    <div className="h-64 w-48 rounded-3xl border bg-white p-4 font-sans shadow-sm">
      <div className="text-lg font-bold tracking-wide text-zinc-950">
        {title || "Shopping list"}
      </div>
      <div className="mt-4 flex flex-col gap-4 text-sm">
        {data.map((item, index) => (
          <Checkbox key={index} title={item.title} checked={item.checked} />
        ))}
      </div>
    </div>
  );
}
