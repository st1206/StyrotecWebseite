// src/hooks.server.ts
import { pages, type Lang, type SlugKey } from '$lib/config/pages';
import { redirect, type Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, languages } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	const segments = pathname.split('/').filter(Boolean);

	if (!pathname.includes('de/') && !pathname.includes('en/')) {
		const acceptLang = event.request.headers.get('accept-language');
		const browserLang = acceptLang?.split(',')[0] || '';
		const matched = languages.find((l) => browserLang.startsWith(l.code.split('-')[0]));
		const target = matched?.code ?? DEFAULT_LOCALE;
		const prefix = target.split('-')[0];

		redirect(307, `/${prefix}${pathname}`);
	}

	const lang = segments[0] as Lang;
	const incomingSlug = segments.slice(1).join('/');

	if (!incomingSlug) {
		redirect(308, `/${lang}/start`);
	}

	const getPageKeyBySlug = (slug: string): string | null => {
		const slugKey = `${lang}Slug` as SlugKey;
		for (const [key, page] of Object.entries(pages)) {
			if (page[slugKey] === slug) return key;
		}
		return null;
	};

	let pageKey = getPageKeyBySlug(incomingSlug);

	if (!pageKey) {
		for (const [key, page] of Object.entries(pages)) {
			if (page.deSlug === incomingSlug || page.enSlug === incomingSlug) {
				pageKey = key;
				break;
			}
		}
	}

	if (pageKey) {
		const correctSlug = pages[pageKey][`${lang}Slug` as SlugKey];
		if (incomingSlug !== correctSlug) {
			redirect(308, `/${lang}/${correctSlug}`);
		}
	}

	// Example of permanent custom redirects
	if (pathname === '/de/produkte') {
		redirect(308, '/produkte/portalfraesmaschinen');
	} else if (pathname === '/en/products') {
		redirect(308, '/en/products/gantry-machines');
	}

	event.locals.lang = lang;
	console.log('lang', lang);

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
