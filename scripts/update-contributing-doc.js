import fs from "fs";

function createContributingDoc() {
  const source = fs.readFileSync("CONTRIBUTING.md");
  const destination = "content/docs/contributing/index.mdx";

  const code = `
---
title: Contributing
date: ${new Date().toISOString().split("T")[0]}
description: Learn how to contribute to Animata.
---
${source}
`.trim();

  fs.writeFileSync(destination, code, {
    flag: "w",
  });
}

createContributingDoc();
