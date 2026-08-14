// Hand-rolled RSS 2.0 feed — no dependency needed for a simple item list.
// Posts derive from ../blog/*.md at build time, same source as /blog.
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/blog';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://kamibench.ai')).toString().replace(/\/$/, '');
  const items = getPosts()
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      // Midnight UTC on the filename date — posts carry dates, not timestamps.
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.oneliner)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KamiBench Blog</title>
    <link>${base}/blog</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Research posts from KamiBench — testing agent continual learning in a persistent world that no one operates.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
