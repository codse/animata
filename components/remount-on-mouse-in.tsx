import { Fragment, ReactNode, useRef, useState } from "react";

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
  const lastUpdate = useRef(Date.now());

  const update = () => {
    if (Date.now() - lastUpdate.current > (duration ?? 1000)) {
      setKey((prev) => prev + 1);
      lastUpdate.current = Date.now();
    }
  };

  return (
    <div className={className} onClick={update} onMouseEnter={update}>
      <Fragment key={`force-${key}`}>{children}</Fragment>
    </div>
  );
}
