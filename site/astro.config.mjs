import { defineConfig } from 'astro/config';

// `site` is used for canonical URLs, OG tags, and the static sitemap.
// [VERIFY after first deploy] — update if the production domain differs.
export default defineConfig({
  site: 'https://kamibench.vercel.app',
  output: 'static',
});
