import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type {
	ApiAnwenderstorieAnwenderstorie,
	ApiBerichteBerichte,
	ApiMessenMessen,
	ApiReferenzenReferenzen
} from '$lib/cmsTypes/contentTypes';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { getRequestHeaders } from '$lib/server/utils';
import { LANG_KEY } from '$lib/i18n';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const loadMessen = async (): Promise<AttributesOf<ApiMessenMessen>[]> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/messens?populate=*&locale=${cookies.get(LANG_KEY)}`,
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
			error(500, 'An error occured while feching maschinen 3');
		}
	};

	const loadAnwenderstories = async (): Promise<
		AttributesOf<ApiAnwenderstorieAnwenderstorie>[]
	> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/anwenderstories?populate=*&locale=${cookies.get(LANG_KEY)}`,
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
			error(500, 'An error occured while feching maschinen 3');
		}
	};

	const loadReferenzen = async (): Promise<AttributesOf<ApiReferenzenReferenzen>[]> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/referenzens?populate=*&locale=${cookies.get(LANG_KEY)}`,
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
			error(500, 'An error occured while feching maschinen 3');
		}
	};

	const loadBerichte = async (): Promise<AttributesOf<ApiBerichteBerichte>[]> => {
		const res = await fetch(
			`${PUBLIC_BACKEND_URL}/api/berichtes?populate=*&locale=${cookies.get(LANG_KEY)}`,
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
			error(500, 'An error occured while feching maschinen 3');
		}
	};

	return {
		messens: loadMessen(),
		anwenderstories: loadAnwenderstories(),
		referenzen: loadReferenzen(),
		berichte: loadBerichte()
	};
};
