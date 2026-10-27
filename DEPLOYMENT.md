# Cloudflare Workers deployment

Use Node.js 22 or newer and the pnpm version in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm exec wrangler deploy --dry-run
pnpm exec wrangler dev
# After local validation:
pnpm exec wrangler deploy
```

The Next.js static export remains in `out/`, including the prebuilt Storybook previews. Workers serves these files directly, applies `public/_headers`, and serves the exported 404 page for unknown URLs. No SSR adapter or server entry point is needed.

`pnpm deploy:prod` builds and deploys production. `pnpm deploy:preview` builds and creates a Worker Preview for the current Git branch; `pnpm exec wrangler preview --name pr-123` targets a specific Preview after a build. The pull request workflow uses `pr-<number>` and the Wrangler action's `deployment-url` output. Remove a closed Preview with `pnpm exec wrangler preview delete --name pr-123 --skip-confirmation`.

The v3 workflow deploys its export as the separate `animata-v3` Worker. It passes `--assets out` and its compatibility date explicitly, so the workflow can be backported without the root Wrangler configuration. Keep its Wrangler 4 pin and Node.js 22 setup when backporting; merging the workflow into `main` does not update the `v3` branch.

For the cutover, create the Workers in the intended account, grant the deployment token Workers Scripts Edit, keep the `NEXT_PUBLIC_*` build variables in the GitHub `preview-deployment` and `v3-deployment` environments, where the workflows read `${{ vars.* }}`, and validate the Worker and Preview URLs. Attach the existing custom domain to the production Worker once ready. Disable automatic Pages deployments after validation and remove Pages only after traffic has moved. Workers URLs replace `pages.dev` deployment aliases; any external allowlists or integrations need updating separately.

Wrangler 4 defaults R2 object operations to local storage; both OG upload scripts specify `--remote` to retain their production R2 behaviour.

References: [Wrangler v3 to v4](https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/) and [Pages to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).
