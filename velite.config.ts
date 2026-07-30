import fs from "node:fs";
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

const contentSchema = s.object({
  title: s.string(),
  description: s.string(),
  seoTitle: s.string().optional(),
  seoDescription: s.string().optional(),
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
