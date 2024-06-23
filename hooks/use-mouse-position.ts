import { useEffect, useState } from "react";

export function useMousePosition(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };
      setPosition({ x: clientX - left, y: clientY - top });
    };

    ref.current?.addEventListener("mousemove", handleMouseMove);

    () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return position;
}
