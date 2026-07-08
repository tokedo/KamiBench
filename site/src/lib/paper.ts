// Build-time renderer for ../paper/paper.md (single source of truth — the page
// regenerates from the current paper source on every build, no manual sync step).
//
// Beyond plain markdown→HTML, this transforms the repo's draft conventions into UI:
//   `[DRAFTED]` / `[SKELETON]` / `[TODO]` / `[PENDING EXPERIMENTS]`  →  status chips
//   **[TODO: …]** / **[VERIFY: …]** / **[PENDING…]**      →  inline badges
//   > **[TODO:** … **]** blockquotes                      →  TODO callouts
//   other blockquotes (guidance, draft status)            →  muted asides
// and makes citations clickable (arXiv IDs, bare domain paths, and a named-link
// map for §2 / References mentions). §N / §N.M cross-references become in-page
// anchor links: h2 ids for sections, generated `s-N-M` ids on subsection lead-in
// paragraphs (`**N.M …**`) — pure anchors, no client-side JS. All of this is
// post-processing; paper.md is never edited. Generic helpers live in lib/markdown.ts.
import { marked } from 'marked';
import {
  decodeEntities,
  linkArxivIds,
  linkBareDomains,
  slugify,
  transformTextNodes,
  wrapTables,
} from './markdown';

const GITHUB_BLOB = 'https://github.com/tokedo/KamiBench/blob/main';

const STATUS_CLASS: Record<string, string> = {
  DRAFTED: 'chip-ok',
  SKELETON: 'chip-warn',
  TODO: 'chip-warn', // same warn tint as the inline TODO badge
  PENDING: 'chip-pending',
  'PENDING EXPERIMENTS': 'chip-pending',
};

// Cited-work → landing page, applied to §2 and References only (first occurrence
// per section, longest phrase first). Every URL verified 2xx on 2026-07-05; the
// Cicero DOI is registered and doi.org 302s correctly (science.org bot-walls curl
// with 403, harmless to readers).
const NAMED_LINKS: Array<[phrase: string, url: string]> = [
  ['Vending-Bench Arena', 'https://andonlabs.com/evals/vending-bench-arena'],
  ['Project Vend', 'https://www.anthropic.com/research/project-vend-1'],
  ['Andon Café', 'https://andonlabs.com/cafe'],
  ['Cicero', 'https://doi.org/10.1126/science.ade9097'],
  ['AlphaStar', 'https://doi.org/10.1038/s41586-019-1724-z'],
  ['MUD', 'https://lattice.xyz/blog/mud-an-engine-for-autonomous-worlds'],
  ['Lattice', 'https://lattice.xyz/blog/mud-an-engine-for-autonomous-worlds'],
  ['Dark Forest', 'https://zkga.me'],
  ['0xPARC', 'https://0xparc.org/blog/autonomous-worlds'],
];

const NAMED_LINK_SECTIONS = new Set(['2-background-and-related-work', 'references']);

export interface PaperHeading {
  id: string;
  text: string;
}

export interface RenderedPaper {
  html: string;
  headings: PaperHeading[];
}

/** Render the content of a `[…]` marker (already HTML-escaped by marked) as chips.
 *  "DRAFTED — note" → status chip + muted note; unrecognized content → muted note only. */
function statusMarkup(content: string): string {
  const [statusPart, ...noteParts] = content.split(' — ');
  const note = noteParts.join(' — ');
  const tokens = (statusPart ?? '').split('+').map((t) => t.trim());
  const valid = tokens.length > 0 && tokens.every((t) => STATUS_CLASS[t]);
  if (!valid) {
    return `<span class="h-note">${content}</span>`;
  }
  const chips = tokens
    .map((t) => `<span class="chip ${STATUS_CLASS[t]}">${t}</span>`)
    .join(' ');
  return note ? `${chips} <span class="h-note">${note}</span>` : chips;
}

function badge(kind: string, label: string, content?: string): string {
  const body = content ? ` ${content.trim()}` : '';
  return `<span class="badge badge-${kind}"><b>${label}</b>${body}</span>`;
}

