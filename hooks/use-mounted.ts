import { useSyncExternalStore } from "react";

export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
