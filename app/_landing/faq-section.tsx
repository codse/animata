import BoldCopy from "@/animata/text/bold-copy";
import Highlight from "./highlight";
import { cn } from "@/lib/utils";

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
        Small animations can significantly enhance the user experience by making
        websites more engaging and enjoyable. Animata offers a diverse
        collection of <Highlight>animations</Highlight>,{" "}
        <Highlight>effects</Highlight>, and <Highlight>interactions</Highlight>{" "}
        to elevate your projects effortlessly.
      </span>
    ),
  },
  {
    question: "I can make these myself. Why should I use this?",
    answer:
      "While you certainly can create animations yourself, using Animata saves you time and effort. Plus, you can learn from our implementations and even contribute to improving them.",
  },
  {
    question: "Who is behind Animata?",
    answer:
      "Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time.",
  },
  {
    question: "Sounds amazing, how do I use it?",
    answer:
      "Animata will be available by the end of June. Enter your email below to be notified as soon as we go live.",
  },
];

function FaqItem({ index }: { index: number }) {
  const item = faq[index];
  const count = (
    <BoldCopy
      text={String(index + 1)}
      className="w-fit bg-transparent px-0 md:px-0"
      textClassName="text-md md:text-xl group-hover:text-2xl group-hover:md:text-5xl transition-all"
      backgroundTextClassName="text-2xl md:text-5xl"
    />
  );

  return (
    <div
      key={`question-${index}`}
      className={cn({
        "mb-4": index !== faq.length - 1,
      })}
    >
      <h3 className="relative flex flex-shrink-0 flex-wrap items-center gap-4">
        {count}
        <span className="inline-block w-3/4 text-lg font-medium md:text-xl">
          {item.question}
        </span>
      </h3>
      <div className="flex gap-4">
        <div className="invisible h-0">{count}</div>
        <div className="text-muted-foreground">{item.answer}</div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative mx-auto max-w-5xl">
      <BoldCopy
        text="FAQ"
        className="mb-4 border border-gray-200 dark:border-zinc-800"
      />
      {faq.map((_, index) => {
        return <FaqItem key={`item-${index}`} index={index} />;
      })}
    </section>
  );
}
