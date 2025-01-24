import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const loadMaschines = async (): Promise<AttributesOf<ApiMaschineMaschine>[]> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/maschines?populate=*`);
		const data = await res.json();

		if (res.ok) {
			return data.data;
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching maschinen');
		}
	};

	return {
		maschines: loadMaschines()
	};
};
