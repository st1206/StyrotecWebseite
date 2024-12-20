<script lang="ts">
	let { data } = $props();

	// function buildArticleObject(
	// 	fetchedArticle: APIResponseCollection<ApiArticleArticle>
	// ): BlogTemplateArticle {
	// 	const article = fetchedArticle.data[0];
	// 	return {
	// 		id: article.slug,
	// 		title: article.title,
	// 		author: {
	// 			name: article.author.name,
	// 			title: article.author.email,
	// 			profilePicture: `http://localhost:1337${article.author.avatar.formats.thumbnail.url}`
	// 		},
	// 		isoDate: article.publishedAt,
	// 		content: article.description
	// 	};
	// }
</script>

{#await data.article}
	{#each { length: 4 }}
		<div>Loading...</div>
	{/each}
{:then article}
	<div>{article.data[0].title}</div>
	<div>{article.data[0].description}</div>
{/await}
