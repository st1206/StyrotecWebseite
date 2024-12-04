<script>
	import {
		Section,
		ArticleAuthor,
		ArticleBody,
		ArticleHead,
		ArticleWrapper,
		BlogHead,
		BlogBodyWrapper
	} from 'flowbite-svelte-blocks';
	import { VideoCameraSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { Skeleton } from 'flowbite-svelte';
	import { dateFormatter } from '$lib/utils';

	let { articles } = $props();
</script>

<Section name="blog">
	<BlogHead>
		<svelte:fragment slot="h2">Strapi Artikel</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
				We use an agile approach to test assumptions and connect with the needs of your audience
				early and often.
			</p>
		</svelte:fragment>
	</BlogHead>
	<BlogBodyWrapper>
		{#await articles}
			{#each { length: 4 }}
				<div class="rounded-lg border-2 border-gray-50 p-4">
					<Skeleton />
				</div>
			{/each}
		{:then articles}
			{#each articles.data as article}
				<ArticleWrapper>
					<ArticleHead>
						<span
							class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800"
						>
							<VideoCameraSolid size="xs" class="mr-1" />
							Tutorial
						</span>
						<span class="text-sm">{dateFormatter.format(new Date(article.publishedAt))}</span>
					</ArticleHead>
					<ArticleBody>
						<svelte:fragment slot="h2"><a href="/">{article.title}</a></svelte:fragment>
						<svelte:fragment slot="paragraph">
							<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
								{article.description}
							</p>
						</svelte:fragment>
					</ArticleBody>
					<ArticleAuthor>
						<svelte:fragment slot="author">
							<img
								class="h-7 w-7 rounded-full"
								src={`http://localhost:1337${article.author.avatar.formats.thumbnail.url}`}
								alt="Jese Leos avatar"
							/>
							<span class="font-medium dark:text-white"> {article.author.name} </span>
						</svelte:fragment>
						<a
							href={`/blogs/${article.slug}`}
							class="inline-flex items-center font-medium text-primary-600 hover:underline dark:text-primary-500"
						>
							Read more
							<ArrowRightOutline size="sm" class="ml-2" />
						</a>
					</ArticleAuthor>
				</ArticleWrapper>
			{/each}
		{/await}
	</BlogBodyWrapper>
</Section>
