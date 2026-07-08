// Shared markdown post-processing helpers, used by lib/paper.ts and
// lib/experiments.ts. All of this operates on marked's HTML output — the source
// markdown files are never edited.

export function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export function slugify(s: string): string {
  return decodeEntities(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Apply `fn` to text nodes only, skipping anything inside <a>, <code>, or <pre>.
 *  Each linkifying pass runs separately, so anchors inserted by an earlier pass are
 *  real tags by the time the next pass walks the document — never matched again. */
export function transformTextNodes(html: string, fn: (text: string) => string): string {
  const SKIP = new Set(['a', 'code', 'pre']);
  let depth = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        const tag = part.match(/^<\/?([a-zA-Z0-9]+)/)?.[1]?.toLowerCase();
        if (tag && SKIP.has(tag)) {
          if (part.startsWith('</')) depth = Math.max(0, depth - 1);
          else depth += 1;
        }
        return part;
      }
      return depth > 0 || part === '' ? part : fn(part);
    })
    .join('');
}

export function anchor(url: string, label: string): string {
  return `<a href="${url}" rel="noopener">${label}</a>`;
}

/** arXiv:2503.14499 and bare (2503.14499) → arxiv.org/abs links. */
export function linkArxivIds(text: string): string {
  return text
    .replace(/\barXiv:(\d{4}\.\d{4,5})\b/g, (m, id: string) =>
      anchor(`https://arxiv.org/abs/${id}`, m)
    )
    .replace(/\((\d{4}\.\d{4,5})\)/g, (_, id: string) =>
      `(${anchor(`https://arxiv.org/abs/${id}`, id)})`
    );
}

/** Bare domain-with-path mentions (theaidigest.org/village, …) → https:// links.
 *  A path segment is required, so plain names like webDiplomacy.net stay text. */
export function linkBareDomains(text: string): string {
  return text.replace(
    /(?<![\w/.@])((?:[a-z0-9-]+\.)+[a-z]{2,}\/[A-Za-z0-9\-._~%/]*[A-Za-z0-9\-_~%])/g,
    (m: string) => anchor(`https://${m}`, m)
  );
}

/** Tables scroll inside their own container on narrow screens. */
export function wrapTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}
