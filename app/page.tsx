import Link from "next/link";

import WaveReveal from "@/animata/text/wave-reveal";
import { Announcement } from "@/components/announcement";
import { Icons } from "@/components/icons";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <WaveReveal
          blur={false}
          text="Bring your site to life"
          className="mb-2"
        />
        <PageHeaderDescription>
          Hand-crafted animations and interactions from around the internet to
          copy and paste into your project.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs/setup" className={cn(buttonVariants())}>
            Get Started
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
        </PageActions>
      </PageHeader>
    </div>
  );
}
