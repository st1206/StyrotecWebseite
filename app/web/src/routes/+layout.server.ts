import type { LayoutServerLoad } from './$types.js';
import { fetchGlobal, fetchSocialChannels, fetchNavMap, fetchLanguages } from '$lib/server/fetch.js';

export const load: LayoutServerLoad = async ({ locals }) => {
  const [global, socials, slugMap, languages] = await Promise.all([
    fetchGlobal(),
    fetchSocialChannels(),
    fetchNavMap(),
    fetchLanguages(),
  ]);
  return {
    lang: locals.lang,
    directusLang: locals.directusLang,
    preview: locals.preview ?? false,
    global,
    socials,
    slugMap,
    languages: languages.map((l) => ({ short: l.short, name: l.name })),
  };
};
