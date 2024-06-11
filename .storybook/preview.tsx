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

import { withThemeByClassName } from "@storybook/addon-themes";
import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: themes.dark,
});

const MdxContainer = (props) => {
  return (
    <MDXProvider components={baseComponents}>
      <DocsContainer {...props} />
    </MDXProvider>
  );
};

const isEmbedded = window.location.href.includes("site:docs");

const Wrapper = ({ children }) => {
  const nodeRef = React.useRef(isEmbedded ? document.body : null);
  const callbackRef = React.useRef(() => {
    const height = document.querySelector(".embedded")?.clientHeight ?? 0;
    const padding = 32;
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
      className={isEmbedded ? "embedded" : ""}
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
      light: { ...themes.normal, appBg: "red" },
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

  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
