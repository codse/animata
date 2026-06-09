import type { Metadata } from "next";

import { ResourcesShell } from "@/components/resources/resources-shell";

export const metadata: Metadata = {
  title: "Resources",
  description: "Sites we use while building animata.",
  openGraph: {
    title: "Resources",
    description: "Sites we use while building animata.",
  },
};

export default function ResourcesPage() {
  return <ResourcesShell />;
}
