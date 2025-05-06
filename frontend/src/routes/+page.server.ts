// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import type { AttributesOf } from '$lib/cmsTypes/types';
// import { PUBLIC_BACKEND_URL } from '$env/static/public';
// import type { ApiHomeHome, ApiMessenMessen } from '$lib/cmsTypes/contentTypes';
// import { getRequestHeaders } from '$lib/server/utils';
// import { LANG_KEY } from '$lib/i18n';

export const load: PageServerLoad = async () => {
	// const loadHomepageData = async (): Promise<AttributesOf<ApiHomeHome>> => {
	// 	const res = await fetch(
	// 		`${PUBLIC_BACKEND_URL}/api/home?populate=*&locale=${cookies.get(LANG_KEY)}`,
	// 		{
	// 			method: 'GET',
	// 			headers: getRequestHeaders()
	// 		}
	// 	);

	// 	const data = await res.json();

	// 	if (res.ok) {
	// 		return data.data;
	// 	} else {
	// 		console.error(data.error);
	// 		error(500, 'An error occured while feching bilder');
	// 	}
	// };
	// const loadMessen = async (): Promise<AttributesOf<ApiMessenMessen>[]> => {
	// 	const res = await fetch(
	// 		`${PUBLIC_BACKEND_URL}/api/messens?populate=*&locale=${cookies.get(LANG_KEY)}`,
	// 		{
	// 			method: 'GET',
	// 			headers: getRequestHeaders()
	// 		}
	// 	);
	// 	const data = await res.json();
	// 	if (res.ok) {
	// 		return data.data;
	// 	} else {
	// 		console.error(data.error);
	// 		error(500, 'An error occured while feching maschinen 3');
	// 	}
	// };

	return {
		messen: [],
		homepageData: []
	};
};
