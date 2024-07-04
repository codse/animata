import Link from "next/link";
import { ArrowRight, Combine } from "lucide-react";

import AnimatedGradientText from "@/animata/text/animated-gradient-text";
import { Separator } from "@/components/ui/separator";

export function Announcement() {
  return (
    <div className="group z-10 mx-auto mb-4 w-fit rounded-full bg-background px-2 lg:-mb-20">
      <Link href="/docs/changelog">
        <AnimatedGradientText className="inline-flex cursor-pointer items-center rounded-full border border-sky-500 from-rose-500 via-green-600 to-purple-500 px-4 py-2 text-sm font-semibold hover:border-sky-600">
          <Combine className="h-4 w-4 text-blue-500" />{" "}
          <Separator className="mx-3 h-4" orientation="vertical" /> <span>Animata is live</span>
          <ArrowRight className="ml-1 h-4 w-4 text-blue-500 transition-all group-hover:translate-x-2" />{" "}
        </AnimatedGradientText>
      </Link>
    </div>
  );
}
