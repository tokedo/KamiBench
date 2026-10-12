// Build-time renderer for the repo-root docs that each become one page:
// ../STACK.md → /stack and ../QUICKSTART.md → /quick-start (single source of
// truth — a page regenerates from its doc on every build, no manual sync step).
// Same conventions as the registry renderer (experiments.ts): the H1 and the
// ONELINER marker block are stripped (the page template presents them as a
// styled header), h2 headings get anchor ids, `figures/*.svg` images are
// inlined so their embedded links stay clickable and the site theme can
// restyle them via CSS (.arch-figure), repo-relative links are rewritten to
// site routes, and tables are wrapped for horizontal scroll.
import { marked } from 'marked';
import { slugify, wrapTables } from './markdown';
import stackSource from '../../../STACK.md?raw';
import quickStartSource from '../../../QUICKSTART.md?raw';

const figures = import.meta.glob('../../../figures/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface RenderedDoc {
  html: string;
  /** Plain-text summary from the ONELINER block (meta/OG description). */
  oneliner: string;
}

function renderDoc(source: string, name: string): RenderedDoc {
  const match = source.match(/<!-- ONELINER:START -->([\s\S]*?)<!-- ONELINER:END -->/);
  if (!match) {
    throw new Error(
      `${name} is missing the <!-- ONELINER:START --> / <!-- ONELINER:END --> markers.`
    );
  }
  const oneliner = match[1]!.replace(/\s+/g, ' ').trim();

  const body = source
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
    .replace(/href="blog\/\d{4}-\d{2}-\d{2}-([A-Za-z0-9-]+)\.md"/g, 'href="/blog/$1"')
    .replace(/href="STACK\.md(#[^"]*)?"/g, 'href="/stack$1"')
    .replace(/href="QUICKSTART\.md(#[^"]*)?"/g, 'href="/quick-start$1"');

  // Inline `figures/*.svg` images (same idiom as the experiment figures).
  html = html.replace(
    /(?:<p>)?<img src="figures\/([^"]+\.svg)"(?:\s+alt="([^"]*)")?[^>]*>(?:<\/p>)?/g,
    (m, imgName: string, alt: string | undefined) => {
      const svg = figures[`../../../figures/${imgName}`];
      if (!svg) {
        console.warn(`[${name}] figure not found: figures/${imgName}`);
        return m;
      }
      const label = alt ? ` aria-label="${alt}"` : '';
      return `<figure class="arch-figure"${label}>${svg}</figure>`;
    }
  );

  html = wrapTables(html);
  return { html, oneliner };
}

export function renderStack(): RenderedDoc {
  return renderDoc(stackSource, 'STACK.md');
}

export function renderQuickStart(): RenderedDoc {
  return renderDoc(quickStartSource, 'QUICKSTART.md');
}
