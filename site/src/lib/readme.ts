// Build-time extraction of README.md copy sections — single source of truth: the
// landing-page intro, the status banner, and the footer disclosure all render from
// the repo-root README, so every push re-syncs them with no manual step.
import { marked } from 'marked';
import readmeSource from '../../../README.md?raw';

const GITHUB_BLOB = 'https://github.com/tokedo/KamiBench/blob/main';

/** README links are repo-relative (correct for GitHub's render); on the site they
 *  must point at the corresponding pages — experiment docs and the paper have site
 *  routes, everything else falls back to GitHub. */
function rewriteRepoLinks(html: string): string {
  return html
    .replace(/href="experiments\/([^"]+)\.md"/g, 'href="/experiments/$1"')
    .replace(/href="experiments\/?"/g, 'href="/experiments"')
    .replace(/href="paper\/paper\.md"/g, 'href="/paper"')
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

export interface RoadmapItem {
  done: boolean;
  html: string;
}

/** Parse the README's ROADMAP marker block (a GFM task list) into items the
 *  landing page can render with its own chips. Wrapped continuation lines are
 *  folded into the preceding item. */
export function readmeRoadmap(): RoadmapItem[] {
  const match = readmeSource.match(/<!-- ROADMAP:START -->([\s\S]*?)<!-- ROADMAP:END -->/);
  if (!match) {
    throw new Error(
      'README.md is missing the <!-- ROADMAP:START --> / <!-- ROADMAP:END --> markers.'
    );
  }
  const items: Array<{ done: boolean; text: string }> = [];
  for (const raw of match[1]!.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const item = line.match(/^- \[( |x)\] (.*)$/);
    if (item) items.push({ done: item[1] === 'x', text: item[2]! });
    else if (items.length) items[items.length - 1]!.text += ` ${line}`;
  }
  return items.map(({ done, text }) => ({
    done,
    html: rewriteRepoLinks(marked.parseInline(text) as string),
  }));
}
