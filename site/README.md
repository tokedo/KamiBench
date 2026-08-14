# KamiBench website

The project website: a landing page, an experiment registry rendered from
[`../experiments/*.md`](../experiments/), and a blog rendered from
[`../blog/*.md`](../blog/). Static [Astro](https://astro.build) site,
no client-side JavaScript beyond the Google Analytics tag (production builds only).

## Local development

Requires Node 22+ and [pnpm](https://pnpm.io).

```sh
cd site
pnpm install       # install dependencies
pnpm dev           # dev server at http://localhost:4321
pnpm build         # production build into site/dist/
pnpm preview       # serve the production build locally
```

The pages read their sources at build time — `../README.md` (landing-page copy),
`../experiments/*.md` (the registry), and `../blog/*.md` (posts; `blog/drafts/`
is not built) — so the site is regenerated from the current sources on every
build, with no manual sync step. The paper draft (`../paper/paper.md`) is
deliberately not built or linked — it stays in-repo while the formal
publication is prepared offline; `/paper` redirects to the blog.

## Static assets

`public/og.png` (the social-share card) is rendered from `og/og.html` — the regeneration
command is in a comment at the top of that file. `public/favicon.png` and
`public/apple-touch-icon.png` are rasterized from `public/favicon.svg`.

## Deploying on Vercel

1. Vercel dashboard → **Add New… → Project** → import the `KamiBench` GitHub repo.
2. Set **Root Directory** to `site`. Leave "Include files outside the root directory"
   enabled (default) — the build reads `../README.md`, `../experiments/`, and
   `../blog/`.
3. Framework preset auto-detects as **Astro**; keep the default build settings.
4. **Deploy.**

Once connected, every push to `main` deploys automatically (pushes to other branches
get preview deployments). Production domain: `https://kamibench.ai` — add it under
Project → Settings → Domains. If it ever changes, update `site` in `astro.config.mjs`,
`public/sitemap.xml`, and `public/robots.txt`.
