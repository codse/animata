import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}
export default function TiltCard({ title, className }: TiltCardProps) {
  return (
    <div
      className={cn(
        "max-h-fit transform rounded-full border-2 border-gray-200 bg-gray-200 p-2 px-6 transition-all duration-500 ease-out hover:-rotate-2 hover:scale-110 hover:text-white hover:shadow-xl",
        className,
      )}
    >
      <a className="text-xl">{title}</a>
    </div>
  );
}
