import { init, register } from 'svelte-i18n';

export const LANG_KEY = 'lang';
export const DEFAULT_LOCALE = 'de-DE';

export const languages = [
	{
		code: 'de-DE',
		shortCode: 'de',
		label: 'Deutsch',
		shortLabel: 'DE'
	},
	{
		code: 'en-EN',
		shortCode: 'en',
		label: 'English',
		shortLabel: 'EN'
	}
];

export type LanguageCode = Extract<(typeof languages)[number]['code'], string>;

register('en-EN', () => import('./en.json'));
register('de-DE', () => import('./de.json'));

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: DEFAULT_LOCALE
});
