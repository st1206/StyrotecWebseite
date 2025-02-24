import { browser } from '$app/environment';

import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	// internationalization
	if (browser) {
		locale.set(window.navigator.language);
		
	}
	await waitLocale();
};
