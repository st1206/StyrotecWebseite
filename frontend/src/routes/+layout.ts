// src/routes/+layout.ts
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';
import { DEFAULT_LOCALE, languages } from '$lib/i18n';
import type { Lang } from '$lib/config/pages';
import { browser } from '$app/environment';

const DEFAULT_SLUG: Record<Lang, string> = {
	de: 'start',
	en: 'home'
};

export const load: LayoutLoad = async ({ url, data }) => {
	const pathname = url.pathname;
	const segments = pathname.split('/').filter(Boolean);

	if (browser) {
		// ─── Step 1: Redirect if no language prefix ───
		if (!/^(de|en)(\/|$)/.test(segments[0] ?? '')) {
			const acceptLang = navigator.language;
			const matched = languages.find((l) => acceptLang.startsWith(l.code.split('-')[0]));
			const target = matched?.code ?? DEFAULT_LOCALE;
			const prefix = target.split('-')[0] as Lang;
			goto(`/${prefix}${pathname}`, { replaceState: true });
		}

		const lang = segments[0] as Lang;
		const incomingSlug = segments.slice(1).join('/');

		// ─── Step 2: Redirect to default slug if missing ───
		if (!incomingSlug) {
			goto(`/${lang}/${DEFAULT_SLUG[lang]}`, { replaceState: true });
		}

		// // ─── Step 3: Canonicalize slug ───
		// const slugKey = `${lang}Slug` as SlugKey;
		// const pageEntry = Object.entries(pages).find(([_, p]) => p[slugKey] === incomingSlug);
		// const pageKey = pageEntry?.[0];

		// if (pageKey) {
		// 	const correctSlug = pages[pageKey][slugKey];
		// 	if (incomingSlug !== correctSlug) {
		// 		return goto(`/${lang}/${correctSlug}`, { replaceState: true });
		// 	}
		// }

		// // ─── Step 4: Optional hardcoded redirects ───
		if (pathname === '/de/produkte') {
			goto('/de/produkte/portalfraesmaschinen', { replaceState: true });
		}
		if (pathname === '/en/products') {
			goto('/en/products/gantry-machines', { replaceState: true });
		}

		// ─── Step 5: Set svelte-i18n locale ───
		locale.set(lang === 'en' ? 'en-EN' : DEFAULT_LOCALE);
		await waitLocale();
	}
	return {
		...data
	};
};
