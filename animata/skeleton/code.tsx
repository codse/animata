import { CodeIcon } from "lucide-react";

export default function Code() {
  return (
    <div className="flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      <CodeIcon className="w-6 text-blue-500" />
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted" />
        <div className="h-2 w-3/4 rounded-md bg-muted-foreground/25" />
        <div className="h-2 w-3/5 rounded-md bg-muted" />
      </div>
    </div>
  );
}
