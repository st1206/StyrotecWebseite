import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { fetchLanguages, defaultLanguage } from '$lib/server/fetch.js';

/**
 * Language routing driven by the Directus `languages` collection: its entries
 * define the valid URL prefixes (de-DE → /de). Adding a language in the admin
 * makes the site serve it — no code change.
 */
export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  const languages = await fetchLanguages();
  const fallback = await defaultLanguage();

  // Language-agnostic endpoints
  if (path === '/sitemap.xml' || path === '/robots.txt') {
    event.locals.lang = fallback.short;
    event.locals.directusLang = fallback.code;
    return resolve(event);
  }

  // Preview route bypasses lang prefixing but still needs a lang segment inside
  if (path.startsWith('/preview/')) {
    const parts = path.split('/').filter(Boolean); // ['preview', lang, ref?]
    const language = languages.find((l) => l.short === parts[1]) ?? fallback;
    event.locals.lang = language.short;
    event.locals.directusLang = language.code;
    event.locals.preview = true;
    return resolve(event, { transformPageChunk: ({ html }) => html.replace('%sveltekit.lang%', language.short) });
  }

  const [maybeLang] = path.split('/').filter(Boolean);
  const language = languages.find((l) => l.short === maybeLang);
  if (!language) {
    const accept = (event.request.headers.get('accept-language') ?? '').toLowerCase();
    const detected = languages.find((l) => accept.startsWith(l.short)) ?? fallback;
    throw redirect(302, `/${detected.short}${path === '/' ? '' : path}`);
  }

  event.locals.lang = language.short;
  event.locals.directusLang = language.code;
  return resolve(event, { transformPageChunk: ({ html }) => html.replace('%sveltekit.lang%', language.short) });
};
