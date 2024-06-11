import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function CreditsPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Inspiration</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
