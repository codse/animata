import * as React from "react";

export function useCopyReset(delay = 2000) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (!hasCopied) {
      return;
    }

    const timer = setTimeout(() => {
      setHasCopied(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasCopied, delay]);

  return [hasCopied, setHasCopied] as const;
}
