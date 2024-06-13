import { useMousePosition } from "@/hooks/use-mouse-position";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskTextProps extends React.HTMLAttributes<HTMLDivElement> {
  revealText: string;
  originalText: React.ReactNode | string;
}
export default function MaskText({
  revealText,
  originalText,
  className,
}: MaskTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 300 : 50;

  const common =
    "flex h-full w-full items-center justify-center text-5xl font-bold leading-snug";

  return (
    <div className={cn("relative h-screen", className)}>
      <motion.div
        className={cn(common, "absolute bg-black text-white")}
        style={{
          maskImage: "url(/circle.svg)",
          maskRepeat: "no-repeat",
          maskSize: "50px",
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {revealText}
        </p>
      </motion.div>

      <div className={common}>{originalText}</div>
    </div>
  );
}
