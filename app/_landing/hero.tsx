import Link from "next/link";

import { Icons } from "@/components/icons";
import { PageHeaderDescription } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import HeroTitle from "./hero-title";

export default function Hero() {
  return (
    <div className="mx-auto mb-12 flex max-w-7xl flex-col items-center justify-center gap-8 py-20">
      <HeroTitle />

      <PageHeaderDescription className="mx-auto mb-4 w-fit duration-1000 ease-minor-spring animate-in fade-in-0 slide-in-from-bottom-3">
        Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to{" "}
        <span className="underline decoration-wavy underline-offset-8">copy</span> and{" "}
        <span className="underline decoration-wavy underline-offset-8">paste</span> into your
        project.
      </PageHeaderDescription>
      <div className="mb-6 mt-3 flex items-start gap-4 duration-1000 ease-minor-spring animate-in fade-in-0 slide-in-from-bottom-3">
        <Link href="/docs/setup" className={cn(buttonVariants())}>
          Get started
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Star us on GitHub
        </Link>
      </div>
    </div>
  );
}
