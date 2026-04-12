const steps = [
  {
    number: "1",
    title: "Browse",
    description: "Pick any component from 194+ options",
  },
  {
    number: "2",
    title: "Copy",
    description: "One click copies the code. No npm install.",
  },
  {
    number: "3",
    title: "Ship",
    description: "Paste into your project. It just works.",
  },
];

export default function WoundAndPromise() {
  return (
    <section className="py-[100px] max-md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left — heading */}
          <div className="lg:max-w-[280px] lg:pt-2">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.75rem)] leading-[1] tracking-[-0.02em] text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-[15px] leading-[1.5] text-[hsl(var(--text-secondary))]">
              No packages. No config. No breaking changes.
            </p>
          </div>

          {/* Right — numbered steps, no cards */}
          <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex-1">
                <span className="text-[13px] font-bold text-[hsl(var(--accent))]">
                  0{step.number}
                </span>
                <h3 className="mt-1 text-[17px] font-bold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[hsl(var(--text-secondary))]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
