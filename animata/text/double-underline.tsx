import { cn } from "@/lib/utils";

export default function DoubleUnderline({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "group/underline relative inline-block cursor-pointer",
        "font-medium tracking-tight text-zinc-900 dark:text-zinc-100",
        "transition-[letter-spacing,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:tracking-[-0.01em]",
        className,
      )}
    >
      {children}
      {/* Bottom stroke — soft gradient, always present, fades a touch on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-[3px] left-0 h-px w-full",
          "bg-gradient-to-r from-transparent via-current/70 to-transparent",
          "transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/underline:opacity-50",
        )}
      />
      {/* Top stroke — lifts from below to above the glyph on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 h-px w-full",
          "bg-gradient-to-r from-transparent via-current to-transparent",
          "top-[calc(100%-3px)] opacity-0",
          "transition-[top,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/underline:-top-px group-hover/underline:opacity-100",
        )}
      />
    </span>
  );
}
