import { error } from '@sveltejs/kit';
import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const loadMaschine = async (): Promise<AttributesOf<ApiMaschineMaschine>> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/maschines?filters[slug][$eq]=${params.slug}&populate=*`);
		const data = await res.json();

		console.log
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
