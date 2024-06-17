import Link from "next/link";

import { Icons } from "@/components/icons";
import { PageHeaderDescription } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import HeroTitle from "./hero-title";
import HeroExamples from "./hero-examples";
import { NewsletterInput } from "./newsletter";

export default function Hero() {
  return (
    <div className="container mx-auto flex h-[90vh] max-w-7xl flex-col items-center justify-center gap-4 md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center py-8 md:items-start md:py-24">
        <HeroTitle />
        <PageHeaderDescription className="mb-4 md:text-left">
          Hand-crafted ✍️ interaction animations and effects from around the
          internet 🛜 to{" "}
          <span className="underline decoration-wavy underline-offset-8">
            copy
          </span>{" "}
          and{" "}
          <span className="underline decoration-wavy underline-offset-8">
            paste
          </span>{" "}
          into your project.
        </PageHeaderDescription>
        <PageHeaderDescription className="mb-2 md:text-left">
          Subscribe to our newsletter and never miss our updates.
        </PageHeaderDescription>
        <NewsletterInput />
        {/* <div className="mb-6 mt-3 flex items-start gap-4">
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
            GitHub
          </Link>
        </div> */}
      </div>
      <HeroExamples />
    </div>
  );
}
