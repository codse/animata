<section id="logo" align="center">
  <a href="https://animata.design/">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/8d3da830-d1b0-4327-8695-edcea3534743">
        <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/44be7a44-2e1f-4b90-a238-5cd10a376748">
        <img alt="Animata Logo" src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png" width="512">
    </picture>
  </a>
  <section>
    <a href="https://discord.gg/STYEh3UW">
      <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" />
    </a>
  </section>
  <p>Handcrafted ✍️ interaction animations and visual effects sourced from across the internet 🛜, ready for you to copy and paste into your project seamlessly.</p>
  <section id="padges" margin="50">
    <h3>Built with</h3>
    <a href="https://nextjs.org/?ref=animata.design">
      <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge"/>
    </a>
    <a href="https://reactjs.org/?ref=animata.design">
      <img alt="React.js" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    </a>
    <a href="https://tailwindcss.com/?ref=animata.design">
      <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-0b1120?style=for-the-badge&logo=tailwind-css&logoColor=38bdf8"/>
    </a>
    <a href="https://www.framer.com/motion/?ref=animata.design">
      <img alt="Framer Motion" src="https://img.shields.io/badge/Framer-1a1a1a?style=for-the-badge&logo=framer&logoColor=white"/>
    </a>
    <a href="https://www.typescriptlang.org/?ref=animata.design">
      <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    </a>
    <a href="https://vercel.com/?ref=animata.design">
      <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
    </a>
  </section>
</section>
<br>

### Table of Contents
1. [Introduction](#introduction)
   - [What is Animata?](#what-is-animata)
   - [What is not Animata?](#what-is-not-animata)
2. [Getting Started](#getting-started)
   - [Requirements](#requirements)
   - [Setup Instructions](#setup-instructions)
     - [Folder Structure (Recommended)](#folder-structure-recommended)
     - [Install Dependencies](#install-dependencies)
     - [Create Utility Functions](#create-utility-functions)
3. [Contributing](#contributing)
4. [Authors](#authors)
5. [License](#license)
   
## Introduction

### What is Animata?
Welcome to Animata, a free and open-source collection of hand-crafted animations, effects, and interactions that you can seamlessly integrate into your project with a simple copy and paste. The animations are built using TailwindCSS and React.js, so they can be easily customized to fit your project's design.

### What is not Animata?
Animata is not a full-fledged UI library like Material-UI or Chakra-UI. It is a collection of animations and effects that you can use to enhance your project's design. You can also use Animata alongside other UI libraries or design systems (you will need to set up TailwindCSS for this).

## Getting Started
You don't need to install it as a dependency instead you can simply copy and paste the code, as shadcn/ui, into your project. However, you still need to install the other dependency that the code needs.

### Requirements
- [TailwindCSS](https://tailwindcss.com/docs/installation): For styling.
- [Framer Motion](https://www.framer.com/motion/) (Optional): For complex animations.
- [Lucide Icons](https://lucide.dev/) or [Radix Icons](https://www.radix-ui.com/icons) (Optional): Use for icons, or replace with any other icon library or SVGs.

### Setup Instructions
#### Folder Structure (Recommended)

```bash
/
  /components
  /ui
```

where `/` is the root of your project, `/components` is where you keep your components and the project has been set up using paths in the `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
#### Install Dependencies
Install the required dependencies, if you haven't already:

```sh
npm install tailwind-merge clsx lucide-react tailwindcss-animate
```

Add `tailwindcss-animate` to plugins in `tailwind.config.js` file:

```js
module.exports = {
  plugins: [require("tailwindcss-animate")],
};
```

### Create Utility Functions
Create utils.ts file in the libs folder and paste the following code:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### NOTE
1. If you see something that has been imported but not mentioned in the documentation, then it is a dependency you need to install. If it starts with @/ then it is Animata's component else it is an external dependency. In such a case, you can submit a PR to update the documentation.
2. If something is not working, the docs probably miss the tailwind.config.js updates. You can look for the entries that have been added to the tailwind.config.js in Animata's source code. You can create an issue or submit a PR to update the documentation.

## Contributing

Contributions to Animata are always welcome!

- 📥 Pull requests and 🌟 Stars are always welcome.
- Read our [contributing guide](https://animata.design/docs/contributing) to get started,
  or find us on [Discord](https://discord.gg/STYEh3UW), we will take the time to guide you.

## Authors
Heartfelt gratitude goes to each of you for your amazing contributions to this project. Your hard work, creativity, and dedication have been nothing short of incredible. Whether it was coding, debugging, testing, or sharing ideas, every effort made a significant difference.

<section id="#Authors"
  <a href="https://github.com/codse/animata/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=codse/animata&max=100"/>
  </a>
</section>

## License

This project is licensed under the MIT License. see the [LICENSE](https://github.com/codse/animata/blob/main/LICENSE.md) file for details.
