// Build-time extraction of README.md copy sections — single source of truth: the
// landing-page intro, the status banner, and the footer disclosure all render from
// the repo-root README, so every push re-syncs them with no manual step.
import { marked } from 'marked';
import readmeSource from '../../../README.md?raw';

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
  return (opts.inline ? marked.parseInline(src) : marked.parse(src, { gfm: true })) as string;
}
