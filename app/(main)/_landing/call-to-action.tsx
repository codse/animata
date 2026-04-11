"use client";

import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import GibberishText from "@/animata/text/gibberish-text";
import ComponentLinkWrapper from "@/components/component-link-wrapper";
import { Icons } from "@/components/icons";
import RemountOnMouseIn from "@/components/remount-on-mouse-in";
import { siteConfig } from "@/config/site";

export default function CallToActionSection() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headerRef);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setKey((prev) => prev + 1);
    }
  }, [isInView]);

  return (
    <section className="border-t border-border py-20 sm:py-24 lg:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <ComponentLinkWrapper link="/docs/text/gibberish-text" className="mx-auto">
          <h2
            ref={headerRef}
            className="px-0 py-2 text-center text-[clamp(22px,4vw,32px)] font-semibold tracking-tight text-foreground"
          >
            <RemountOnMouseIn>
              <GibberishText key={`in_${key}`} text="Start building now" />
            </RemountOnMouseIn>
          </h2>
        </ComponentLinkWrapper>

        <p className="mt-4 max-w-md text-balance text-[15px] leading-relaxed text-muted-foreground">
          Free forever. One command to add any component. The polish your users notice — without the
          weeks of work.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--accent))] px-8 py-3.5 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get started now
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icons.gitHub className="size-4" />
            View on GitHub →
          </Link>
        </div>
      </div>
    </section>
  );
}
