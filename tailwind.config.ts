import type { Config } from "tailwindcss";

// Minimal config for tooling compatibility (prettier-plugin-tailwindcss)
// Actual configuration is in styles/globals.css using Tailwind v4's @theme directive
const config: Config = {
  content: ["./animata/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
};

export default config;
