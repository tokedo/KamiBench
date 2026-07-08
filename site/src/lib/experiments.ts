// Build-time loader/renderer for the experiment registry (single source of truth:
// ../experiments/*.md in the repo root — one public, git-timestamped design doc per
// controlled experiment). The registry page, the per-experiment pages, and the
// homepage cards all derive from these files; nothing is hand-copied into the site.
//
// Each doc carries two marker blocks (same convention as README.md, see readme.ts):
//   <!-- STATUS:START/END -->    one-sentence run status
//   <!-- ONELINER:START/END -->  the framing question, used as card copy + OG text
// Both blocks and the H1 are stripped from the rendered body — the page template
// presents them as a styled header instead. Figures referenced as
// `figures/*.svg` are inlined at build time so their embedded links stay clickable
// and the site theme can restyle them via CSS.
import { marked } from 'marked';
import { linkArxivIds, slugify, transformTextNodes, wrapTables } from './markdown';

const docs = import.meta.glob('../../../experiments/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const figures = import.meta.glob('../../../experiments/figures/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Experiment {
  /** File basename, e.g. "001-budget-boxed" — also the site path segment. */
  slug: string;
  /** Registry number, e.g. "001". */
  number: string;
  /** Title without the "Experiment NNN — " prefix. */
  title: string;
  /** The full H1. */
  fullTitle: string;
  /** Framing question, plain text (cards, OG description). */
  oneliner: string;
  /** One-sentence status from the doc's STATUS block. */
  status: string;
  /** Coarse status for chip styling; 'complete' only once results are in. */
  statusKind: 'pending' | 'complete';
  /** Chip label shown next to the status sentence ("Ongoing" until results are in —
   *  the sentence itself carries the precise run state, e.g. "run pending"). */
  statusLabel: 'Ongoing' | 'Complete';
  /** Rendered body HTML (H1 and marker blocks stripped). */
  html: string;
}

function markerBlock(src: string, file: string, name: string): string {
  const match = src.match(
    new RegExp(`<!-- ${name}:START -->([\\s\\S]*?)<!-- ${name}:END -->`)
  );
  if (!match) {
    throw new Error(
      `${file} is missing the <!-- ${name}:START --> / <!-- ${name}:END --> markers.`
    );
  }
  return match[1]!.replace(/\s+/g, ' ').trim();
}

function renderBody(src: string): string {
  const body = src
    .replace(/^# .*\n/, '')
    .replace(/<!-- STATUS:START -->[\s\S]*?<!-- STATUS:END -->\n?/, '')
    .replace(/<!-- ONELINER:START -->[\s\S]*?<!-- ONELINER:END -->\n?/, '')
    .trim();

  let html = marked.parse(body, { gfm: true }) as string;

  // Heading anchor ids, matching the paper page's convention.
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = slugify(inner.replace(/<[^>]+>/g, ''));
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Inline `figures/*.svg` images so embedded repo links stay clickable and the
  // theme can restyle the figure via CSS (see .arch-figure in global.css).
  html = html.replace(
    /(?:<p>)?<img src="figures\/([^"]+\.svg)"(?:\s+alt="([^"]*)")?[^>]*>(?:<\/p>)?/g,
    (m, name: string, alt: string | undefined) => {
      const svg = figures[`../../../experiments/figures/${name}`];
      if (!svg) {
        console.warn(`[experiments] figure not found: figures/${name}`);
        return m;
      }
      const label = alt ? ` aria-label="${alt}"` : '';
      return `<figure class="arch-figure"${label}>${svg}</figure>`;
    }
  );

  // Blockquotes (the scope note, any future callouts) → muted asides, matching
  // the paper page's convention.
  html = html
    .replace(/<blockquote>/g, '<aside class="aside-note">')
    .replace(/<\/blockquote>/g, '</aside>');

  html = wrapTables(html);
  html = transformTextNodes(html, linkArxivIds);
  return html;
}

export function getExperiments(): Experiment[] {
  return Object.entries(docs)
    .map(([path, src]) => {
      const file = path.split('/').pop()!;
      const slug = file.replace(/\.md$/, '');
      const fullTitle = src.match(/^# (.+)$/m)?.[1];
      if (!fullTitle) {
        throw new Error(`${file} is missing an H1 title.`);
      }
      const parts = fullTitle.match(/^Experiment (\d+) — (.*)$/);
      const status = markerBlock(src, file, 'STATUS');
      const complete = /complete/i.test(status);
      return {
        slug,
        number: parts?.[1] ?? slug.slice(0, 3),
        title: parts?.[2] ?? fullTitle,
        fullTitle,
        oneliner: markerBlock(src, file, 'ONELINER'),
        status,
        statusKind: complete ? ('complete' as const) : ('pending' as const),
        statusLabel: complete ? ('Complete' as const) : ('Ongoing' as const),
        html: renderBody(src),
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
