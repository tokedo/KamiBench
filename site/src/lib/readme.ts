// Build-time extraction of README.md copy sections — single source of truth: the
// landing-page intro, the status banner, the why-cards, and the footer
// disclosure all render from the repo-root README, so every push re-syncs them
// with no manual step.
import { marked } from 'marked';
import readmeSource from '../../../README.md?raw';

const GITHUB_BLOB = 'https://github.com/tokedo/KamiBench/blob/main';

/** README links are repo-relative (correct for GitHub's render); on the site they
 *  must point at the corresponding pages — experiment docs and blog posts have site
 *  routes, everything else falls back to GitHub. */
function rewriteRepoLinks(html: string): string {
  return html
    .replace(/href="experiments\/([^"]+)\.md"/g, 'href="/experiments/$1"')
    .replace(/href="experiments\/?"/g, 'href="/experiments"')
    .replace(/href="blog\/\d{4}-\d{2}-\d{2}-([A-Za-z0-9-]+)\.md"/g, 'href="/blog/$1"')
    .replace(/href="blog\/?"/g, 'href="/blog"')
    .replace(/href="STACK\.md"/g, 'href="/stack"')
    .replace(/href="((?:paper|research|site)\/[^"]+)"/g, `href="${GITHUB_BLOB}/$1"`);
}

/** Extract the copy between <!-- NAME:START --> / <!-- NAME:END --> in README.md and
 *  render it to HTML. Blockquote "> " prefixes are stripped so callout bodies read as
 *  plain text; `inline` skips the wrapping <p> for single-paragraph slots. Throws when
 *  the markers are missing so a stale README fails the build loudly. */
export function readmeSection(name: string, opts: { inline?: boolean } = {}): string {
  const match = readmeSource.match(
    new RegExp(`<!-- ${name}:START -->([\\s\\S]*?)<!-- ${name}:END -->`)
  );
  if (!match) {
    throw new Error(
      `README.md is missing the <!-- ${name}:START --> / <!-- ${name}:END --> markers — cannot extract the "${name}" copy.`
    );
  }
  const src = match[1]!.replace(/^> ?/gm, '').trim();
  return rewriteRepoLinks(
    (opts.inline ? marked.parseInline(src) : marked.parse(src, { gfm: true })) as string
  );
}

export interface WhyCard {
  title: string;
  html: string;
}

export interface WhyContent {
  leadHtml: string;
  cards: WhyCard[];
}

/** Parse the README's WHY marker block — lead paragraph(s) followed by a bullet
 *  list of `- **Title** — body` items — into the landing page's card grid. */
export function readmeWhy(): WhyContent {
  const match = readmeSource.match(/<!-- WHY:START -->([\s\S]*?)<!-- WHY:END -->/);
  if (!match) {
    throw new Error(
      'README.md is missing the <!-- WHY:START --> / <!-- WHY:END --> markers.'
    );
  }
  const lines = match[1]!.trim().split('\n');
  const leadLines: string[] = [];
  const items: string[] = [];
  for (const raw of lines) {
    if (/^- \*\*/.test(raw)) items.push(raw.replace(/^- /, ''));
    else if (items.length) items[items.length - 1] += ` ${raw.trim()}`;
    else leadLines.push(raw);
  }
  const cards = items.map((item) => {
    const parsed = item.match(/^\*\*(.+?)\*\* — ([\s\S]*)$/);
    if (!parsed) {
      throw new Error(`README.md WHY block: cannot parse card item "${item.slice(0, 60)}…"`);
    }
    return {
      title: parsed[1]!,
      html: rewriteRepoLinks(marked.parseInline(parsed[2]!) as string),
    };
  });
  return {
    leadHtml: rewriteRepoLinks(
      marked.parse(leadLines.join('\n').trim(), { gfm: true }) as string
    ),
    cards,
  };
}
