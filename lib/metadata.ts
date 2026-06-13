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

const BRAND_SUFFIX = "Animata";
const COMPONENT_SUFFIX =
  "Copy-paste production-ready React + Tailwind CSS code for Next.js. Open source, MIT licensed.";

type PageMetadataInput = {
  title: string | Metadata["title"];
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
};

type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
};

export type PublishedBlog = {
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  slugAsParams: string;
  author?: string;
  date?: string;
  dateModified?: string;
  labels?: string[];
};

function humanizeCategory(slug: string) {
  return slug.replace(/-/g, " ");
}

function titleCase(text: string) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveTitleString(title: Metadata["title"]) {
  if (!title) return BRAND_SUFFIX;
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return BRAND_SUFFIX;
}

export function isGuideDoc(doc: PublishedDoc) {
  return doc.slugAsParams.startsWith("guides/");
}

function buildDocTitle(doc: PublishedDoc & SeoFields): Metadata["title"] {
  if (doc.seoTitle) {
    return { absolute: `${doc.seoTitle} | ${BRAND_SUFFIX}` };
  }

  const [category] = doc.slugAsParams.split("/");

  if (isCategoryIndexDoc(doc)) {
    const categoryLabel = titleCase(humanizeCategory(category ?? doc.slugAsParams));
    return {
      absolute: `Animated ${categoryLabel} Components (React & Tailwind) | ${BRAND_SUFFIX}`,
    };
  }

  if (isGuideDoc(doc)) {
    return { absolute: `${doc.title} | ${BRAND_SUFFIX}` };
  }

  const categoryLabel = category ? titleCase(humanizeCategory(category)) : "UI";
  return {
    absolute: `Animated ${doc.title} — ${categoryLabel} React Component (Tailwind CSS) | ${BRAND_SUFFIX}`,
  };
}

function buildDocHeadline(doc: PublishedDoc & SeoFields) {
  if (doc.seoTitle) return doc.seoTitle;
  const title = buildDocTitle(doc);
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && title.absolute) {
    return title.absolute.replace(` | ${BRAND_SUFFIX}`, "");
  }
  return doc.title;
}

export function buildDocDescription(doc: PublishedDoc & SeoFields) {
  if (doc.seoDescription?.trim()) {
    return doc.seoDescription.trim();
  }

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
    return `${base} ${COMPONENT_SUFFIX}`;
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
  const titleString = resolveTitleString(title);

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: titleString,
      description,
      url: canonical,
      siteName: BRAND_SUFFIX,
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: titleString,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleString,
      description,
      images: [ogImage],
      site: "@animatadesign",
      creator: "@animatadesign",
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

export function buildDocMetadata(doc: PublishedDoc, ogImage: string): Metadata {
  const description = buildDocDescription(doc);

  return createPageMetadata({
    title: buildDocTitle(doc),
    description,
    path: doc.slug,
    ogImage,
    type: "article",
    keywords: buildDocKeywords(doc),
  });
}

function buildBreadcrumbJsonLd(doc: PublishedDoc) {
  const [category, component] = doc.slugAsParams.split("/");
  const items: Array<{ name: string; url: string }> = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Docs", url: absoluteUrl("/docs") },
  ];

  if (isGuideDoc(doc)) {
    items.push({ name: "Guides", url: absoluteUrl("/docs/guides/animated-react-buttons") });
    items.push({ name: doc.title, url: absoluteUrl(doc.slug) });
  } else if (isCategoryIndexDoc(doc)) {
    items.push({ name: titleCase(humanizeCategory(doc.slugAsParams)), url: absoluteUrl(doc.slug) });
  } else if (category) {
    items.push({
      name: titleCase(humanizeCategory(category)),
      url: absoluteUrl(`/docs/${category}`),
    });
    if (component) {
      items.push({ name: doc.title, url: absoluteUrl(doc.slug) });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildGuideItemListJsonLd(doc: PublishedDoc, description: string) {
  if (doc.slugAsParams !== "guides/animated-react-buttons") {
    return null;
  }

  const items = [
    { name: "AI Button", url: "/docs/button/ai-button" },
    { name: "Duolingo Button", url: "/docs/button/duolingo" },
    { name: "Ripple Button", url: "/docs/button/ripple-button" },
    { name: "Shining Button", url: "/docs/button/shining-button" },
    { name: "Swipe Button", url: "/docs/button/swipe-button" },
    { name: "Status Button", url: "/docs/button/status-button" },
    { name: "Animated Follow Button", url: "/docs/button/animated-follow-button" },
    { name: "Get Started Button", url: "/docs/button/get-started-button" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: buildDocHeadline(doc),
    description,
    url: absoluteUrl(doc.slug),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function buildDocJsonLd(doc: PublishedDoc, description: string) {
  const [category] = doc.slugAsParams.split("/");
  const headline = buildDocHeadline(doc);

  const mainEntity = {
    "@context": "https://schema.org",
    "@type": isCategoryIndexDoc(doc) || isGuideDoc(doc) ? "CollectionPage" : "TechArticle",
    headline,
    name: doc.title,
    description,
    url: absoluteUrl(doc.slug),
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: BRAND_SUFFIX,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_SUFFIX,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_SUFFIX,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    ...(category && !isCategoryIndexDoc(doc) && !isGuideDoc(doc)
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

  const breadcrumb = buildBreadcrumbJsonLd(doc);
  const itemList = buildGuideItemListJsonLd(doc, description);

  if (itemList) {
    return [mainEntity, breadcrumb, itemList];
  }

  return [mainEntity, breadcrumb];
}

function buildBlogTitle(blog: PublishedBlog): Metadata["title"] {
  if (blog.seoTitle) {
    return { absolute: `${blog.seoTitle} | ${BRAND_SUFFIX}` };
  }

  return blog.title;
}

export function buildBlogDescription(blog: PublishedBlog) {
  if (blog.seoDescription?.trim()) {
    return blog.seoDescription.trim();
  }

  return blog.description;
}

export function buildBlogMetadata(blog: PublishedBlog): Metadata {
  const description = buildBlogDescription(blog);

  return createPageMetadata({
    title: buildBlogTitle(blog),
    description,
    path: blog.slug,
    type: "article",
    keywords: [blog.title, ...(blog.labels ?? [])],
  });
}

export function buildBlogJsonLd(blog: PublishedBlog, description: string) {
  const headline = blog.seoTitle ?? blog.title;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    name: blog.title,
    description,
    url: absoluteUrl(blog.slug),
    inLanguage: "en-US",
    datePublished: blog.date,
    dateModified: blog.dateModified ?? blog.date,
    image: siteConfig.ogImage,
    author: blog.author
      ? {
          "@type": "Person",
          name: blog.author,
          url: `https://twitter.com/${blog.author}`,
        }
      : {
          "@type": "Organization",
          name: BRAND_SUFFIX,
          url: siteConfig.url,
        },
    publisher: {
      "@type": "Organization",
      name: BRAND_SUFFIX,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: blog.title, item: absoluteUrl(blog.slug) },
    ],
  };

  return [article, breadcrumb];
}

export const homePageMetadata = createPageMetadata({
  title: "Free Animated React Components | Animata",
  description: `Ship stunning UI faster with ${siteConfig.description}. Browse hundreds of copy-paste React animations built with Tailwind CSS for Next.js — MIT licensed, theme-aware, and production-ready.`,
  path: "/",
});

export const notFoundMetadata = createPageMetadata({
  title: "Page not found | Animata",
  description:
    "This Animata page does not exist. Return to the component library to browse free animated React UI built with Tailwind CSS.",
  path: "/404",
  noIndex: true,
});
