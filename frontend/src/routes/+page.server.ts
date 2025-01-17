import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ApiArticleArticle } from '$lib/cmsTypes/contentTypes';
import type { APIResponseCollection } from '$lib/cmsTypes/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';



export const load: PageServerLoad = async ({ fetch }) => {
	const loadArticles = async (): Promise<APIResponseCollection<ApiArticleArticle>> => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/api/articles?populate=author.avatar`);
		const data = await res.json();
		
		
		if (res.ok) {
			
			return data;
		} else {
			error(500, 'An error occured while feching articles');
		}
	};
	
	return {
		articles: loadArticles()
	};
};
