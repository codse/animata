"use client";

import { Quote } from "lucide-react";

const testimonials: {
  comment: string;
  author: string;
}[] = [
  {
    comment:
      "Animata looks amazing! The collection of animations and ease of customization are impressive. Kudos to the team for delivering such a fresh and useful resource! \u{1F31F}",
    author: "Nik Italiya",
  },
  {
    comment: "Finally, something fresh and not either a clone of shadcn or aceternity ui",
    author: "jack",
  },
  {
    comment: "This is so cool \u{1F60D}\u{1F64C}",
    author: "Sabin Baniya",
  },
  {
    comment: "Added to the favorites \u{1F60D}",
    author: "Diego Ramiro",
  },
  {
    comment:
      "I have to be honest, the UI is delivering the widgets and components very nicely. I really like it \u{2014} kudos from me \u{1F44D}\u{1F3FB}",
    author: "Shriansh Agarwal",
  },
  {
    comment: "I will use Animata library from now in my all next projects.",
    author: "Raja Junaid",
  },
  {
    comment: "I love it !!",
    author: "Guillaume Robert",
  },
  {
    comment: "Great animations, super easy to integrate. Bookmarked for all future projects.",
    author: "Aman Raj",
  },
  {
    comment: "Exactly what I was looking for — copy paste components that don't look generic.",
    author: "Sara K.",
  },
];

function Testimonial({ comment, author }: { comment: string; author: string }) {
  return (
    <div className="flex w-full gap-3 rounded-2xl border border-border bg-[hsl(var(--surface-card))] p-5 text-[14px] leading-relaxed transition-colors duration-300 hover:border-foreground/20 sm:p-6">
      <div className="flex-1">
        {comment}
        <div className="mt-3 text-[13px] font-medium text-muted-foreground">— {author}</div>
      </div>
      <Quote aria-hidden="true" className="size-5 flex-shrink-0 text-foreground/5" />
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="border-t border-border py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 sm:mb-14">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,5vw,44px)] leading-[1] text-foreground">
            Loved by developers
            <br />
            <span className="text-muted-foreground">worldwide.</span>
          </h2>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {testimonials.map(({ comment, author }, index) => (
            <Testimonial key={index} comment={comment} author={author} />
          ))}
        </div>
      </div>
    </div>
  );
}
