
<script lang="ts">
	import Blog from '$lib/sections/blog.svelte';
	import Carousel from '$lib/sections/carousel.svelte';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	let { data } =$props();
	console.log(data.articles);
</script>

<svelte:head> 
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>


{#await data.articles}
	<div>Loading...</div>
{:then articles}

<Blog articles={articles} />

{/await}
