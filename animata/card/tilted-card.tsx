import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}
export default function TiltCard({ title, className }: TiltCardProps) {
  return (
    <div
      className={cn(
        "hover:scale-300 max-h-fit w-[320px] transform rounded-lg border-2 p-3 text-justify transition-all duration-700 ease-in hover:-rotate-6 hover:bg-indigo-200 hover:shadow-xl hover:hue-rotate-30",
        className,
      )}
    >
      <a className="text-xl">{title}</a>
    </div>
  );
}
