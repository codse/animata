import { Fragment, type KeyboardEvent, type ReactNode, useRef, useState } from "react";

export default function RemountOnMouseIn({
  children,
  className,
  duration,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Duration in milliseconds to wait before allowing a remount
   */
  duration?: number;
}) {
  const [key, setKey] = useState(0);
  const lastUpdate = useRef(0);

  const update = () => {
    const now = Date.now();
    if (lastUpdate.current === 0) {
      lastUpdate.current = now;
    }
    if (now - lastUpdate.current > (duration ?? 1000)) {
      setKey((prev) => prev + 1);
      lastUpdate.current = now;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      update();
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={update}
      onMouseEnter={update}
      onKeyDown={handleKeyDown}
    >
      <Fragment key={`force-${key}`}>{children}</Fragment>
    </button>
  );
}
