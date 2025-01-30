<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';

	let { data } = $props();
	let carouselHeight = 600;
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div class="h-full">
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="absolute left-0 top-0 w-screen">
			{console.log(homepageData)}
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
		</div>
		<div class="h-[{carouselHeight}px]"></div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
