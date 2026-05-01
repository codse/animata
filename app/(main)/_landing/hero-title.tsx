export default function HeroTitle() {
  return (
    <div className="relative z-10">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Fresh visual update
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.75rem)] leading-[1] tracking-[-0.03em] text-foreground">
        Copy. Paste. <span className="text-[hsl(var(--accent))]">Launch.</span>
      </h1>
      <div className="mt-4 inline-flex rounded-full border border-border bg-foreground/5 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
        Now with a brighter hero
      </div>
    </div>
  );
}
