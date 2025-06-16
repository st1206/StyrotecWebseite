import { BACKEND_API_TOKEN } from '$env/static/private';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { error } from '@sveltejs/kit';

export function getRequestHeaders(): Record<string, string> {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${BACKEND_API_TOKEN}`
	};
}

/**
 * Asynchronous function to fetch dynamic data from the CMS.
 * Uses `apiSlug` (cmsApiSlug) in the URL.
 */
export const loadCMSData = async <T>(
	apiSlug: string,
	lang: string,
	apiParams?: string
): Promise<AttributesOf<T>> => {
	console.log('apiSlug', apiSlug);
	console.log('apiParams', apiParams);
	const res = await fetch(
		`${PUBLIC_BACKEND_URL}/api/${apiSlug}?${apiParams || 'populate=*'}&locale=${lang}`,
		{
			method: 'GET',
			headers: getRequestHeaders()
		}
	);
	const response = await res.json();
	console.log('response', response);
	if (res.ok) {
		return response.data;
	} else {
		console.error(response.error);
		error(500, `Error fetching CMS data for "${apiSlug}"`);
	}
};