/** NAMED_LINKS, first occurrence per section, in §2 / References only. */
function applyNamedLinks(html: string): string {
  const phrases = [...NAMED_LINKS].sort((a, b) => b[0].length - a[0].length);
  return html
    .split(/(?=<h2 id=")/)
    .map((section) => {
      const id = section.match(/^<h2 id="([^"]+)"/)?.[1];
      if (!id || !NAMED_LINK_SECTIONS.has(id)) return section;
      let out = section;
      for (const [phrase, url] of phrases) {
        // \s+ instead of literal spaces: the ~95-char source wrap can split a
        // phrase across lines ("Vending-Bench\nArena").
        const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
        const re = new RegExp(`(?<![A-Za-z0-9-])${escaped}(?![A-Za-z0-9-])`);
        let done = false;
        out = transformTextNodes(out, (text) => {
          if (done) return text;
          return text.replace(re, (m) => {
            done = true;
            return `<a href="${url}" rel="noopener">${m}</a>`;
          });
        });
      }
      return out;
    })
    .join('');
}

export function renderPaper(src: string): RenderedPaper {
  let html = marked.parse(src, { gfm: true }) as string;
  const headings: PaperHeading[] = [];

  // Relative repo links: experiment docs → the site's own experiment pages;
  // research/paper files → GitHub (the site doesn't serve them).
  html = html
    .replace(/href="\.\.\/experiments\/([^"]+)\.md"/g, 'href="/experiments/$1"')
    .replace(/href="\.\.\/experiments\/?"/g, 'href="/experiments"')
    .replace(/href="\.\.\/((?:research|paper)\/[^"]+)"/g, `href="${GITHUB_BLOB}/$1"`);

  // Section headings: add slug ids (for the TOC) and convert trailing `[…]` code
  // markers into status chips.
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    let text = inner;
    let chips = '';
    const marker = inner.match(/\s*<code>\[([^\]]+)\]<\/code>\s*$/);
    if (marker) {
      text = inner.slice(0, marker.index).trim();
      chips = ` ${statusMarkup(marker[1]!)}`;
    }
    const plain = text.replace(/<[^>]+>/g, '');
    const id = slugify(plain);
    headings.push({ id, text: decodeEntities(plain) });
    return `<h2 id="${id}">${text}${chips}</h2>`;
  });

  // Subsection lead-in paragraphs (`**N.M …** …`) get their own anchor ids so §N.M
  // cross-references can land on the exact subsection, not just the parent section.
  const subsectionIds = new Set<string>();
  html = html.replace(/<p><strong>(\d+)\.(\d+) /g, (_, maj: string, min: string) => {
    const id = `s-${maj}-${min}`;
    subsectionIds.add(id);
    return `<p id="${id}"><strong>${maj}.${min} `;
  });

  // Remaining `[…]` code markers (inline section tags like §5.4, `[PENDING]` table
  // cells, the draft-status legend) → chips.
  html = html.replace(/<code>\[([^\]]+)\]<\/code>/g, (_, content: string) =>
    statusMarkup(content)
  );

  // Blockquote TODOs (> **[TODO:** … **]**) → callouts.
  html = html.replace(
    /<blockquote>\s*<p><strong>\[TODO:<\/strong>([\s\S]*?)<strong>\]<\/strong><\/p>\s*<\/blockquote>/g,
    (_, body: string) =>
      `<aside class="callout callout-todo"><p>${badge('todo', 'TODO')} ${body.trim()}</p></aside>`
  );

  // Remaining blockquotes (draft status, disclosure, guidance notes) → muted asides.
  html = html
    .replace(/<blockquote>/g, '<aside class="aside-note">')
    .replace(/<\/blockquote>/g, '</aside>');

  // Inline draft markers → badges.
  html = html
    .replace(/<strong>\[TODO:\s*([\s\S]*?)\]<\/strong>/g, (_, c: string) =>
      badge('todo', 'TODO', c)
    )
    .replace(/<strong>\[TODO\.?\]<\/strong>/g, badge('todo', 'TODO'))
    .replace(/<strong>\[VERIFY:\s*([\s\S]*?)\]<\/strong>/g, (_, c: string) =>
      badge('verify', 'VERIFY', c)
    )
    .replace(/<strong>\[PENDING:\s*([\s\S]*?)\]<\/strong>/g, (_, c: string) =>
      badge('pending', 'PENDING', c)
    )
    .replace(/<strong>\[PENDING\]<\/strong>/g, badge('pending', 'PENDING'));

  html = wrapTables(html);

  // Clickable citations. Separate passes so each pass skips the anchors the
  // previous one inserted (see transformTextNodes).
  html = transformTextNodes(html, linkArxivIds);
  html = transformTextNodes(html, linkBareDomains);
  html = applyNamedLinks(html);

  // Clickable §N / §N.M cross-references → in-page anchors. `§N.M` prefers the
  // subsection anchor and falls back to the parent section; unresolved refs are
  // left as text and warned about at build time (the build should have none).
  const sectionIds = new Map<string, string>();
  for (const h of headings) {
    const num = h.text.match(/^(\d+)\./)?.[1];
    if (num) sectionIds.set(num, h.id);
  }
  html = transformTextNodes(html, (text) =>
    text.replace(/§(\d+(?:\.\d+)?)/g, (m, ref: string) => {
      const [maj, min] = ref.split('.');
      const subId = min ? `s-${maj}-${min}` : undefined;
      const target = subId && subsectionIds.has(subId) ? subId : sectionIds.get(maj!);
      if (!target) {
        console.warn(`[paper] unresolved cross-ref §${ref}`);
        return m;
      }
      return `<a href="#${target}">${m}</a>`;
    })
  );

  return { html, headings };
}
