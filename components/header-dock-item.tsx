import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

import { cn } from "@/lib/utils";

export default function HeaderDockItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  whileTap?: VariantLabels | TargetAndTransition;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, translateY: -5, transition: { type: "spring", bounce: 0.75 } }}
      whileTap={{ scale: 1.25, translateY: -10, transition: { type: "spring", bounce: 0.9 } }}
      className={cn(
        "flex aspect-square w-10 items-center justify-center rounded-xl bg-zinc-600 px-0 dark:bg-slate-200/75",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
