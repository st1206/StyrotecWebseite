import { error } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { getRequestHeaders } from '$lib/server/utils';
import { pages, type CMSTypeMap, type Lang, type SlugKey } from '$lib/config/pages';

/**
 * Asynchronous function to fetch dynamic data from the CMS.
 * Uses `apiSlug` (cmsApiSlug) in the URL.
 */
const loadCMSData = async <T>(
	apiSlug: string,
	lang: string,
	apiParams?: string
): Promise<AttributesOf<T>> => {
	const res = await fetch(
		`${PUBLIC_BACKEND_URL}/api/${apiSlug}?${apiParams || 'populate=*'}&locale=${lang}`,
		{
			method: 'GET',
			headers: getRequestHeaders()
		}
	);
	const response = await res.json();
	if (res.ok) {
		return response.data;
	} else {
		console.error(response.error);
		error(500, `Error fetching CMS data for "${apiSlug}"`);
	}
};

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

/**
 * The SvelteKit load function.
 */
export const load = async <L extends Lang>({ params }: { params: { lang: L; slugs?: string } }) => {
	const { lang, slugs } = params;
	if (!slugs) {
		error(404, 'Page not found');
	}

	// Compute the slug key based on the current language ("deSlug" or "enSlug")
	const slugKey = `${lang}Slug` as SlugKey;

	// Look through the unified pages object to find a matching page.
	const matchedPage = Object.values(pages).find((page) => page[slugKey] === slugs);
	if (!matchedPage) {
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
