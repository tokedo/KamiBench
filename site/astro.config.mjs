import { defineConfig } from 'astro/config';

// `site` is used for canonical URLs, OG tags, and the static sitemap.
export default defineConfig({
  site: 'https://kamibench.ai',
  output: 'static',
  redirects: {
    // The paper came off the site 2026-08-14 (blog-first restructure); the URL
    // had been shared publicly, so it forwards to its content successor. On
    // static output this emits a meta-refresh page; vercel.json adds a real 308
    // on the deployed host.
    '/paper': '/blog/why-kamibench-for-continual-learning',
  },
});
