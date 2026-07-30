import type { SplitRevealProgressReporter } from "./types";

export function preloadImages(urls: string[], onProgress: SplitRevealProgressReporter) {
  const total = urls.length;

  if (total === 0) {
    onProgress({ loaded: 0, total: 0 });
    return Promise.resolve();
  }

  let loaded = 0;

  const preloadOne = (url: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      let settled = false;

      const settle = () => {
        if (settled) {
          return;
        }
        settled = true;
        loaded += 1;
        onProgress({ loaded, total });
        resolve();
      };

      const ready = () => {
        if (typeof img.decode === "function") {
          img.decode().then(settle).catch(settle);
          return;
        }
        settle();
      };

      img.onload = ready;
      img.onerror = settle;
      img.decoding = "async";
      img.src = url;

      if (img.complete && img.naturalWidth > 0) {
        ready();
      }
    });

  return Promise.all(urls.map((url) => preloadOne(url))).then(() => undefined);
}
