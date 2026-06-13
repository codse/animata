import { createPageMetadata } from "@/lib/metadata";

import TextAnimationsGallery from "./text-animations-gallery";

export const metadata = createPageMetadata({
  title: "Text Animations | Animata",
  description:
    "Browse twenty keynote-style React text animations — soft blur reveals, per-character rises, mask reveals, and kinetic builds. Lazy-mounted previews with copy-paste Tailwind CSS code.",
  path: "/text-animations",
  keywords: ["text animation", "React text effects", "keynote typography", "animated headings"],
});

export default function TextAnimationsPage() {
  return <TextAnimationsGallery />;
}
