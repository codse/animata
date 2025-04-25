import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";

import NavMenu from "@/app/docs/[[...slug]]/nav-menu";
import CarbonAds from "@/components/ads";
import { Mdx } from "@/components/mdx-components";
import { DocsPager } from "@/components/pager";
import { DashboardTableOfContents } from "@/components/toc";
import { badgeVariants } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";
import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import "@/styles/mdx.css";
import "@/styles/storybook.css";
interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
      creator: doc.author ? `@${doc.author}` : "@AnimataDesign",
    },
  };
}

export async function generateStaticParams(): Promise<DocPageProps["params"][]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_150px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <ChevronRightIcon className="h-4 w-4" />
          <NavMenu
            baseRoute="docs"
            sideBarNavItems={docsConfig.sidebarNav}
            value={doc.slugAsParams}
          />
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>{doc.title}</h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
          <div
            className={cn("flex items-center space-x-2 text-sm text-muted-foreground", {
              invisible: !doc.labels?.length,
            })}
          >
            {doc.labels?.map((label) => {
              return (
                <span key={label} className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="relative w-fit overflow-y-hidden rounded-xl">
          <CarbonAds />
        </div>
        <div className="pb-12">
          <Mdx code={doc.body.code} />

          <div className="my-3 text-right">
            <Link
              href={`https://github.com/codse/animata/edit/main/content/docs/${doc.slugAsParams}.mdx`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-secondary-foreground underline"
            >
              Edit this page on GitHub
            </Link>
          </div>
        </div>
        <DocsPager doc={doc} />
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
