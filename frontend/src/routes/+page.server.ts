import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiArticleArticle, ApiBilderBilder } from '$lib/cmsTypes/contentTypes';
import type { APIResponseCollection } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const loadArticles = async (): Promise<APIResponseCollection<ApiArticleArticle>> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/articles?populate=author.avatar`);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching articles');
		}
	};
	const loadBilder = async (): Promise<APIResponseCollection<ApiBilderBilder>> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/bilders?populate=*`);
		const data = await res.json(); 

		if(res.ok) {
			return data;
		} else {
			console.error(data.error);
			error(500, 'An error occured while feching bilder');
		}
	}
	return {
		articles: loadArticles(),
		bilders: loadBilder()
	};
};
