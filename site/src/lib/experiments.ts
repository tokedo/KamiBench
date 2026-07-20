// Build-time loader/renderer for the experiment registry (single source of truth:
// ../experiments/*.md in the repo root). The registry is grouped by DESIGN: a
// design doc (e.g. budget-boxed.md) fixes the protocol — the question, the
// architecture, the measurement — and each run doc (e.g. 001-budget-boxed.md) is
// one execution of it with a pinned manifest. Filenames tell them apart: run docs
// start with the three-digit global experiment number; design docs don't.
//
// Marker blocks (same convention as README.md, see readme.ts):
//   design docs:  <!-- ONELINER:START/END -->   the framing question (cards, OG)
//   run docs:     <!-- DESIGN:START/END -->     parent design slug
//                 <!-- STATUS:START/END -->     one-sentence run status
//                 <!-- ONELINER:START/END -->   run summary (cards, OG)
// Marker blocks and the H1 are stripped from rendered bodies — the page templates
// present them as styled headers instead. Figures referenced as `figures/*.svg`
// are inlined at build time so their embedded links stay clickable and the site
// theme can restyle them via CSS. Links between registry docs (`*.md`, correct
// for GitHub's render) are rewritten to site routes.
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

export interface ExperimentRun {
  /** File basename, e.g. "001-budget-boxed" — also the site path segment. */
  slug: string;
  /** Global registry number, e.g. "001". */
  number: string;
  /** Run number within its design, from the H1 ("Run 1 — …"). */
  runNumber: string;
  /** Title without the "Run N — " prefix and "(Experiment NNN)" suffix. */
  title: string;
  /** The full H1. */
  fullTitle: string;
  /** Run summary, plain text (cards, OG description). */
  oneliner: string;
  /** One-sentence status from the doc's STATUS block. */
  status: string;
  /** Coarse status for chip styling; 'complete' only once results are in. */
  statusKind: 'pending' | 'complete';
  /** Chip label shown next to the status sentence. */
  statusLabel: 'In progress' | 'Complete';
  /** Rendered body HTML (H1 and marker blocks stripped). */
  html: string;
  /** Slug of the design this run executes. */
  designSlug: string;
}

export interface ExperimentDesign {
  /** File basename, e.g. "budget-boxed" — also the site path segment. */
  slug: string;
  /** The H1, e.g. "Budget-boxed". */
  title: string;
  /** Framing question, plain text (cards, OG description). */
  oneliner: string;
  /** Rendered body HTML (H1 and marker blocks stripped). */
  html: string;
  /** This design's runs, sorted by global registry number. */
  runs: ExperimentRun[];
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
    .replace(/<!-- DESIGN:START -->[\s\S]*?<!-- DESIGN:END -->\n?/, '')
    .trim();

  let html = marked.parse(body, { gfm: true }) as string;

  // Heading anchor ids, matching the paper page's convention.
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = slugify(inner.replace(/<[^>]+>/g, ''));
    return `<h2 id="${id}">${inner}</h2>`;
  });

  // Links between registry docs are repo-relative .md paths (correct on
  // GitHub); point them at the corresponding site routes.
  html = html.replace(
    /href="(?:\.\/)?([A-Za-z0-9-]+)\.md(#[^"]*)?"/g,
    (_, doc: string, hash: string | undefined) =>
      `href="/experiments/${doc}${hash ?? ''}"`
  );

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

  // Blockquotes (design-pointer notes, any future callouts) → muted asides,
  // matching the paper page's convention.
  html = html
    .replace(/<blockquote>/g, '<aside class="aside-note">')
    .replace(/<\/blockquote>/g, '</aside>');

  html = wrapTables(html);
  html = transformTextNodes(html, linkArxivIds);
  return html;
}

function requireH1(src: string, file: string): string {
  const h1 = src.match(/^# (.+)$/m)?.[1];
  if (!h1) {
    throw new Error(`${file} is missing an H1 title.`);
  }
  return h1;
}

export function getDesigns(): ExperimentDesign[] {
  const entries = Object.entries(docs).map(([path, src]) => {
    const file = path.split('/').pop()!;
    return { file, slug: file.replace(/\.md$/, ''), src };
  });

  const runs = entries
    .filter((e) => /^\d{3}-/.test(e.slug))
    .map(({ file, slug, src }): ExperimentRun => {
      const fullTitle = requireH1(src, file);
      const parts = fullTitle.match(/^Run (\d+) — (.+?)(?:\s*\(Experiment \d+\))?$/);
      if (!parts) {
        throw new Error(
          `${file}: run H1 must read "Run N — title (Experiment NNN)", got "${fullTitle}".`
        );
      }
      const status = markerBlock(src, file, 'STATUS');
      const complete = /complete/i.test(status);
      return {
        slug,
        number: slug.slice(0, 3),
        runNumber: parts[1]!,
        title: parts[2]!,
        fullTitle,
        oneliner: markerBlock(src, file, 'ONELINER'),
        // The chip carries the coarse label; drop a leading "Complete — " /
        // "In progress — " from the sentence so the two never read twice.
        status: status.replace(/^(complete|in progress)\s*—\s*/i, ''),
        statusKind: complete ? ('complete' as const) : ('pending' as const),
        statusLabel: complete ? ('Complete' as const) : ('In progress' as const),
        html: renderBody(src),
        designSlug: markerBlock(src, file, 'DESIGN'),
      };
    })
    .sort((a, b) => a.number.localeCompare(b.number));

  const designs = entries
    .filter((e) => !/^\d{3}-/.test(e.slug))
    .map(
      ({ file, slug, src }): ExperimentDesign => ({
        slug,
        title: requireH1(src, file),
        oneliner: markerBlock(src, file, 'ONELINER'),
        html: renderBody(src),
        runs: runs.filter((run) => run.designSlug === slug),
      })
    )
    // Designs in the order their first runs entered the registry.
    .sort((a, b) =>
      (a.runs[0]?.number ?? '999').localeCompare(b.runs[0]?.number ?? '999')
    );

  const known = new Set(designs.map((d) => d.slug));
  for (const run of runs) {
    if (!known.has(run.designSlug)) {
      throw new Error(
        `${run.slug}.md references unknown design "${run.designSlug}" — no experiments/${run.designSlug}.md.`
      );
    }
  }

  return designs;
}
