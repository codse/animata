import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Inspiration | Animata",
  description:
    "Sources and inspiration behind Animata's animated React components — beautifully designed UI patterns you can copy into your apps.",
  path: "/credits",
  keywords: ["design inspiration", "UI references", "component sources"],
});

export default function CreditsPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Inspiration</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your apps. Accessible.
          Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
