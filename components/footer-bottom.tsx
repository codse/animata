import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { withOutboundRef } from "@/lib/outbound-ref";
import { cn } from "@/lib/utils";

const DISCLAIMER =
  "Disclaimer: All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, trademarks and brands does not imply endorsement.";

export function FooterBottom({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-black/8 bg-white px-5 py-10 text-center selection:bg-black/30 selection:text-white sm:px-8 sm:py-12",
        className,
      )}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-sm leading-none text-black/88">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <Icons.logo className="size-4 shrink-0" />
          <span>animata</span>
        </Link>
        <span className="text-black/45">by</span>
        <Link
          href={withOutboundRef("https://codse.com")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
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
        <span className="text-black/45">from</span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="text-[13px] leading-none">
            🇳🇵
          </span>
          <span>Nepal</span>
        </span>
      </p>

      <p className="mt-3.5 text-sm leading-snug text-black/72">
        many thanks to all these{" "}
        <Link
          href={withOutboundRef("https://github.com/codse/animata/graphs/contributors")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-black/35 underline-offset-[3px] transition-colors hover:text-black hover:decoration-black/70"
        >
          awesome contributors
        </Link>
      </p>

      <p className="mx-auto mt-6 max-w-3xl text-[10px] leading-[1.55] text-balance text-black/75">
        {DISCLAIMER}
      </p>
    </div>
  );
}
