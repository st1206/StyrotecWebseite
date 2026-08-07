import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { fetchPageByRef, hydrateCollectionLists } from '$lib/server/fetch.js';

/**
 * Draft preview, opened by the Directus "Preview" pane / Visual Editor:
 *   /preview/{lang}/{page-id-or-seed-key}?token={WEB_PREVIEW_SECRET}
 * Renders the same section pipeline as the public site, but reads via the
 * staff token so drafts are visible and the Visual Editor can attach.
 */
export const load: PageServerLoad = async ({ params, url, locals }) => {
  const token = url.searchParams.get('token');
  if (!token || token !== env.WEB_PREVIEW_SECRET) {
    throw error(401, 'Preview token required');
  }

  const page = await fetchPageByRef(params.ref, locals.lang);
  if (!page) throw error(404, `No page '${params.ref}'`);
  await hydrateCollectionLists(page, locals.lang);

  return {
    page,
    basePath: (page.slug as string) ?? '',
  };
};
