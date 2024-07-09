import { useState } from "react";
import { CheckCircle2, CircleDashed } from "lucide-react";

import { cn } from "@/lib/utils";

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function StatusButton() {
  const [status, setStatus] = useState<"loading" | "Add to cart" | "Added to cart">();
  const isEnabled = !status || status === "Add to cart";

  const changeStatus = async () => {
    if (!isEnabled) {
      return;
    }

    await wait(100);
    setStatus("loading");
    await wait(3000);
    setStatus("Added to cart");
    await wait(3000);
    setStatus("Add to cart");
  };

  return (
    <button
      onClick={changeStatus}
      disabled={!isEnabled}
      className="group relative h-11 min-w-52 overflow-hidden rounded-full bg-blue-700 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-800"
    >
      <span
        // Remount the component so that the animation can be restarted
        key={status}
        className={cn(
          "flex items-center justify-center gap-1 duration-100 ease-minor-spring animate-in fill-mode-forwards",
          {
            // Only animate after the status is set after user clicks
            "fade-in slide-in-from-top-full": !!status,
          },
        )}
      >
        {status === "Added to cart" && (
          <CheckCircle2 className="h-4 w-4 fill-white stroke-blue-700 duration-300 ease-minor-spring animate-in zoom-in-0 fill-mode-forwards group-hover:stroke-blue-800" />
        )}

        {status == "loading" ? (
          <CircleDashed className="h-3 w-3 animate-spin" />
        ) : (
          status ?? "Add to cart"
        )}
      </span>
    </button>
  );
}
