// Build-time loader/renderer for the blog (single source of truth: ../blog/*.md
// in the repo root — same convention as the experiment registry, see
// experiments.ts). Filenames carry the publication date and the site slug:
// `YYYY-MM-DD-slug.md` → /blog/slug. Drafts live in ../blog/drafts/ and are
// not globbed — nothing there reaches the build.
//
// Marker blocks (same convention as README.md / the registry):
//   <!-- ONELINER:START/END -->   one-paragraph summary (index cards, OG, RSS)
//
// Evidence-tier labels: posts mark claim classes inline with **[REGISTERED]**
// (traces to a registered comparison on an experiment card) or
// **[EXPLORATORY]** (observation outside a registered comparison — n=1 arms,
// uncontrolled observations). Rendered as chips so the label is visible at the
// claim, not just in methodology text.
import { marked } from 'marked';
import { linkArxivIds, slugify, transformTextNodes, wrapTables } from './markdown';

const docs = import.meta.glob('../../../blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const figures = import.meta.glob('../../../blog/figures/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Raster figures (screenshots) are emitted as hashed assets and referenced by
// URL — unlike SVGs, they don't need theme restyling, so no inlining.
const images = import.meta.glob('../../../blog/figures/*.{png,jpg,webp}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface BlogPost {
  /** Site path segment, from the filename with the date prefix stripped. */
  slug: string;
  /** ISO date from the filename prefix, e.g. "2026-08-14". */
  date: string;
  /** Human-readable date, e.g. "August 14, 2026". */
  dateLabel: string;
  /** The H1. */
  title: string;
  /** One-paragraph summary, plain text (index cards, OG, RSS). */
  oneliner: string;
  /** Rendered body HTML (H1 and marker blocks stripped). */
  html: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function dateLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m! - 1]} ${d}, ${y}`;
}

/** Evidence-tier chips: **[REGISTERED]** / **[EXPLORATORY]** → visible labels. */
function tierChips(html: string): string {
  return html
    .replace(
      /<strong>\[REGISTERED\]<\/strong>/g,
      '<span class="chip chip-ok" title="Traces to a registered comparison in the experiment registry">REGISTERED</span>'
    )
    .replace(
      /<strong>\[EXPLORATORY\]<\/strong>/g,
      '<span class="chip chip-pending" title="Observation outside a registered comparison — not a comparative claim">EXPLORATORY</span>'
    );
}

function renderBody(src: string): string {
  const body = src
    .replace(/^# .*\n/, '')
    .replace(/<!-- ONELINER:START -->[\s\S]*?<!-- ONELINER:END -->\n?/, '')
    .trim();

  let html = marked.parse(body, { gfm: true }) as string;

  // Heading anchor ids, matching the registry pages' convention.
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = slugify(inner.replace(/<[^>]+>/g, ''));
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Repo-relative links (correct for GitHub's render) → site routes.
  html = html
    .replace(/href="\.\.\/experiments\/([A-Za-z0-9-]+)\.md(#[^"]*)?"/g, 'href="/experiments/$1$2"')
    .replace(/href="\.\.\/experiments\/?"/g, 'href="/experiments"')
    .replace(/href="\.\.\/STACK\.md"/g, 'href="/stack"')
    .replace(
      /href="(?:\.\/)?(\d{4}-\d{2}-\d{2})-([A-Za-z0-9-]+)\.md"/g,
      'href="/blog/$2"'
    );

  // Inline `figures/*.svg` images so the site theme can restyle them via CSS
  // (same idiom as the experiment registry — see .arch-figure in global.css).
  html = html.replace(
    /(?:<p>)?<img src="figures\/([^"]+\.svg)"(?:\s+alt="([^"]*)")?[^>]*>(?:<\/p>)?/g,
    (m, name: string, alt: string | undefined) => {
      const svg = figures[`../../../blog/figures/${name}`];
      if (!svg) {
        console.warn(`[blog] figure not found: figures/${name}`);
        return m;
      }
      const label = alt ? ` aria-label="${alt}"` : '';
      return `<figure class="arch-figure"${label}>${svg}</figure>`;
    }
  );

  // Raster figures → hashed asset URLs, framed like a screenshot.
  html = html.replace(
    /(?:<p>)?<img src="figures\/([^"]+\.(?:png|jpg|webp))"(?:\s+alt="([^"]*)")?[^>]*>(?:<\/p>)?/g,
    (m, name: string, alt: string | undefined) => {
      const url = images[`../../../blog/figures/${name}`];
      if (!url) {
        console.warn(`[blog] image not found: figures/${name}`);
        return m;
      }
      return `<figure class="post-shot"><img src="${url}" alt="${alt ?? ''}" loading="lazy" decoding="async"></figure>`;
    }
  );

  html = html
    .replace(/<blockquote>/g, '<aside class="aside-note">')
    .replace(/<\/blockquote>/g, '</aside>');

  html = wrapTables(html);
  html = tierChips(html);
  html = transformTextNodes(html, linkArxivIds);
  return html;
}

export function getPosts(): BlogPost[] {
  return Object.entries(docs)
    .map(([path, src]) => {
      const file = path.split('/').pop()!;
      const parts = file.match(/^(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$/);
      if (!parts) {
        throw new Error(
          `blog/${file}: filename must be YYYY-MM-DD-slug.md (drafts belong in blog/drafts/).`
        );
      }
      const title = src.match(/^# (.+)$/m)?.[1];
      if (!title) {
        throw new Error(`blog/${file} is missing an H1 title.`);
      }
      const oneliner = src.match(
        /<!-- ONELINER:START -->([\s\S]*?)<!-- ONELINER:END -->/
      )?.[1]!;
      if (!oneliner) {
        throw new Error(
          `blog/${file} is missing the <!-- ONELINER:START --> / <!-- ONELINER:END --> markers.`
        );
      }
      return {
        slug: parts[2]!,
        date: parts[1]!,
        dateLabel: dateLabel(parts[1]!),
        title,
        oneliner: oneliner.replace(/\s+/g, ' ').trim(),
        html: renderBody(src),
      };
    })
    // Newest first.
    .sort((a, b) => b.date.localeCompare(a.date));
}
