import fs from "node:fs";
import type { BlogPosting, WithContext } from "schema-dts";
import { defineCollection, defineConfig, s } from "velite";

function getDateModified(data: { dateModified?: string; date?: string; path: string }) {
  return (
    data.dateModified ??
    data.date ??
    (() => {
      try {
        return fs.statSync(`content/${data.path}.mdx`).mtime.toISOString();
      } catch {
        return new Date().toISOString();
      }
    })()
  );
}

function buildStructuredData(data: {
  title: string;
  date?: string;
  description: string;
  author?: string;
  path: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    datePublished: data.date,
    dateModified: data.dateModified,
    description: data.description,
    image: `/api/og?title=${encodeURI(data.title)}`,
    url: `https://animata.design/${data.path}`,
    author: {
      "@type": "Person",
      name: data.author,
      url: `https://twitter.com/${data.author}`,
    },
  } as WithContext<BlogPosting>;
}

const contentSchema = s.object({
  title: s.string(),
  description: s.string(),
  date: s.isodate().optional(),
  published: s.boolean().default(true),
  links: s
    .object({
      doc: s.string().optional(),
      api: s.string().optional(),
    })
    .optional(),
  featured: s.boolean().default(false),
  toc: s.boolean().default(true),
  author: s.string().optional(),
  video: s.string().optional(),
  labels: s.array(s.string()).optional(),
  dateModified: s.isodate().optional(),
  path: s.path(),
  content: s.markdown(),
  body: s.raw(),
});

const docs = defineCollection({
  name: "Doc",
  pattern: "docs/**/*.mdx",
  schema: contentSchema.transform((data) => {
    const dateModified = getDateModified(data);
    return {
      ...data,
      url: `/${data.path}`,
      image: `/api/og?title=${encodeURI(data.title)}`,
      slug: `/${data.path}`,
      slugAsParams: data.path.split("/").slice(1).join("/"),
      dateModified,
      structuredData: buildStructuredData({ ...data, dateModified }),
    };
  }),
});

const blogs = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: contentSchema.transform((data) => {
    const dateModified = getDateModified(data);
    return {
      ...data,
      url: `/${data.path}`,
      image: `/api/og?title=${encodeURI(data.title)}`,
      slug: `/${data.path}`,
      slugAsParams: data.path.split("/").slice(1).join("/"),
      dateModified,
      structuredData: buildStructuredData({ ...data, dateModified }),
    };
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { docs, blogs },
});
