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
1. If you see something that has been imported but not mentioned in the documentation, then it is a dependency that you need to install. If it starts with @/ then it is Animata's component else it is an external dependency. In such a case, you can submit a PR to update the documentation.
2. If something is not working, then the docs are probably missing the tailwind.config.js updates. You can look for the entries that have been added to the tailwind.config.js in Animata's source code. You can create an issue or submit a PR to update the documentation.

## Contributing

Contributions to Animata are always welcome!

- 📥 Pull requests and 🌟 Stars are always welcome.
- Read our [contributing guide](https://animata.design/docs/contributing) to get started,
  or find us on [Discord](https://discord.gg/STYEh3UW), we will take the time to guide you.

## Authors

<section id="#Authors"
  <a href="https://github.com/hari"><img alt="Hari" src="https://github.com/user-attachments/assets/d74cd9ea-be3c-4ab8-8611-ecd55c9a2e9a" width="64"/></a>
  <a href="https://github.com/AashishKatila"><img alt="Aashish Katila" src="https://github.com/user-attachments/assets/e7283234-932c-4e22-80c5-b043267e0190" width="64"/></a>
  <a href="https://github.com/GrgSumin"><img alt="Grg Sumin" src="https://github.com/user-attachments/assets/cf16eef7-964e-4891-a7d1-e9b300d2f22a" width="64"/></a>
  <a href="https://github.com/morphhyy"><img alt="Bibek" src="https://github.com/user-attachments/assets/dfa2e4e2-5e5d-4911-b359-dc7d7ed9d910" width="64"/></a>
  <a href="https://github.com/llaxmi"><img alt="Laxmi Lamichhane" src="https://github.com/user-attachments/assets/5bf4271b-dc72-4a93-9a30-ea11f69b9027" width="64"/></a>
  <a href="https://github.com/AadarshBaral"><img alt="Aadarsh Baral" src="https://github.com/user-attachments/assets/ef1a6751-5807-45d9-803a-e10d983133b9" width="64"/></a>
  <a href="https://github.com/acharya-sanjaya"><img alt="Sanjaya Acharya" src="https://github.com/user-attachments/assets/5bf55021-7237-4482-a5d2-2e37146d6194" width="64"/></a>
  <a href="https://github.com/chiranjibi10"><img alt="chirubhai" src="https://github.com/user-attachments/assets/e4c455eb-ee7d-4b99-8e19-2813d8fbb70c" width="64"/></a>
  <a href="https://github.com/sudhashrestha"><img alt="Sudha Shrestha" src="https://github.com/user-attachments/assets/92207607-483b-4e06-8df0-0356cb8456df" width="64"/></a>
  <a href="https://github.com/Yug-Mistry"><img alt="Yug-Mistry" src="https://github.com/user-attachments/assets/53ebd4e7-f273-41b0-8589-c7a8adb837a9" width="64"/></a>
  <a href="https://github.com/Abishkardhenga"><img alt="Abishkar Dhenga" src="https://github.com/user-attachments/assets/0b06bc6d-ee69-4a9f-a2f3-ea5e726172e8" width="64"/></a>
  <a href="https://github.com/raghav3615"><img alt="Raghav" src="https://github.com/user-attachments/assets/f6c0592e-57cf-42af-8088-08890ede90a8" width="64"/></a>
  <a href="https://github.com/SatyamVyas04"><img alt="Satyam Vyas" src="https://github.com/user-attachments/assets/48036bbb-35e7-4ddd-89c5-46c79739b73e" width="64"/></a>
  <a href="https://github.com/preronagit"><img alt="Prerona" src="https://github.com/user-attachments/assets/23a916b7-5d37-47ce-a460-5a61d2eea625" width="64"/></a>
  <a href="https://github.com/ozantekin"><img alt="Ozan Tekin" src="https://github.com/user-attachments/assets/eeeb3a3c-4aee-419f-a8c5-9c8523042074" width="64"/></a>
  <a href="https://github.com/teamkuka"><img alt="teamkuka" src="https://github.com/user-attachments/assets/a288bf3e-11cd-464a-86f7-4af050f23476" width="64"/></a>
  <a href="https://github.com/Humboorgir"><img alt="Iliya.Faz" src="https://github.com/user-attachments/assets/9d5bb095-13a9-4c3e-8416-194ab39e717d" width="64"/></a>
  <a href="https://github.com/DoffuXx"><img alt="Ali" src="https://github.com/user-attachments/assets/8ffcc532-40bb-466f-8e61-32321ad00844" width="64"/></a>
</section>

## License

This project licensed under the MIT License. see the [LICENSE](https://github.com/codse/animata/blob/main/LICENSE.md) file for details.
