<script lang="ts">
	import type { ApiArticleArticle } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';

	let { articles }: { articles: APIResponseCollection<ApiArticleArticle> } = $props();
	
</script>

<div class="flex flex-col gap-8">
	<h2>Strapi Artikel</h2>

	<p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
		We use an agile approach to test assumptions and connect with the needs of your audience early
		and often.
	</p>

	<div class="flex flex-wrap gap-4">
		{#each articles.data as article}
			<Card class="max-w-[250px] shadow-[10px_10px_20px_rgba(0,0,0,0.25)]  hover:scale-105">
				<!-- <span class="text-sm">{dateFormatter.format(new Date(article.publishedAt))}</span> -->
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{article.title}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
					{article.description}
				</p>
				<span class="font-medium dark:text-white"> {article.author.name} </span>

				<a
					href={`/blogs/${article.slug}`}
					class="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
				>
					Read more
				</a>
			</Card>
		{/each}
	</div>
</div>
