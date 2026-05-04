# Output & Preview

This page explains where build output and previews live, and how to view them locally.

## Run the dev environment

Start the development servers (Next, Storybook, and Velite watcher):

```bash
yarn dev
```

- Next runs the app locally (default http://localhost:3000).
- Storybook runs on port 6006 by default and is used for component previews.

## Build output

To build the site and preview artifacts:

```bash
yarn build
```

- Next build artifacts live in the `.next` folder.
- Storybook static build is created into `public/preview` (used as a static preview of components).

## Where to look for "output"

- Production-ready app: `.next` (served by `next start`).
- Component preview: `public/preview` (static Storybook build).
- Any bundled or generated files produced by project scripts will be written to `public/` or the workspace root depending on the script.

## Copying component output into your project

Many components in this repo are designed to be copy-pasted into consumer projects. When you open a component in Storybook or the live site, you can:

- Inspect the component source in `animata/` to copy the markup and styles.
- Use the Storybook preview under `public/preview` (after `yarn build`) to see static examples.

## Quick checks

- Dev server: `yarn dev` → visit `http://localhost:3000`.
- Storybook dev: `yarn storybook` → visit `http://localhost:6006`.
- Static Storybook preview: `yarn storybook:build` then open `public/preview/index.html`.

---

If you'd like, I can also add a short README snippet under `README.md` linking to this page, or wire this file into the docs navigation for the site.
