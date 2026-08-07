import type { RequestHandler } from './$types.js';
import { fetchNavMap } from '$lib/server/fetch.js';

export const GET: RequestHandler = async ({ url }) => {
  const map = await fetchNavMap();
  const origin = url.origin;

  const urls: string[] = [];
  for (const entry of Object.values(map)) {
    const de = `${origin}/de${entry.slugs.de ? `/${entry.slugs.de}` : ''}`;
    const en = `${origin}/en${entry.slugs.en ? `/${entry.slugs.en}` : ''}`;
    urls.push(
      `<url><loc>${de}</loc><xhtml:link rel="alternate" hreflang="en" href="${en}"/></url>`,
      `<url><loc>${en}</loc><xhtml:link rel="alternate" hreflang="de" href="${de}"/></url>`,
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=3600' },
  });
};
