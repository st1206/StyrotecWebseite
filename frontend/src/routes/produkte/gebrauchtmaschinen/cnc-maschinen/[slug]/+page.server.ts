import { error } from '@sveltejs/kit';
import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
import type { APIResponseCollection } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
    console.log({params});
	const loadMaschines = async (): Promise<APIResponseCollection<ApiMaschineMaschine>> => {
        console.log({params});
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/maschines/${params.slug}?populate=*`);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching se maschine');
		}
	};

	return {
		maschine: loadMaschines()
	};
};
