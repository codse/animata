import Marquee from "@/animata/container/marquee";
import Code from "@/animata/skeleton/code";
import CookieBanner from "@/animata/skeleton/cookie-banner";
import List from "@/animata/skeleton/list";
import Receipt from "@/animata/skeleton/receipt";
import Report from "@/animata/skeleton/report";
import { ComponentCard } from "@/components/component-card";

export default function SkeletonSection() {
  return (
    <ComponentCard rounded={false} className="my-4" name="Skeleton" href="/docs/skeleton">
      <Marquee className="pt-0" applyMask={false} reverse>
        <Receipt />
        <List />
        <CookieBanner />
        <Code />
        <Report />
      </Marquee>
    </ComponentCard>
  );
}
