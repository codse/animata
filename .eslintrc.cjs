module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    quotes: ["error", "double"],
    "@typescript-eslint/no-explicit-any": "warn",
    "react/no-unknown-property": ["error", { ignore: ["vaul-drawer-wrapper"] }],
  },
};
