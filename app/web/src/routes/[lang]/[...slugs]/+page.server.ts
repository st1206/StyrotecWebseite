import type { Actions, PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { fetchPageBySlug, fetchMachineBySlug, hydrateCollectionLists } from '$lib/server/fetch.js';
import { handleContactAction } from '$lib/server/contact.js';

/** full paths per language for the switcher + hreflang (e.g. { de: '/de/produkte', en: '/en/products' }) */
function alternatesFor(slugAlternates: Record<string, string>, suffix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [short, slug] of Object.entries(slugAlternates)) {
    out[short] = `/${short}${slug ? `/${slug}` : ''}${suffix}`;
  }
  return out;
}

export const load: PageServerLoad = async ({ params, locals }) => {
  const segments = (params.slugs ?? '').split('/').filter(Boolean);
  const path = segments.join('/');

  // 1) Exact page match by slug (includes the homepage: empty path)
  const page = await fetchPageBySlug(path, locals.lang);
  if (page) {
    await hydrateCollectionLists(page, locals.lang);
    return {
      kind: 'page' as const,
      page,
      basePath: path,
      alternates: alternatesFor(page.slugAlternates),
    };
  }

  // 2) Machine detail: `<category-page-slug>/<machine-slug>`
  if (segments.length >= 2) {
    const detailSlug = segments[segments.length - 1];
    const parentPath = segments.slice(0, -1).join('/');
    const parent = await fetchPageBySlug(parentPath, locals.lang);
    if (parent?.kind === 'machine_category') {
      const machine = await fetchMachineBySlug(detailSlug, locals.lang, parent.machine_category);
      if (!machine) throw error(404, 'Machine not found');
      return {
        kind: 'detail' as const,
        page: parent,
        machine,
        basePath: parentPath,
        alternates: alternatesFor(parent.slugAlternates, `/${detailSlug}`),
      };
    }
  }

  throw error(404, 'Not found');
};

export const actions: Actions = {
  contact: handleContactAction,
};
