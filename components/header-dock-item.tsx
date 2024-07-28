import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function HeaderDockItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...props}
      whileHover={{ scale: 1.1, translateY: -2, transition: { type: "spring", bounce: 0.6 } }}
      whileTap={{ scale: 1.2, translateY: -8, transition: { type: "spring", bounce: 0.8 } }}
      className={cn(
        "flex aspect-square w-10 items-center justify-center rounded-xl bg-zinc-600 px-0 dark:bg-slate-200/75",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
