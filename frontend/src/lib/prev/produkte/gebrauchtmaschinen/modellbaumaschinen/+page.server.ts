import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiKonventionelleKonventionelle } from '$lib/cmsTypes/contentTypes';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { getRequestHeaders } from '$lib/server/utils';
import { LANG_KEY } from '$lib/i18n';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const loadKonventionelle = async (): Promise<AttributesOf<ApiKonventionelleKonventionelle>[]> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/konventionelles?populate=*&locale=${cookies.get(LANG_KEY)}`,
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
			error(500, 'An error occured while kategorie Bilder');
		}
	};

	return {
		konventionelle: loadKonventionelle()
	};
};
