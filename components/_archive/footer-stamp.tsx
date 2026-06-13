import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type FooterStampProps = {
  className?: string;
};

export function FooterStamp({ className }: FooterStampProps) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center overflow-visible", className)}>
      <Icons.logo className="pointer-events-none w-[300%] max-w-none scale-[2] opacity-[0.18] [&_*]:fill-(--footer-stamp)!" />
    </div>
  );
}
