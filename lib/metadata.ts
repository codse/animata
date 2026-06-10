import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import {
  getPublishedCategoryDocs,
  isCategoryIndexDoc,
  type PublishedDoc,
} from "@/lib/published-docs";
import { absoluteUrl } from "@/lib/utils";

const SITE_KEYWORDS = [
  "Animata",
  "animated React components",
  "Tailwind CSS animations",
  "Next.js UI",
  "open source UI library",
  "copy paste components",
  "UI micro-interactions",
  "React animation library",
] as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = siteConfig.ogImage,
  type = "website",
  keywords = [],
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const mergedKeywords = [...new Set([...SITE_KEYWORDS, ...keywords])];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Animata",
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@animatadesign",
      creator: "@AnimataDesign",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };
}

function humanizeCategory(slug: string) {
  return slug.replace(/-/g, " ");
}

export function buildDocDescription(doc: PublishedDoc) {
  const base = doc.description?.trim();
  if (!base) {
    return `Documentation for ${doc.title} on Animata — free animated React components built with Tailwind CSS for Next.js.`;
  }

  if (isCategoryIndexDoc(doc)) {
    const count = getPublishedCategoryDocs(doc.slugAsParams).length;
    const category = humanizeCategory(doc.slugAsParams);
    return `${base} Browse ${count} free ${category} React components — copy-paste Tailwind CSS animations from Animata for Next.js apps. MIT licensed.`;
  }

  if (base.length < 140) {
    return `${base} Free copy-paste React + Tailwind CSS component from Animata for Next.js.`;
  }

  return `${base} Part of Animata — free, open-source animated React components.`;
}

function buildDocKeywords(doc: PublishedDoc) {
  const [category, component] = doc.slugAsParams.split("/");
  const keywords = [doc.title];

  if (category) keywords.push(humanizeCategory(category));
  if (component) keywords.push(humanizeCategory(component));
  if (doc.labels?.length) keywords.push(...doc.labels);

  return keywords;
}

export function buildDocMetadata(doc: PublishedDoc, ogImage: string): Metadata {
  return createPageMetadata({
    title: doc.title,
    description: buildDocDescription(doc),
    path: doc.slug,
    ogImage,
    type: "article",
    keywords: buildDocKeywords(doc),
  });
}

export function buildDocJsonLd(doc: PublishedDoc, description: string) {
  const [category] = doc.slugAsParams.split("/");

  return {
    "@context": "https://schema.org",
    "@type": isCategoryIndexDoc(doc) ? "CollectionPage" : "TechArticle",
    headline: doc.title,
    name: doc.title,
    description,
    url: absoluteUrl(doc.slug),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "Animata",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Animata",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Animata",
      url: siteConfig.url,
      description: siteConfig.description,
    },
    ...(category && !isCategoryIndexDoc(doc)
      ? {
          articleSection: humanizeCategory(category),
        }
      : {}),
    ...(doc.dateModified
      ? {
          dateModified: doc.dateModified,
        }
      : {}),
  };
}

export const homePageMetadata = createPageMetadata({
  title: "Free & Open Source Animated React Components",
  description: `Ship stunning UI faster with ${siteConfig.description}. Browse hundreds of copy-paste React animations built with Tailwind CSS for Next.js — MIT licensed, theme-aware, and production-ready.`,
  path: "/",
});

export const notFoundMetadata = createPageMetadata({
  title: "Page not found",
  description:
    "This Animata page does not exist. Return to the component library to browse free animated React UI built with Tailwind CSS.",
  path: "/404",
  noIndex: true,
});
