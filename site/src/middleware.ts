// Site-wide link behavior, applied once at build time (every route
// prerenders, so this bakes into the static HTML — no client JS): external
// links open in a new tab. An anchor is external when its href is an absolute
// http(s) URL whose host is not kamibench.ai; internal and relative links are
// untouched. Because this post-processes the final HTML, it covers every
// source of anchors alike — markdown-derived copy (paper, experiments, stack,
// README-derived landing/footer), layout-authored links, and <a> elements
// inside inlined SVG figures. An anchor's existing rel tokens are merged, and
// anchors that already set target are left alone.
import type { MiddlewareHandler } from 'astro';

const INTERNAL_HOSTS = new Set(['kamibench.ai', 'www.kamibench.ai']);

export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next();
  if (!(response.headers.get('content-type') ?? '').includes('text/html')) {
    return response;
  }
  const html = (await response.text()).replace(
    /<a\s+([^>]*?)\s*>/g,
    (match, attrs: string) => {
      const href = attrs.match(/href="(https?:\/\/[^"]+)"/)?.[1];
      if (!href || /\btarget=/.test(attrs)) return match;
      let host: string;
      try {
        host = new URL(href).hostname;
      } catch {
        return match;
      }
      if (INTERNAL_HOSTS.has(host)) return match;
      const rel = new Set(
        (attrs.match(/\brel="([^"]*)"/)?.[1] ?? '').split(/\s+/).filter(Boolean)
      );
      rel.add('noopener').add('noreferrer');
      const rest = attrs.replace(/\s*\brel="[^"]*"/, '');
      return `<a ${rest} target="_blank" rel="${[...rel].join(' ')}">`;
    }
  );
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};
