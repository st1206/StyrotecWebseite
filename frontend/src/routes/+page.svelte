<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';

	let { data } = $props();
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
			<Carousel height={600} autoPlay={true} pictures={homepageData.carousel} />
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
