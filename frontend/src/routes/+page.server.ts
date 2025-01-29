import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ApiHomeHome } from '$lib/cmsTypes/contentTypes';

export const load: PageServerLoad = async ({ fetch }) => {

	// TODO ADD GENERIC CREDENTIALS TO FETCH WITH STRAPI API KEY
	
	const loadHomepageData = async (): Promise<AttributesOf<ApiHomeHome>> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/home?populate=*`);
		const data = await res.json();
		console.log(data)

		if (res.ok) {
			return data.data;
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching bilder');
		}
	};
	return { 
		homepageData: loadHomepageData()
	};
};
