import { cn } from "@/lib/utils";

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
        "relative h-full w-full overflow-hidden rounded-2xl p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function FeatureSection() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:grid-rows-2">
        <BentoCard className="bg-gray-200 dark:bg-zinc-900 sm:col-span-2">
          <h4 className="text-md font-bold">Free &amp; Open source</h4>
          <div className="font-sm text-gray-500">
            Animata is free and open source. You can use it for personal and
            commercial projects without any restrictions.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900">
          <h4 className="text-md font-bold">Full ownership</h4>
          <div className="font-sm text-gray-500">
            You have the full ownership of the code, you can adjust it as per
            your needs. No need to worry about licensing.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900">
          <h4 className="text-md font-bold">Regular updates</h4>
          <div className="font-sm text-gray-500">
            We are constantly adding new animations and effects to the library.
            You can subscribe to our newsletter to get notified.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900">
          <h4 className="text-md font-bold">Save time</h4>
          <div className="font-sm text-gray-500">
            No longer wasting hours looking for the <i>inspiration</i> or trying
            to write everything from scratch. Just copy, paste, and see it in
            action.
          </div>
        </BentoCard>

        <BentoCard className="bg-gray-200 dark:bg-zinc-900">
          <h4 className="text-md font-bold">Light weight</h4>
          <div className="font-sm text-gray-500">
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
