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

<div class="flex flex-col justify-between">
	
	<div class="h-[730px] object-cover w-full  overflow-hidden">
		{#await data.bilders}
		<div> skeleton build </div>
			
		{:then bilders} 
			<Carousel {bilders} />
		{:catch}
			SERVER ERROR...
		{/await}
	</div>
	<div class="px-5">
		{#await data.articles}
			<div>Loading...</div>
		{:then articles}
			<Blog {articles} />
		{:catch}
			SERVER ERROR...
		{/await}
	</div>
	<div class="h-[1000px]">hi</div>
	<div class="h-[1000px]">hi</div>
	<div class="h-[1000px]">hi</div>
	<div class="h-[1000px]">hi</div>
</div>

