import { cn } from "@/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: [
      "group-hover:[transform:rotateX(180deg)]",
      "[transform:rotateX(180deg)]",
    ],
    y: [
      "group-hover:[transform:rotateY(180deg)]",
      "[transform:rotateY(180deg)]",
    ],
  };
  const self = rotationClass[rotate];
  return (
    <div className={cn("group size-96", className)} {...props}>
      <div
        className={cn(
          "relative h-full rounded-xl transition-all duration-500 [transform-style:preserve-3d]",
          self[0],
        )}
      >
        <div className="absolute inset-[1px] h-full w-full">
          <img
            src={image}
            alt="image"
            className="h-full w-full rounded-xl object-cover shadow-2xl shadow-black/40"
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-xl bg-black/80 text-center text-slate-200 [backface-visibility:hidden]",
            self[1],
          )}
        >
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg">{subtitle}</p>
            <p className="text-base">{description} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
