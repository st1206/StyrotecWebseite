// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

export const LANG_KEY = 'lang';
export const DEFAULT_LOCALE = 'de-DE';
export const languages = [
	{
		shortCode: 'de',
		code: 'de-DE',
		label: 'Deutsch'
	},
	{
		shortCode: 'en',
		code: 'en-US',
		label: 'English'
	}
];

export type Language = (typeof languages)[number];

register('en-US', () => import('./en.json'));
register('de-DE', () => import('./de.json'));

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: browser ? window.navigator.language : DEFAULT_LOCALE
});
