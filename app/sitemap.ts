import { MetadataRoute } from "next";

import { allDocs } from "@/.contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  return [
    {
      url: `${domain}/`,
      lastModified: new Date(),
    },
    ...allDocs
      .filter((doc) => doc.published)
      .map((doc) => ({
        url: `${domain}/docs/${doc.slugAsParams}`,
        lastModified: doc.date ?? doc.dateModified,
      })),
  ];
}
