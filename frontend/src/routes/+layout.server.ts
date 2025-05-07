// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import { loadCMSData } from '$lib/server/utils';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactFormSchema } from '$lib/models/contact-form-schema';
import { pages, type Lang, type SlugKey } from '$lib/config/pages';
import { DEFAULT_LOCALE, languages } from '$lib/i18n';

export const prerender = true;

const DEFAULT_SLUG: Record<Lang, string> = {
	de: 'start',
	en: 'home'
};

export const load = async ({ url, request }) => {
	const pathname = url.pathname;
	const segments = pathname.split('/').filter(Boolean);

	// ─── Step 1: Redirect based on browser language ───
	if (!/^(de|en)(\/|$)/.test(segments[0] ?? '')) {
		const acceptLang = request.headers.get('accept-language') ?? '';
		const browserLang = acceptLang.split(',')[0];
		const matched = languages.find((l) => browserLang.startsWith(l.code.split('-')[0]));
		const target = matched?.code ?? DEFAULT_LOCALE;
		const prefix = target.split('-')[0] as Lang;

		redirect(308, `/${prefix}${pathname}`);
	}

	// ─── Step 2: Canonicalization and slug redirect ───
	const lang = segments[0] as Lang;
	const incomingSlug = segments.slice(1).join('/');

	if (!incomingSlug) {
		redirect(308, `/${lang}/${DEFAULT_SLUG[lang]}`);
	}

	const slugKey = `${lang}Slug` as SlugKey;
	const pageEntry = Object.entries(pages).find(([_, p]) => p[slugKey] === incomingSlug);
	const pageKey = pageEntry?.[0];

	if (pageKey) {
		const correctSlug = pages[pageKey][slugKey];
		if (incomingSlug !== correctSlug) {
			redirect(308, `/${lang}/${correctSlug}`);
		}
	}

	// ─── Step 3: Optional hardcoded redirects ───
	if (pathname === '/de/produkte') {
		redirect(308, '/de/produkte/portalfraesmaschinen');
	}
	if (pathname === '/en/products') {
		redirect(308, '/en/products/gantry-machines');
	}

	// ─── Step 4: CMS and Form ───
	const socialMediaChannels = await loadCMSData<{ name: string; link: string }>(
		'social-media-channels',
		lang,
		'populate=*'
	);

	return {
		lang,
		socialMediaChannels,
		contactForm: await superValidate(zod(contactFormSchema))
	};
};
