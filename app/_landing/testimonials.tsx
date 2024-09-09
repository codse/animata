import { useRef } from "react";
import { useTheme } from "next-themes";
import { useInView } from "framer-motion";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";

const testimonials: {
  comment: string;
  author: string;
}[] = [
  {
    comment:
      "Animata looks amazing! The collection of animations and ease of customization are impressive. Kudos to the team for delivering such a fresh and useful resource! 🌟",
    author: "Nik Italiya",
  },
  {
    comment: "Finally, something fresh and not either a clone of shadcn or aceternity ui",
    author: "jack",
  },
  {
    comment: "This is so cool 😍🙌",
    author: "Sabin Baniya",
  },
  {
    comment: "Added to the favorites 😍",
    author: "Diego Ramiro",
  },
  {
    comment:
      "I have to be honest, the UI is delivering the widgets and components very nicely. I really like it—kudos from me 👍🏻",
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
];

function Testimonial({
  comment,
  author,
  className,
}: {
  comment: string;
  author: string;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(divRef, {
    once: true,
  });
  return (
    <div
      ref={divRef}
      key={`${isInView}-${author}`}
      className={cn(
        "flex h-fit w-fit max-w-sm flex-shrink-0 transform gap-2 rounded-xl border-2 border-border bg-background p-3 text-sm transition-all duration-1000 ease-in-out animate-in",
        className,
      )}
    >
      <div className="flex-1">
        {comment}
        <div className="mt-2 font-semibold">{author}</div>
      </div>
      <Quote className="size-10 flex-shrink-0 opacity-5 dark:opacity-10" />
    </div>
  );
}

export default function Testimonials() {
  const { theme } = useTheme();
  const lineColor = theme === "dark" ? "#ffffff12" : "#444cf710";

  return (
    <div
      className="relative -mt-4 flex flex-col gap-2 overflow-hidden px-4 py-16"
      style={{
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: "80px 30px",
      }}
    >
      <div className="absolute inset-0 left-1/2 z-0 h-[200%] w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-b from-background to-transparent mix-blend-screen blur-3xl dark:mix-blend-darken" />

      <h3 className="mb-6 text-center text-3xl font-bold leading-none text-foreground md:text-4xl lg:text-5xl">
        wall of love
      </h3>
      <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4">
        {testimonials.map(({ comment, author }, index) => (
          <Testimonial
            className={cn({
              "slide-in-from-right-full": index % 2 === 0,
              "slide-in-from-left-full": index % 2 !== 0,
            })}
            key={index}
            comment={comment}
            author={author}
          />
        ))}
      </div>
    </div>
  );
}
