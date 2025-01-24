<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';

	let { data } = $props();

	const carouselHeight = 500;
</script>

{#await data.maschine}
	<div>skeleton build</div>
{:then maschine}
	{#if maschine}
		<div class="absolute left-0 top-0 w-screen">
			<Carousel height={carouselHeight} pictures={maschine.Bilder} />
		</div>
		<div class="flex flex-col gap-2" style="margin-top: {carouselHeight}px">
			{#each Object.entries(maschine) as [key, value]}
				<div class="flex gap-2">
					<span class="font-medium">{key}:</span>
					<span>{value}</span>
				</div>
			{/each}
		</div>
	{:else}
		Keine Maschine gefunden
	{/if}
{:catch}
	SERVER ERROR...
{/await}
