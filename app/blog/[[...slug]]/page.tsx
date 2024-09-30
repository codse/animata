import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogs, Doc } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";

import NavMenu from "@/app/docs/[[...slug]]/nav-menu";
import { Mdx } from "@/components/mdx-components";
import { DocsPager } from "@/components/pager";
import { DashboardTableOfContents } from "@/components/toc";
import { badgeVariants } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogSidebarNav } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";
import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import "@/styles/mdx.css";
import "@/styles/storybook.css";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

async function getBlogFromParams({ params }: BlogPageProps) {
  const slug = params.slug?.join("/") || "";
  const blog = allBlogs.find((doc) => doc.slugAsParams === slug);

  if (!blog) {
    return null;
  }

  return blog;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogFromParams({ params });

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: absoluteUrl(blog.slug),
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
      title: blog.title,
      description: blog.description,
      images: [siteConfig.ogImage],
      creator: blog.author ? `@${blog.author}` : "@AnimataDesign",
    },
  };
}

export async function generateStaticParams(): Promise<BlogPageProps["params"][]> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogFromParams({ params });

  if (!blog) {
    notFound();
  }

  const toc = await getTableOfContents(blog.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_150px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Blog</div>
          <ChevronRightIcon className="h-4 w-4" />
          <NavMenu baseRoute="blog" sideBarNavItems={blogSidebarNav} value={blog.slugAsParams} />
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>{blog.title}</h1>
          {blog.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{blog.description}</Balancer>
            </p>
          )}
          <div
            className={cn("flex items-center space-x-2 text-sm text-muted-foreground", {
              invisible: !blog.labels?.length,
            })}
          >
            {blog.labels?.map((label) => {
              return (
                <span key={label} className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
        {blog.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {blog.links?.doc && (
              <Link
                href={blog.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {blog.links?.api && (
              <Link
                href={blog.links.api}
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
        <div className="pb-12">
          <Mdx code={blog.body.code} />

          <div className="my-3 text-right">
            <Link
              href={`https://github.com/codse/animata/edit/main/content/docs/${blog.slugAsParams}.mdx`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-secondary-foreground underline"
            >
              Edit this page on GitHub
            </Link>
          </div>
        </div>
        <DocsPager doc={blog as unknown as Doc} />
      </div>
      {blog.toc && (
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
