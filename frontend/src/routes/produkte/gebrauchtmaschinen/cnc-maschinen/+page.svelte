<script lang="ts">
	import MaschinenCard from '$lib/components/maschinenCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

{#await data.maschines}
	<div>skeleton build</div>
{:then maschines}
	<div class="flex flex-wrap gap-8">
		{#each maschines as maschine}
			<MaschinenCard {maschine} />
		{:else}
			<p>Keine Maschinen gefunden</p>
		{/each}
	</div>
{:catch}
	SERVER ERROR...
{/await}
