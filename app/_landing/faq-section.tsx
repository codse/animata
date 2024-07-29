import Link from "next/link";
import { useTheme } from "next-themes";

import BoldCopy from "@/animata/text/bold-copy";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Highlight from "./highlight";

const faq = [
  {
    question: "What is Animata?",
    answer:
      "Animata is a curated collection of hand-crafted animations, effects, and interactions that you can seamlessly integrate into your project with a simple copy and paste.",
  },
  {
    question: "Who is this for?",
    answer:
      "Animata is designed for developers of all skill levels, from beginners to professionals, who want to enhance their websites with animations without spending extensive time on development.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Animata is completely free and open-source. You can use it in both personal and commercial projects.",
  },
  {
    question: "Why should I care?",
    answer: (
      <span>
        Small animations can significantly enhance the user experience by making websites more
        engaging and enjoyable. Animata offers a diverse collection of{" "}
        <Highlight>animations</Highlight>, <Highlight>effects</Highlight>, and{" "}
        <Highlight>interactions</Highlight> to elevate your projects effortlessly.
      </span>
    ),
  },
  {
    question: "I can make these myself. Why should I use this?",
    answer:
      "While you certainly can create animations yourself, using Animata saves you time and effort. Plus, you can learn from our implementations and even contribute to improving them.",
  },
  {
    question: "Sounds amazing, how do I use it?",
    answer: (
      <span>
        Simply copy the code snippets provided on the Animata website and paste them into your
        project. It&apos;s that easy! Check out the{" "}
        <Link className="text-blue-500 hover:text-blue-700" href="/docs">
          documentation
        </Link>{" "}
        for more details.
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
        <div className="text-gray-900 dark:text-slate-50">{item.answer}</div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function FAQSection() {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#ffffff12" : "#444cf710";
  return (
    <div
      className="relative border-b border-t border-border pb-4"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: "calc(10px) calc(10px)",
      }}
    >
      <div className="absolute inset-0 left-1/2 z-0 aspect-square h-[120%] -translate-x-1/2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 blur-3xl dark:from-zinc-900 dark:to-zinc-800" />
      <section id="faq" className="mx-auto flex max-w-xl flex-col gap-4 py-16">
        <ComponentLinkWrapper className="mx-auto px-4" link="/docs/text/bold-copy">
          <BoldCopy
            text="FAQ"
            textClassName="leading-none"
            backgroundTextClassName="leading-none"
            className="bg-transparent"
          />
          <div className="relative z-10 -mt-2 block text-center text-xs leading-none text-muted-foreground md:-mt-4 md:text-base">
            You ask. We answer.
          </div>
        </ComponentLinkWrapper>
        <Accordion collapsible type="single" className="relative">
          {faq.map((_, index) => {
            return <FaqItem key={`item-${index}`} index={index} />;
          })}
        </Accordion>
      </section>
    </div>
  );
}
