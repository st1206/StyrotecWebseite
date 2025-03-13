import { browser } from '$app/environment';

import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';


import { error } from '@sveltejs/kit';


export const load: LayoutLoad = async () => {
	// internationalization
	if (browser) {
		locale.set(window.navigator.language);
		
	}
	await waitLocale();
	/*const loadMitarbeiter = async (): Promise<AttributesOf<ApiMitarbeiterMitarbeiter>> => {
			const res = await fetch(
				`${PUBLIC_BACKEND_URL}/api/mitarbeiters?populate=*`,
				{
					method: 'GET',
					headers: getRequestHeaders()
				}
			);
	
			const data = await res.json();
	
			if (res.ok) {
				return data.data;
			} else {
				console.error(data.error);
				error(500, 'An error occured while feching bilder');
			}
		};
		return {
			mitarbeiter: loadMitarbeiter(),
			
		}; */
};
