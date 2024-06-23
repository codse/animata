// contentlayer.config.ts
import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { BlogPosting, WithContext } from "schema-dts";
import { visit } from "unist-util-visit";

const computedFields: ComputedFields = {
  url: {
    type: "string",
    resolve: (post: any) => `/${post._raw.flattenedPath}`,
  },
  image: {
    type: "string",
    resolve: (post: any) => `/api/og?title=${encodeURI(post.title)}`,
  },
  slug: {
    type: "string",
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  structuredData: {
    type: "json",
    resolve: (doc: any) =>
      ({
        "@context": "https://schema.org",
        "@type": `BlogPosting`,
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.summary,
        image: doc.image,
        url: `https://animata.design/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: doc.author,
          url: `https://twitter.com/${doc.author}`,
        },
      }) as WithContext<BlogPosting>,
  },
};

const LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string",
    },
    api: {
      type: "string",
    },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: { type: "date", required: false },
    published: {
      type: "boolean",
      default: true,
    },
    links: {
      type: "nested",
      of: LinksProperties,
    },
    featured: {
      type: "boolean",
      default: false,
      required: false,
    },
    toc: { type: "boolean", default: true, required: false },
    author: { type: "string", required: false },
    video: { type: "string", required: false },
    labels: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields,
}));

const setupCodeSnippet = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") {
        return;
      }

      if (codeEl.data?.meta) {
        // Extract event from meta and pass it down the tree.
        const regex = /event="([^"]*)"/;
        const match = codeEl.data?.meta.match(regex);
        if (match) {
          node.__event__ = match ? match[1] : null;
          codeEl.data.meta = codeEl.data.meta.replace(regex, "");
        }

        const copyId = codeEl.data?.meta.match(/copyId="([^"]*)"/);
        if (copyId) {
          node.__copyId__ = copyId[1];
        }
      }

      node.__rawString__ = codeEl.children?.[0].value;
    }
  });
};

const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node.__rawString__) {
      if (node.tagName !== "pre") {
        const [pre] = node.children;
        if (pre.tagName !== "pre") {
          return;
        }
        pre.properties.__copyId__ = node.__copyId__;
        pre.properties.__rawString__ = node.__rawString__;
        Reflect.deleteProperty(node, "__rawString__");
        Reflect.deleteProperty(node, "__copyId__");
      }
    }
  });
};

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      // @ts-ignore
      codeImport,
    ],
    rehypePlugins: [
      setupCodeSnippet,
      rehypeSlug,
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
            if (!node.properties.className) {
              node.properties.className = ["line"];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      postProcess,
    ],
  },
});
