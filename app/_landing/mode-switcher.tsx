import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Cloud, MoonStar, Star, Sun } from "lucide-react";

export default function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const rotate = useMotionValue(resolvedTheme === "dark" ? 180 : 0);
  const spring = useSpring(rotate, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      style={{
        rotate: spring,
      }}
      initial={{
        rotate: resolvedTheme === "dark" ? 180 : 0,
      }}
      onClick={() => {
        rotate.set(rotate.get() + 180);
      }}
      className="grid h-48 w-48 cursor-pointer grid-cols-2 grid-rows-2"
    >
      <div
        onClick={() => {
          setTheme("light");
        }}
        className="group relative col-start-2 row-start-2 flex h-24 w-24 items-center justify-center"
      >
        <motion.span
          key={resolvedTheme}
          className="absolute bottom-2 right-2 h-4 w-4 rotate-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Star className="size-4 fill-yellow-300 stroke-yellow-300" />
        </motion.span>
        <MoonStar className="size-10 rotate-180 fill-white transition-all group-hover:scale-110 group-active:scale-100" />
      </div>
      <div
        className="group relative flex h-24 w-24 items-center justify-center"
        onClick={() => {
          setTheme("dark");
        }}
      >
        <motion.span
          key={resolvedTheme}
          className="absolute top-12 z-10"
          initial={{ translateX: -45 }}
          animate={{ translateX: 0 }}
          exit={{ translateX: -45 }}
          transition={{ duration: 1.2 }}
        >
          <Cloud className="size-8 fill-white" />
        </motion.span>
        <Sun className="size-10 transition-all group-hover:scale-110 group-active:scale-100" />
      </div>
    </motion.div>
  );
}
