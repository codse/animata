export default function CookieBanner() {
  return (
    <div className="flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted-foreground/25" />
        <div className="h-2 w-3/4 rounded-md bg-muted" />
        <div className="h-2 w-3/5 rounded-md bg-muted" />
      </div>
      <button className="w-full rounded-sm bg-blue-400 p-2">
        <span className="block h-1.5 rounded-sm bg-muted" />
      </button>
    </div>
  );
}
