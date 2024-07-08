export default function WideCard() {
  return (
    <div className="flex h-fit w-64 gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      <img
        src="https://images.unsplash.com/photo-1634893661513-d6d1f579fc63?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="placeholder"
        className="h-12 w-12 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted-foreground/25" />
        <div className="h-2 w-3/4 rounded-md bg-muted" />
        <div className="h-2 w-3/5 rounded-md bg-muted" />
      </div>
      <div className="w-fit flex-shrink-0">
        <button className="w-8 rounded-sm bg-green-500 p-2">
          <span className="block h-1.5 rounded-sm bg-muted" />
        </button>
      </div>
    </div>
  );
}
