import type { Preview } from "@storybook/react";
import type React from "react";
import { useEffect } from "react";

import "../styles/globals.css";

const isEmbedded = typeof window !== "undefined" && window.location.href.includes("site:docs");

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const globals = params?.get("globals") ?? "";
  const isDark =
    globals.includes("theme:dark") ||
    (!globals.includes("theme:light") && globals.includes("dark"));
  const theme = isDark ? "dark" : "";

  useEffect(() => {
    if (!isEmbedded) return;
    const sendHeight = () => {
      const el = document.querySelector(".embedded");
      if (!el) return;
      window.parent.postMessage({ type: "animata-set-height", height: el.clientHeight }, "*");
    };
    sendHeight();
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={isEmbedded ? `embedded ${theme}`.trim() : ""}
      style={{ padding: isEmbedded ? 0 : "4rem 20px" }}
    >
      {children}
    </div>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
