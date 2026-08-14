// Build-time renderer for ../STACK.md (single source of truth — the /stack page
// regenerates from the repo-root doc on every build, no manual sync step).
// Same conventions as the registry renderer (experiments.ts): the H1 and the
// ONELINER marker block are stripped (the page template presents them as a
// styled header), h2 headings get anchor ids, `figures/*.svg` images are
// inlined so their embedded links stay clickable and the site theme can
// restyle them via CSS (.arch-figure), repo-relative links are rewritten to
// site routes, and tables are wrapped for horizontal scroll.
import { marked } from 'marked';
import { slugify, wrapTables } from './markdown';
import stackSource from '../../../STACK.md?raw';

const figures = import.meta.glob('../../../figures/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface RenderedStack {
  html: string;
  /** Plain-text summary from the ONELINER block (meta/OG description). */
  oneliner: string;
}

export function renderStack(): RenderedStack {
  const match = stackSource.match(
    /<!-- ONELINER:START -->([\s\S]*?)<!-- ONELINER:END -->/
  );
  if (!match) {
    throw new Error(
      'STACK.md is missing the <!-- ONELINER:START --> / <!-- ONELINER:END --> markers.'
    );
  }
  const oneliner = match[1]!.replace(/\s+/g, ' ').trim();

  const body = stackSource
    .replace(/^# .*\n/, '')
    .replace(/<!-- ONELINER:START -->[\s\S]*?<!-- ONELINER:END -->\n?/, '')
    .trim();

  let html = marked.parse(body, { gfm: true }) as string;

  // Heading anchor ids, matching the paper page's convention (and GitHub's
  // anchors for the same doc, so in-page links work in both renders).
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = slugify(inner.replace(/<[^>]+>/g, ''));
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Repo-relative links (correct for GitHub's render) → site routes.
  html = html
    .replace(/href="experiments\/?"/g, 'href="/experiments"')
    .replace(/href="blog\/\d{4}-\d{2}-\d{2}-([A-Za-z0-9-]+)\.md"/g, 'href="/blog/$1"');

  // Inline `figures/*.svg` images (same idiom as the experiment figures).
  html = html.replace(
    /(?:<p>)?<img src="figures\/([^"]+\.svg)"(?:\s+alt="([^"]*)")?[^>]*>(?:<\/p>)?/g,
    (m, name: string, alt: string | undefined) => {
      const svg = figures[`../../../figures/${name}`];
      if (!svg) {
        console.warn(`[stack] figure not found: figures/${name}`);
        return m;
      }
      const label = alt ? ` aria-label="${alt}"` : '';
      return `<figure class="arch-figure"${label}>${svg}</figure>`;
    }
  );

  html = wrapTables(html);
  return { html, oneliner };
}
