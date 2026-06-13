export default function HeroTitle() {
  return (
    <div className="relative z-10">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Free &amp; Open Source
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.75rem)] leading-[1] tracking-[-0.03em] text-foreground">
        Copy. Paste. Ship.
      </h1>
    </div>
  );
}
