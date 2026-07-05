// Build-time renderer for ../paper/paper.md (single source of truth — the page
// regenerates from the current paper source on every build, no manual sync step).
//
// Beyond plain markdown→HTML, this transforms the repo's draft conventions into UI:
//   `[DRAFTED]` / `[SKELETON]` / `[PENDING EXPERIMENTS]`  →  status chips on headings
//   **[TODO: …]** / **[VERIFY: …]** / **[PENDING…]**      →  inline badges
//   > **[TODO:** … **]** blockquotes                      →  TODO callouts
//   other blockquotes (guidance, draft status)            →  muted asides
import { marked } from 'marked';

const GITHUB_BLOB = 'https://github.com/tokedo/KamiBench/blob/main';

const STATUS_CLASS: Record<string, string> = {
  DRAFTED: 'chip-ok',
  SKELETON: 'chip-warn',
  PENDING: 'chip-pending',
  'PENDING EXPERIMENTS': 'chip-pending',
};

export interface PaperHeading {
  id: string;
  text: string;
}

export interface RenderedPaper {
  html: string;
  headings: PaperHeading[];
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function slugify(s: string): string {
  return decodeEntities(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
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

export function renderPaper(src: string): RenderedPaper {
  let html = marked.parse(src, { gfm: true }) as string;
  const headings: PaperHeading[] = [];

  // Relative repo links → GitHub (the site only serves / and /paper).
  html = html.replace(
    /href="\.\.\/((?:research|paper)\/[^"]+)"/g,
    `href="${GITHUB_BLOB}/$1"`
  );

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

  // Tables scroll inside their own container on narrow screens.
  html = html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');

  return { html, headings };
}
