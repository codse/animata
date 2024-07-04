import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { CircleDashed, Code2 } from "lucide-react";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export default function ComponentLinkWrapper({
  children,
  link,
  className,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    // We need to offset the position to center the info div
    const offsetX = (infoRef.current?.offsetWidth || 0) / 2;
    const offsetY = (infoRef.current?.offsetHeight || 0) / 2;

    // Use CSS variables to position the info div instead of state to avoid re-renders
    infoRef.current?.style.setProperty("--x", `${x - offsetX}px`);
    infoRef.current?.style.setProperty("--y", `${y - offsetY}px`);
  }, []);

  useMousePosition(anchorRef, update);

  const [clicked, setClicked] = useState(false);

  return (
    <Link
      href={link}
      ref={anchorRef}
      onClick={() => {
        setClicked(true);
      }}
      className={cn("group relative block h-fit w-fit cursor-none", className)}
    >
      {children}
      {/* Cursor tracker */}
      <div
        ref={infoRef}
        style={{
          transform: "translate(var(--x), var(--y))",
        }}
        className="pointer-events-none absolute left-0 top-0 z-50 flex gap-1 rounded-full bg-zinc-950/80 px-2 py-1 text-sm font-bold text-white opacity-0 duration-0 group-hover:opacity-100"
      >
        <span className="font-mono text-xs">View code</span>
        {clicked ? <CircleDashed className="size-4 animate-spin" /> : <Code2 className="size-4" />}
      </div>
    </Link>
  );
}
