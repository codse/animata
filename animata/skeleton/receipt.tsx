import { Building, DollarSign } from "lucide-react";

export default function Receipt() {
  return (
    <div className="flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      <div className="flex justify-between border-b pb-3 dark:border-zinc-700">
        <Building className="w-6 text-muted-foreground" />
        <DollarSign className="w-6 text-blue-600" />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted" />
        <div className="h-2 w-4 rounded-md bg-muted" />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="h-2 w-3/4 rounded-md bg-muted" />
        <div className="h-2 w-5 rounded-md bg-muted" />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted" />
        <div className="h-2 w-4 rounded-md bg-muted" />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="h-2 w-3/4 rounded-md bg-muted" />
        <div className="h-2 w-5 rounded-md bg-muted" />
      </div>

      <div className="flex w-full justify-between gap-2">
        <div className="h-2 w-3/5 rounded-md bg-muted" />
        <div className="h-2 w-8 rounded-md bg-muted" />
      </div>

      <span className="mt-auto inline-block w-fit rounded-md bg-blue-600 px-2 py-1 text-center text-xs font-semibold text-white">
        Receipt
      </span>
    </div>
  );
}
