// src/hooks.server.ts
import { pages, type Lang, type SlugKey } from '$lib/config/pages';
import { redirect, type Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, languages } from '$lib/i18n';

const DEFAULT_SLUG: Record<Lang, string> = { de: 'start', en: 'home' };

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const segments = pathname.split('/').filter(Boolean);

	/* ───────────── Step1: prepend language prefix if missing ───────────── */
	if (!/\/(?:de|en)(?:\/|$)/.test(pathname)) {
		const acceptLang = event.request.headers.get('accept-language') ?? '';
		const browserLang = acceptLang.split(',')[0];
		const matched = languages.find((l) => browserLang.startsWith(l.code.split('-')[0]));
		const target = matched?.code ?? DEFAULT_LOCALE; // e.g. “de-DE”
		const prefix = target.split('-')[0] as Lang; // “de” | “en”

		redirect(308, `/${prefix}${pathname}`); // ⟵ EARLY EXIT
	}

	/* ───────────── Step2: redirect “/de” → “/de/start” etc. ───────────── */
	const lang = segments[0] as Lang;
	const incomingSlug = segments.slice(1).join('/');

	if (!incomingSlug) {
		redirect(308, `/${lang}/${DEFAULT_SLUG[lang]}`); // ⟵ EARLY EXIT
	}

	/* ───────────── Step3: slug‑canonicalisation ───────────── */
	const slugKey = `${lang}Slug` as SlugKey;

	const getPageKeyBySlug = (slug: string) => {
		return Object.entries(pages).find(([_, p]) => p[slugKey] === slug)?.[0] ?? null;
	};

	let pageKey = getPageKeyBySlug(incomingSlug);

	// cross‑language slug fallback
	if (!pageKey) {
		pageKey =
			Object.entries(pages).find(
				([_, p]) => p.deSlug === incomingSlug || p.enSlug === incomingSlug
			)?.[0] ?? null;
	}

	if (pageKey) {
		const correctSlug = pages[pageKey][slugKey];
		if (incomingSlug !== correctSlug) {
			redirect(308, `/${lang}/${correctSlug}`); // ⟵ EARLY EXIT
		}
	}

	/* ───────────── Step4: custom permanent redirects ───────────── */
	if (pathname === '/de/produkte') {
		redirect(308, '/de/produkte/portalfraesmaschinen');
	}
	if (pathname === '/en/products') {
		redirect(308, '/en/products/gantry-machines');
	}

	/* ───────────── Step5: hand over to SvelteKit ───────────── */
	event.locals.lang = lang;
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
