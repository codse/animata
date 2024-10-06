import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  popular?: boolean;
}

interface PricingProps {
  plans: Plan[];
  onPlanSelect?: (plan: string) => void;
  onCycleChange?: (cycle: "Monthly" | "Yearly") => void;
  width?: "sm" | "md" | "lg" | "xl";
  outerRadius?: "normal" | "rounded" | "moreRounded";
  padding?: "small" | "medium" | "large";
}

const widthClasses = {
  sm: "w-full sm:w-[300px]",
  md: "w-full sm:w-[300px] md:w-[500px]",
  lg: "w-full sm:w-[300px] md:w-[500px] lg:w-[768px]",
  xl: "w-full sm:w-[300px] md:w-[500px] lg:w-[768px] xl:w-[1024px]",
};

const outerRadiusClasses = {
  normal: "rounded-[16px]",
  rounded: "rounded-[24px]",
  moreRounded: "rounded-[32px]",
};

const paddingClasses = {
  small: "p-2",
  medium: "p-3",
  large: "p-4",
};

const innerRadiusClasses = {
  normal: "rounded-xl",
  rounded: "rounded-2xl",
  moreRounded: "rounded-3xl",
};

export default function Pricing({
  plans,
  width = "lg",
  outerRadius = "rounded",
  padding = "medium",
}: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">("Monthly");

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleCycleChange = (cycle: "Monthly" | "Yearly") => {
    setBillingCycle(cycle);
  };

  return (
    <div
      className={cn(
        "mx-auto bg-white shadow-lg",
        widthClasses[width],
        outerRadiusClasses[outerRadius],
        paddingClasses[padding],
      )}
    >
      <div className="mb-3 flex justify-center">
        <div className="relative w-3/4 rounded-full bg-zinc-300 p-1 pb-2">
          <motion.div
            className="absolute h-[38px] w-[calc(50%-6px)] rounded-full bg-zinc-100"
            layoutId="cycleBackground"
            initial={billingCycle === "Monthly" ? { x: 2 } : { x: "calc(100% + 2px)" }}
            animate={billingCycle === "Monthly" ? { x: 2 } : { x: "calc(100% + 2px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="relative z-10 flex">
            {["Monthly", "Yearly"].map((cycle) => (
              <motion.button
                key={cycle}
                className={cn(
                  "z-20 w-1/2 rounded-full py-1 text-lg font-extrabold transition-colors duration-200",
                  billingCycle === cycle ? "text-zinc-800" : "text-zinc-500",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCycleChange(cycle as "Monthly" | "Yearly");
                }}
                whileTap={{ scale: 0.95 }}
              >
                {cycle}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {plans.map((plan) => (
        <motion.div
          key={plan.name}
          className={cn(
            "relative mb-3 cursor-pointer border-2 border-zinc-200 p-4",
            innerRadiusClasses[outerRadius],
            selectedPlan === plan.name ? "bg-zinc-100" : "bg-white",
          )}
          onClick={() => handlePlanSelect(plan.name)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          layout
        >
          <AnimatePresence>
            {selectedPlan === plan.name && (
              <motion.div
                className={cn(
                  "absolute inset-0 border-4 border-zinc-900",
                  innerRadiusClasses[outerRadius],
                )}
                layoutId="selectedPlanBorder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="font-bold">{plan.name}</span>
              {plan.popular && (
                <span className="ml-2 rounded bg-yellow-300 px-2 py-1 text-xs">Popular</span>
              )}
            </div>
            <motion.div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2",
                selectedPlan === plan.name ? "border-zinc-900 bg-zinc-900" : "border-zinc-300",
              )}
              animate={{ scale: selectedPlan === plan.name ? 1 : 0.8 }}
            >
              {selectedPlan === plan.name && (
                <motion.div
                  className="h-3 w-3 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.div>
          </div>
          <div className="relative z-10 mt-2">
            <AnimatedPrice
              monthlyPrice={plan.monthlyPrice}
              yearlyPrice={plan.yearlyPrice}
              billingCycle={billingCycle}
            />
          </div>
        </motion.div>
      ))}

      <motion.button
        className={cn("w-full bg-black py-3 font-bold text-white", innerRadiusClasses[outerRadius])}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </div>
  );
}
interface AnimatedPriceProps {
  monthlyPrice: string;
  yearlyPrice: string;
  billingCycle: "Monthly" | "Yearly";
}

function AnimatedPrice({
  monthlyPrice,
  yearlyPrice,
  billingCycle,
}: AnimatedPriceProps): React.JSX.Element {
  const [price, setPrice] = useState(monthlyPrice);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const targetPrice = billingCycle === "Monthly" ? monthlyPrice : yearlyPrice;
    const startValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const endValue = parseFloat(targetPrice.replace(/[^0-9.-]+/g, ""));
    const duration = 50; // Animation duration in milliseconds
    const startTime = Date.now();

    const animatePrice = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;

      setPrice(`$${currentValue.toFixed(2)}`);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animatePrice);
      } else {
        setPrice(targetPrice);
      }
    };

    animatePrice();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [price, billingCycle, monthlyPrice, yearlyPrice]);

  return (
    <div>
      <span className="text-2xl font-bold">{price}</span>
      <span className="text-zinc-500">/{billingCycle.toLowerCase().slice(0, -2)}</span>
    </div>
  );
}
