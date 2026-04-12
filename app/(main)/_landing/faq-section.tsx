import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Every component is MIT licensed. Use them in personal projects, client work, SaaS products — whatever you're building. No catch.",
  },
  {
    question: "Do I need to install a package?",
    answer:
      "No. You copy the component code directly into your project. No npm install, no dependency to maintain, no version conflicts down the road.",
  },
  {
    question: "Does it work with my stack?",
    answer:
      "If you're using React, yes. Next.js, Remix, Vite, Astro, Gatsby — anywhere React runs. Components use Tailwind CSS and Framer Motion, which you likely already have.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "You own the code. Change colors, timing, sizes, behavior — it's just React and Tailwind in your project. No abstractions to fight.",
  },
  {
    question: "How do I get started?",
    answer: (
      <span>
        Browse the{" "}
        <Link className="text-[hsl(var(--link))] hover:text-[hsl(var(--link-hover))]" href="/docs">
          component library
        </Link>
        , find one you like, and copy the code. Takes about 30 seconds.
      </span>
    ),
  },
];

function FaqItem({ index }: { index: number }) {
  const item = faq[index];
  return (
    <AccordionItem value={`question-${index}`} className="w-full px-4 md:px-0">
      <AccordionTrigger className="w-full">
        <span className="inline-block text-sm font-medium md:text-base">{item.question}</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="text-[hsl(var(--text-secondary))]">{item.answer}</div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function FAQSection() {
  return (
    <section className="border-t border-border bg-background py-20 sm:py-24 lg:py-32 max-md:py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-6">
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,5vw,40px)] leading-[1] text-foreground">
            Questions?
            <br />
            <span className="text-muted-foreground">We&apos;ve got answers.</span>
          </h2>
        </div>
        <Accordion collapsible type="single" className="relative">
          {faq.map((_, index) => {
            return <FaqItem key={`item-${index}`} index={index} />;
          })}
        </Accordion>
      </div>
    </section>
  );
}
