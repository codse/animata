import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { withOutboundRef } from "@/lib/outbound-ref";
import { cn } from "@/lib/utils";

const DISCLAIMER =
  "Disclaimer: All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, trademarks and brands does not imply endorsement.";

const attributionRowClassName =
  "text-sm font-medium leading-none text-[color:color-mix(in_oklab,var(--footer-ink)_88%,transparent)]";

const attributionItemClassName = "inline-flex items-center gap-1.5";

const attributionLinkClassName = cn(
  attributionItemClassName,
  "transition-opacity hover:opacity-90",
);

export function FooterBottom({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-[color:color-mix(in_oklab,var(--footer-ink)_8%,transparent)] bg-background px-5 py-10 text-center selection:bg-[var(--footer-ink)] selection:text-[var(--footer-gold)] sm:px-8 sm:py-12",
        className,
      )}
    >
      <p
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2",
          attributionRowClassName,
        )}
      >
        <Link
          href="/"
          className={cn(
            attributionLinkClassName,
            "font-(family-name:--font-brand) lowercase tracking-[-0.045em]",
          )}
        >
          <Icons.logo className="size-4 shrink-0 [&_*]:fill-(--footer-gold)" />
          <span>animata</span>
        </Link>
        <span>by</span>
        <Link
          href={withOutboundRef("https://codse.com")}
          target="_blank"
          rel="noopener noreferrer"
          className={attributionLinkClassName}
        >
          <Image
            src="/codse.webp"
            alt=""
            aria-hidden
            width={16}
            height={16}
            className="size-4 shrink-0"
          />
          <span>codse</span>
        </Link>
        <span>from</span>
        <span className={attributionItemClassName}>
          <span
            aria-hidden
            className="inline-flex size-4 shrink-0 items-center justify-center text-base leading-none"
          >
            🇳🇵
          </span>
          <span>Nepal</span>
        </span>
      </p>

      <p className="mt-3.5 text-sm leading-snug text-[color:color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
        many thanks to all these{" "}
        <Link
          href={withOutboundRef("https://github.com/codse/animata/graphs/contributors")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--footer-ink) underline decoration-[color:color-mix(in_oklab,var(--footer-ink)_35%,transparent)] underline-offset-[3px] transition-colors hover:text-(--footer-accent) hover:decoration-(--footer-accent)"
        >
          awesome contributors
        </Link>
      </p>

      <p className="mx-auto mt-6 max-w-3xl text-[10px] leading-[1.55] text-balance text-[color:color-mix(in_oklab,var(--footer-ink)_75%,transparent)]">
        {DISCLAIMER}
      </p>
    </div>
  );
}
