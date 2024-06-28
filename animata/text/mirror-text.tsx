import { cn } from "@/lib/utils";

export default function MirrorText({
  text = "This is a text",
  className,
}: {
  text: string;
  className?: string;
}) {
  const animation = "group-hover:-translate-y-4 ease-slow transition-all duration-500";
  const content = (
    <div className={cn("inline-block text-4xl font-light uppercase leading-none", className)}>
      {text}
    </div>
  );

  return (
    <div className="group relative w-full justify-end overflow-hidden p-6 text-foreground">
      <div className={cn("h-[10px] overflow-hidden delay-200", animation)}>{content}</div>
      <div className={cn("h-[10px] overflow-hidden delay-100", animation)}>{content}</div>
      <div className={cn("h-[10px] overflow-hidden delay-75", animation)}>{content}</div>
      <div className={animation}>{content}</div>
    </div>
  );
}
