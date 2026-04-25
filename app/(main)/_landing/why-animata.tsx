"use client";

const cards = [
  {
    title: "Copy & Paste",
    description: "Grab any component in seconds. No npm install, no dependencies to manage.",
  },
  {
    title: "Fully Customizable",
    description: "Built with Tailwind CSS. Every prop, every style is yours to change.",
  },
  {
    title: "Free & Open Source",
    description: "MIT licensed, community-driven. 158+ components and growing.",
  },
];

export default function WhyAnimata() {
  return (
    <section className="bg-[hsl(var(--surface-alt))] py-[100px] max-md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Why Animata
          </p>
          <h2 className="mt-2 text-[clamp(28px,4vw,40px)] font-semibold tracking-tight text-foreground">
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[18px] bg-[hsl(var(--surface-card))] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.10)]"
            >
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[hsl(var(--text-secondary))]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
