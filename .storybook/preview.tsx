import { themes } from "@storybook/theming";

import { Canvas, Controls, Stories, Title } from "@storybook/blocks";
import { Preview } from "@storybook/react";
import React, { useEffect } from "react";

import { MDXProvider } from "@mdx-js/react";
import { DocsContainer } from "@storybook/blocks";
import { baseComponents } from "../components/mdx-base-components";

import { ReloadButton } from "../components/reload-button";
import { useMutationObserver } from "../hooks/use-mutation-observer";
import "../styles/globals.css";
import "../styles/storybook.css";

import { addons } from "@storybook/manager-api";
import { useDarkMode } from "storybook-dark-mode";

addons.setConfig({
  theme: themes.dark,
});

const useThemeProps = (props) => {
  const isDark = useDarkMode();
  const forced = (() => {
    const sp = new URLSearchParams(location.search);
    if (!sp.get("globals")?.includes("theme")) {
      return null;
    }

    return sp.get("globals")?.includes("light") ? "theme:light" : "theme:dark";
  })();

  const currentProps = { ...props };
  if (!forced) {
    currentProps.theme = isDark ? themes.dark : themes.light;
    currentProps.isDark = isDark;
  } else {
    currentProps.theme = forced === "theme:dark" ? themes.dark : themes.light;
    currentProps.isDark = forced === "theme:dark";
  }

  return currentProps;
};

const MdxContainer = (props: any) => {
  const currentProps = useThemeProps(props);
  return (
    <MDXProvider components={baseComponents}>
      <DocsContainer {...currentProps} />
    </MDXProvider>
  );
};

const isEmbedded = window.location.href.includes("site:docs");

const Wrapper = ({ children }) => {
  const nodeRef = React.useRef(isEmbedded ? document.body : null);
  const theme = useThemeProps({}).isDark ? "dark" : "";

  const callbackRef = React.useRef(() => {
    const height = document.querySelector(".embedded")?.clientHeight ?? 0;
    const padding = 0;
    window.parent.postMessage(
      {
        type: "animata-set-height",
        height: height + padding,
      },
      "*",
    );
  });

  useMutationObserver(nodeRef, callbackRef.current);

  useEffect(() => {
    if (!isEmbedded) {
      return;
    }
    callbackRef.current();
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

const CustomCanvas = () => {
  const [key, setKey] = React.useState(0);
  return (
    <div className="relative">
      <Canvas key={`render-${key}`} />
      <ReloadButton
        key={`button-${key}`}
        className="absolute right-4 top-4"
        onClick={() => setKey((k) => k + 1)}
      />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark, appBg: "black" },
      light: { ...themes.normal, appBg: "light" },
    },
    docs: {
      container: MdxContainer,
      page: () => {
        return (
          <Wrapper>
            {!isEmbedded && <Title />}
            <CustomCanvas />
            <Controls />
            <Stories includePrimary={false} title="Other examples" />
          </Wrapper>
        );
      },
    },
  },
};

export default preview;
