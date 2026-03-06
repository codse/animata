import type * as React from "react";
import { docs as allDocs } from "#site/content";

import { Mdx } from "./mdx-components";

interface FrameworkDocsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: string;
}

export async function FrameworkDocs({ ...props }: FrameworkDocsProps) {
  const frameworkDoc = allDocs.find((doc) => doc.slug === `/docs/installation/${props.data}`);

  if (!frameworkDoc) {
    return null;
  }

  return <Mdx code={frameworkDoc.body} filePath={`content/${frameworkDoc.path}.mdx`} />;
}
