import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { DEFAULT_LOCALE } from '$lib/i18n';

export const load: LayoutLoad = async ({ data: lang }) => {
	if (browser && lang) {
		locale.set(lang.lang === 'en' ? 'en-EN' : DEFAULT_LOCALE);
		await waitLocale();
	}
};
