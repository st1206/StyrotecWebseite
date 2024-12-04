<script lang="ts">
	import Blog from '$lib/sections/blog.svelte';
	import ContentWithImage from '$lib/sections/content-with-image.svelte';

	let { data } = $props();
</script>

<ContentWithImage />

<Blog articles={data.articles} />
