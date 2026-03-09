import { type MotionValue, motion, useMotionValue, useTransform } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// This function might need updates to support different cases.
const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      if (child.type === React.Fragment) {
        result.push(...flatten(childProps.children as React.ReactNode));
      } else if (childProps.children) {
        result.push(React.cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>),
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

function OpacityChild({
  children,
  index,
  progress,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.5, 1]);

  let className = "";
  if (React.isValidElement(children)) {
    className = (Reflect.get(children, "props") as Record<string, unknown>)?.className as string;
  }

  return (
    <motion.span style={{ opacity }} className={cn(className, "h-fit")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({ children, className, ...props }: ScrollRevealProps) {
  const flat = flatten(children);
  const count = flat.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    scrollYProgress.set(maxScroll > 0 ? scrollTop / maxScroll : 0);
  }, [scrollYProgress]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        // Adjust the height and spacing according to the need
        "relative h-96 w-full overflow-y-scroll bg-foreground text-background dark:text-zinc-900",
        className,
      )}
    >
      <div className="sticky top-0 flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-full min-w-fit flex-wrap whitespace-break-spaces p-8">
          {flat.map((child, index) => {
            return (
              <OpacityChild
                progress={scrollYProgress}
                index={index}
                total={flat.length}
                key={index}
              >
                {child}
              </OpacityChild>
            );
          })}
        </div>
      </div>
      {Array.from({ length: count }).map((_, index) => (
        // Create really large area to make the scroll effect work
        <div key={index} className="h-32" />
      ))}
    </div>
  );
}
