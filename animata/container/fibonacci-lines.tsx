import { cn } from "@/lib/utils";

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function FibonacciLines({
  reverse,
  className,
  children,
  ...props
}: { reverse?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full", className, {
        "flex-col-reverse": reverse,
        "flex-col": !reverse,
      })}
      {...props}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            opacity: (i + 1) * 0.1,
            marginTop: fibonacci(i) + 2,
          }}
          className="w-full"
        >
          <div className="h-px w-full bg-foreground/10" />
        </div>
      ))}
      {children}
    </div>
  );
}
