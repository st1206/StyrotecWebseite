<script>
	import { dateFormatter } from '$lib/utils';
	import { Card } from 'svelte-5-ui-lib';

	let { articles } = $props();
</script>

<h2>Strapi Artikel</h2>

<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
	We use an agile approach to test assumptions and connect with the needs of your audience early and
	often.
</p>

{#await articles}
	<div>Loading...</div>
{:then articles}
	{#each articles.data as article}
		<Card class="max-w-[250px]">
			<span class="text-sm">{dateFormatter.format(new Date(article.publishedAt))}</span>
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
{/await}
