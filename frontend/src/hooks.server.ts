import { pages, type Lang, type SlugKey } from '$lib/config/pages';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	dynamicReroute(event);

	// PERMANENT ROUTES
	// if (event.url.pathname.startsWith('/unternehmen')) {
	//     redirect(308, '/');
	// }

	// TODO ADD TO DYNAMIC REROUTING
	if (event.url.pathname === '/de/produkte') {
		redirect(308, '/produkte/portalfraesmaschinen');
	} else if (event.url.pathname === '/en/products') {
		redirect(308, '/en/products/gantry-machines');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

function dynamicReroute(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	// Split the pathname into segments (e.g. ['de', 'products', 'gantry-machines'])
	const segments = event.url.pathname.split('/').filter(Boolean);
	if (segments.length < 1) {
		redirect(308, '/de/start');
	}

	// The first segment is the language code.
	const lang = segments[0] as Lang;
	// The remaining segments form the incoming slug.
	const incomingSlug = segments.slice(1).join('/');
	if (!incomingSlug) {
		redirect(308, `/${lang}/start`);
	}

	// Helper: find the page in the unified pages object using the computed slug key.
	const getPageKeyBySlug = (slug: string): string | null => {
		// Tell TS this dynamic key is one of "deSlug" | "enSlug"
		const slugKey = `${lang}Slug` as SlugKey;
		for (const [key, page] of Object.entries(pages)) {
			if (page[slugKey] === slug) {
				return key;
			}
		}
		return null;
	};

	let pageKey = getPageKeyBySlug(incomingSlug);
	// Optionally, try searching all pages if no match in the current language was found.
	if (!pageKey) {
		for (const [key, page] of Object.entries(pages)) {
			// A fallback check: does the slug match any language slug?
			if (page.deSlug === incomingSlug || page.enSlug === incomingSlug) {
				pageKey = key;
				break;
			}
		}
	}

	if (!pageKey) {
		// Let the request continue (or handle a 404 as desired)
		return;
	}

	// Now retrieve the expected slug for the current language.
	const slugKey = `${lang}Slug` as SlugKey;
	const page = pages[pageKey];
	const correctSlug = page[slugKey];

	// If the incoming slug doesn't match, redirect to the correct URL.
	if (incomingSlug !== correctSlug) {
		const newPath = `/${lang}/${correctSlug}`;
		redirect(308, newPath);
	}
}
