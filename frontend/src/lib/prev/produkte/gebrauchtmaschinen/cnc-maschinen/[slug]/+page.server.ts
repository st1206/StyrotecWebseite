import { error } from '@sveltejs/kit';
import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { getRequestHeaders } from '$lib/server/utils';
import { LANG_KEY } from '$lib/i18n';

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
	const loadMaschine = async (): Promise<AttributesOf<ApiMaschineMaschine>> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/maschines?filters[slug][$eq]=${params.slug}&populate=*&locale=${cookies.get(LANG_KEY)}`,
			{
				method: 'GET',
				headers: getRequestHeaders()
			}
		);
		const data = await res.json();
		if (res.ok) {
			return data.data[0];
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching se maschine');
		}
	};

	return {
		maschine: loadMaschine()
	};
};
