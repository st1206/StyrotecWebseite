<script lang="ts">
	import type { ApiArticleArticle } from '$lib/cmsTypes/contentTypes.js';
	import type { APIResponseCollection } from '$lib/cmsTypes/types.js';
	import { Skeleton } from 'flowbite-svelte';
	import { Section, BlogTemplate } from 'flowbite-svelte-blocks';

	interface BlogTemplateArticle {
		id: string;
		title: string;
		lead?: string;
		author: {
			name: string;
			title?: string;
			profilePicture?: string;
			href?: string;
		};
		date?: string;
		isoDate?: string;
		content: string;
	}

	let { data } = $props();

	function buildArticleObject(
		fetchedArticle: APIResponseCollection<ApiArticleArticle>
	): BlogTemplateArticle {
		const article = fetchedArticle.data[0];
		return {
			id: article.slug,
			title: article.title,
			author: {
				name: article.author.name,
				title: article.author.email,
				profilePicture: `http://localhost:1337${article.author.avatar.formats.thumbnail.url}`
			},
			isoDate: article.publishedAt,
			content: article.description
		};
	}
</script>

{#await data.article}
	{#each { length: 4 }}
		<div class="rounded-lg border-2 border-gray-50 p-4">
			<Skeleton />
		</div>
	{/each}
{:then article}
	<Section name="blog" classSection="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
		<article
			class="format format-sm format-blue mx-auto w-full max-w-2xl dark:format-invert sm:format-base lg:format-lg"
		>
			<BlogTemplate blog={buildArticleObject(article)} />
		</article>
	</Section>
{/await}
