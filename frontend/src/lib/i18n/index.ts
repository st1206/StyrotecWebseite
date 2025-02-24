// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
import { locale } from 'svelte-i18n';


export const LANG_KEY = 'lang';

export const DEFAULT_LOCALE = 'de-DE';

register('en-US', () => import('./en.json'));
register('de-DE', () => import('./de.json'));

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: browser ? window.navigator.language : DEFAULT_LOCALE
});

// on language change
locale.subscribe(async (value) => {
	if (!value || !browser) {
		return;
	}

	const res = await fetch('/api/update-locale', {
		body: JSON.stringify({ lang: value }),
		method: 'POST'
	});
	if (!res.ok) {
		console.log('Error updating language');
		return;
	}
	console.log('Language updated');
	
});

export const languages = [
	{
		code: 'de-DE',
		label: 'Deutsch'
	},
	{
		code: 'en-US',
		label: 'English'
	}
];

export type Language = (typeof languages)[number];

/**
 *
 * BISHER SIND ÜBERSETZUNGEN STATISCH
 * KÖNNTE MAN AM BESTEN DYNAMISCH GESTALTEN
 * GERADE WENN DANN AUCH IRGENDWANN DIE ROUTES ANGEPASST WERDEN SOLLEN (slug usw.)
 * ALSO ERSTMAL DAS EINE NACH DEM ANDEREN
 *
 */
