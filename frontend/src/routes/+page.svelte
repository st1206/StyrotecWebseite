<script lang="ts">
	import Blog from '$lib/sections/blog.svelte';
	import Carousel from '$lib/sections/carousel.svelte';
	let { data } = $props();
	console.log(data.articles);
	
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div class="flex justify-between pt-16 px-10">
	
	<div class="size-1/2 px-5">
		{#await data.bilders}
		<div> skeleton build </div>
			
		{:then bilders} 
			<Carousel {bilders} />
		{:catch}
			SERVER ERROR...
		{/await}
	</div>
	<div class="size-1/2 px-5">
		{#await data.articles}
			<div>Loading...</div>
		{:then articles}
			<Blog {articles} />
		{:catch}
			SERVER ERROR...
		{/await}
	</div>
</div>

