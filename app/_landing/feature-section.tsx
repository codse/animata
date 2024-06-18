import { cn } from "@/lib/utils";
import { Cabin as Font } from "next/font/google";
import Image from "next/image";

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

const textFont = Font({
  subsets: ["latin"],
});

export default function FeatureSection() {
  const titleClassName = "text-2xl font-bold dark:text-primary";
  const descriptionClassName = "dark:text-gray-500 font-medium";
  const imageClassName = "my-12 flex-1 self-center max-h-[300px]";
  return (
    <div className="mb-24 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-2">
        <BentoCard className="flex flex-col bg-purple-100 dark:bg-zinc-900 sm:col-span-2">
          <h4
            className={cn(
              titleClassName,
              textFont.className,
              "text-purple-900",
            )}
          >
            Free &amp; Open source
          </h4>
          <div className="my-12 flex flex-1 gap-6 self-center">
            <Image src="/coder1.svg" width={160} height={160} alt="coder" />
            <Image src="/coder2.svg" width={150} height={150} alt="coder" />
            <Image src="/coder3.svg" width={140} height={140} alt="coder" />
            <Image src="/coder4.svg" width={140} height={140} alt="coder" />
          </div>
          <div className={cn(descriptionClassName, "text-purple-900")}>
            Animata is free and open source. You can use it for personal and
            commercial projects without any restrictions.
          </div>
        </BentoCard>

        <BentoCard className="flex flex-col bg-orange-100 dark:bg-zinc-900">
          <h4
            className={cn(
              titleClassName,
              textFont.className,
              "text-orange-900",
            )}
          >
            Full ownership
          </h4>
          <Image
            src="/best-product.svg"
            width={160}
            height={160}
            className={imageClassName}
            alt="best-product"
          />
          <div className={cn(descriptionClassName, "text-orange-900")}>
            You have the full ownership of the code, you can adjust it as per
            your needs. No need to worry about licensing.
          </div>
        </BentoCard>

        <BentoCard className="flex flex-col bg-pink-100 dark:bg-zinc-900">
          <h4
            className={cn(titleClassName, textFont.className, "text-pink-900")}
          >
            Regular updates
          </h4>
          <Image
            src="/coding-rocket.svg"
            width={160}
            height={160}
            className={imageClassName}
            alt="coding-rocket"
          />
          <div className={cn(descriptionClassName, "text-pink-900")}>
            We are constantly adding new animations and effects to the library.
            You can subscribe to our newsletter to get notified.
          </div>
        </BentoCard>

        <BentoCard className="flex flex-col bg-lime-100 dark:bg-zinc-900">
          <h4
            className={cn(titleClassName, textFont.className, "text-lime-900")}
          >
            Save time
          </h4>
          <Image
            src="/website-work.svg"
            width={280}
            height={280}
            className={imageClassName}
            alt="website-work"
          />
          <div className={cn(descriptionClassName, "text-lime-900")}>
            No longer wasting hours looking for the <i>inspiration</i> or trying
            to write everything from scratch. Just copy, paste, and see it in
            action.
          </div>
        </BentoCard>

        <BentoCard className="flex flex-col bg-yellow-100 dark:bg-zinc-900">
          <h4
            className={cn(
              titleClassName,
              textFont.className,
              "text-yellow-900",
            )}
          >
            Light weight
          </h4>
          <Image
            src="/monitor.svg"
            width={280}
            height={280}
            className={imageClassName}
            alt="monitor"
          />
          <div className={cn(descriptionClassName, "text-yellow-900")}>
            Most of the effects are lightweight and just built with CSS without
            dependency on{" "}
            <span className="underline decoration-wavy">
              external libraries
            </span>
            .
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
