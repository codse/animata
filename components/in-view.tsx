"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders children only once the wrapper scrolls into view. Useful for
 * animations that should not start until the user can actually see them.
 */
export function InView({
  children,
  rootMargin = "200px",
  className,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  return (
    <InViewObserver key={rootMargin} rootMargin={rootMargin} className={className}>
      {children}
    </InViewObserver>
  );
}

function InViewObserver({
  children,
  rootMargin,
  className,
}: {
  children: React.ReactNode;
  rootMargin: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // rootMargin changes remount this component via key={rootMargin} on the wrapper.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional remount via parent key
  useEffect(() => {
    if (visible) {
      return;
    }

    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            break;
          }
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}

export default InView;
