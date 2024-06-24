module.exports = {
  semi: true,
  singleQuote: false,
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: [
    "clsx",
    "cn"
  ]
};