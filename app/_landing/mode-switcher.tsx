import { motion, useMotionValue, useSpring } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeSwitcher() {
  const { setTheme, theme } = useTheme();
  const rotate = useMotionValue(theme === "dark" ? 180 : 0);
  const spring = useSpring(rotate, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      style={{
        rotate: spring,
      }}
      onClick={() => {
        rotate.set(rotate.get() + 180);
      }}
      className="grid h-48 w-48 cursor-pointer grid-cols-2 grid-rows-2"
    >
      <div
        className="group flex h-24 w-24 items-center justify-center"
        onClick={() => {
          setTheme("dark");
        }}
      >
        <MoonIcon className="h-[2rem] w-[2rem] transition-all group-hover:scale-125 group-active:scale-100" />
      </div>
      <div
        onClick={() => {
          setTheme("light");
        }}
        className="group col-start-2 row-start-2 flex h-24 w-24 items-center justify-center"
      >
        <SunIcon className="h-[2rem] w-[2rem] text-yellow-300 transition-all group-hover:scale-125 group-active:scale-100" />
      </div>
    </motion.div>
  );
}
