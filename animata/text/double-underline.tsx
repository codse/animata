import { cn } from "@/lib/utils";

export default function DoubleUnderline({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLSpanElement>) {
  const common =
    "absolute h-px w-full bg-blue-500 transition duration-200 group-hover/underline:opacity-50 dark:bg-white/70";
  return (
    <span
      {...props}
      className={cn(
        "group/underline relative inline-block cursor-pointer text-blue-500",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          common,
          "pointer-events-none left-0 top-[calc(100%_-_2px)] group-hover/underline:top-0",
        )}
      />
      <span className={cn(common, "-bottom-[2px] left-0")} />
    </span>
  );
}
