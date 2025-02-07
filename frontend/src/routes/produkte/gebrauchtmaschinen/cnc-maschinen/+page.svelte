<script lang="ts">
	import MaschinenCard from '$lib/components/maschinenCard.svelte';
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

{#await data.maschines}
	<div>skeleton build</div>
{:then maschines}
	<div class="absolute left-0 top-0 z-10 w-[100%] overflow-x-hidden">
		<Carousel height={600} pictures={maschines[0].Bilder} />
	</div>
	<h3
		class="hidden xl:block text-secondary bg-secondary-foreground absolute z-20 ml-[35%] w-[30%] border-2 border-solid py-8 text-center text-5xl font-medium shadow-[10px_20px_60px_rgba(0,0,0,0.95)]"
		style="margin-top: {600 - 90}px"
	>
		CNC Maschinen
	</h3>
	<h3 
		class="block xl:hidden text-secondary text-center bg-secondary-foreground border-2 z-50 border-solid text-5xl shadow-[10px_20px_60px_rgba(0,0,0,0.95)]"
		style="margin-top: {300}px">
		CNC Maschinen
	</h3>

	<div class="mx-[10%] xl:my-[100px] my-[100px] xl:mt-[700px] flex w-[80%] flex-col flex-wrap gap-8 xl:flex-row">
		{#each maschines as maschine}
			<MaschinenCard {maschine} />
		{:else}
			<p>Keine Maschinen gefunden</p>
		{/each}
	</div>
{:catch}
	SERVER ERROR...
{/await}
