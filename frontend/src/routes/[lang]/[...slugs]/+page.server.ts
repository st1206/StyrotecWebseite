import { error } from '@sveltejs/kit';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { pages, type CMSTypeMap, type Lang, type SlugKey } from '$lib/config/pages';
import { loadCMSData } from '$lib/server/utils';

/**
 * Helper to load CMS data for a given page.
 * Uses the page’s `cmsApiSlug` to perform the fetch,
 * and uses `cmsTypeKey` to assign the return type via CMSTypeMap.
 */
function getCMSDataForPage<K extends keyof CMSTypeMap>(
	page: { cmsApiSlug: string; cmsApiParams?: string; cmsTypeKey: K },
	lang: string
): Promise<AttributesOf<CMSTypeMap[K]>> {
	return loadCMSData<CMSTypeMap[K]>(page.cmsApiSlug, lang, page.cmsApiParams);
}

export const load = async <L extends Lang>({ params }: { params: { lang: L; slugs?: string } }) => {
	const { lang, slugs } = params;
	if (!slugs) {
		console.error('No Slugs:', params.lang, params.slugs);
		error(404, 'Page not found');
	}

	// Remove hash fragments (anything after '#'), and normalize
	let cleanSlug = slugs.split('#')[0];
	if (cleanSlug.endsWith('/')) {
		cleanSlug = cleanSlug.slice(0, -1);
	}

	// Compute the slug key based on the current language ("deSlug" or "enSlug")
	const slugKey = `${lang}Slug` as SlugKey;

	// Look through the unified pages object to find a matching page.
	const matchedPage = Object.values(pages).find((page) => page[slugKey] === cleanSlug);
	if (!matchedPage) {
		console.error('Error matching page:', params.lang, params.slugs);
		error(404, 'Page not found');
	}

	// Load CMS data using the page's cmsApiSlug and assign the type via cmsTypeKey.
	const cmsData = await getCMSDataForPage(matchedPage, lang);

	return {
		lang,
		pageContent: {
			...matchedPage,
			cmsData
		}
	};
};
