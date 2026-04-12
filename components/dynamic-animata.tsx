"use client";

import { useEffect, useState } from "react";

export function AnimataRenderer({
  subpath,
  ...props
}: { subpath: string } & Record<string, unknown>) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import(`@/animata/${subpath}`)
      .then((mod) => setComponent(() => mod.default))
      .catch((err) => console.error(`Failed to load @/animata/${subpath}:`, err));
  }, [subpath]);

  if (!Component) return null;
  return <Component {...props} />;
}
