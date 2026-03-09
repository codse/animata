import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react";
import { type ReactNode, useEffect, useState } from "react";
import { themes } from "storybook/theming";

import "../styles/globals.css";
import "../styles/storybook.css";

const isEmbedded = typeof window !== "undefined" && window.location.href.includes("docs-view");
const isDarkFromUrl = typeof window !== "undefined" && window.location.href.includes("theme:dark");

// Add embedded class to body
if (isEmbedded && typeof document !== "undefined") {
  document.body.classList.add("embedded");
  if (isDarkFromUrl) {
    document.body.classList.add("dark");
  }
}

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(isDarkFromUrl);

  useEffect(() => {
    // Listen for theme changes from parent via postMessage
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "animata-set-theme") {
        const dark = event.data.theme === "dark";
        setIsDark(dark);
        document.body.classList.toggle("dark", dark);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (!isEmbedded) return;
    const sendHeight = () => {
      const el =
        document.querySelector(".sbdocs-wrapper") ?? document.querySelector("#storybook-root");
      if (!el) return;
      window.parent.postMessage({ type: "animata-set-height", height: el.scrollHeight }, "*");
    };
    sendHeight();
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={isDark ? "dark" : ""} style={{ padding: isEmbedded ? 0 : "4rem 20px" }}>
      {children}
    </div>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: {
    theme: isDarkFromUrl ? "dark" : "light",
  },
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
    docs: {
      theme: isDarkFromUrl ? themes.dark : themes.light,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
};

export default preview;
