import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end justify-center bg-yellow-200",
      )}
    />
  );
}
