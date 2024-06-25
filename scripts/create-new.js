import chalk from "chalk";
import fs from "fs";
import camelCase from "lodash.camelcase";
import kebabCase from "lodash.kebabcase";
import startCase from "lodash.startcase";
import prompts from "prompts";

const existingFolders = fs.readdirSync("animata");

const schema = [
  {
    message: "Enter a name for the new component",
    type: "text",
    required: true,
    name: "name",
    validate: (value) => {
      if (!value?.trim()) {
        return "Name cannot be empty";
      }

      return true;
    },
  },
  {
    message: "Enter the description for the new component",
    type: "text",
    required: true,
    name: "description",
  },
  {
    message: "Select the type of component you want to create",
    type: "select",
    required: true,
    choices: [
      ...existingFolders.map((folder) => ({
        title: folder,
        value: folder,
      })),
      {
        title: `${chalk.bold(chalk.green("+"))} Create a new type`,
        value: "custom",
      },
    ],
    name: "type",
  },
];

const createCopy = (source, destination, variables) => {
  const content = fs.readFileSync(`templates/${source}`, {
    encoding: "utf-8",
  });

  const compiled = content.replace(/{{([^{}]*)}}/g, (_, key) => variables[key.trim()]);

  fs.writeFileSync(destination, compiled, {
    flag: "wx",
  });

  console.log(chalk.green(`Created ${destination}`));
};

(async () => {
  const basic = await prompts(schema);

  let type = basic.type;
  if (basic.type === "custom") {
    const response = await prompts({
      message: "Enter the name for the new type",
      type: "text",
      required: true,
      name: "newType",
      validate: (value) => {
        if (!value.trim()) {
          return "Type cannot be empty";
        }

        if (existingFolders.includes(value.trim().toLowerCase())) {
          return `Type "${value}" already exists`;
        }
        return true;
      },
    });
    type = response.newType;
  }

  const title = startCase(String(basic.name).trim().toLowerCase());

  if (!basic.name || !basic.description || !type) {
    console.log(chalk.red("Invalid input"));
    return;
  }

  const variables = {
    Title: title,
    Description: String(basic.description)?.trim(),
    TypePath: kebabCase(String(type).trim().toLowerCase()),
    Filename: kebabCase(title),
    get PlaceholderComponent() {
      const name = camelCase(this.Title);
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    get StoryTitle() {
      const typePath = startCase(this.TypePath);
      return `${typePath}/${this.Title}`;
    },
    get StoryPath() {
      return `${this.TypePath}-${this.Filename}`;
    },
  };

  let shouldRegister = false;
  if (!fs.existsSync(`animata/${variables.TypePath}`)) {
    fs.mkdirSync(`animata/${variables.TypePath}`);
    shouldRegister = true;
  }

  if (!fs.existsSync(`content/docs/${variables.TypePath}`)) {
    fs.mkdirSync(`content/docs/${variables.TypePath}`);
  }

  if (fs.existsSync(`animata/${variables.TypePath}/${variables.Filename}.tsx`)) {
    console.log(
      chalk.red(`File "animata/${variables.TypePath}/${variables.Filename}.tsx" already exists.`),
    );
    return;
  }

  createCopy("doc", `content/docs/${variables.TypePath}/${variables.Filename}.mdx`, variables);

  createCopy("component", `animata/${variables.TypePath}/${variables.Filename}.tsx`, variables);

  createCopy("story", `animata/${variables.TypePath}/${variables.Filename}.stories.tsx`, variables);

  if (shouldRegister) {
    console.log("\n\nYou need to register the new type in the following file:\n");
    console.log(
      `${chalk.green("config/docs.ts")} - Add the new entry in ${chalk.blue(chalk.italic("docsConfig.sidebarNav"))}`,
    );
  }
})();
