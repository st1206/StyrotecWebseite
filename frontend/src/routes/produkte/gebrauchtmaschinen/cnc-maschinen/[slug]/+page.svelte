<script lang="ts">
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import MaschinenCard from '$lib/sections/maschinenCard.svelte';
	import { sortUserPlugins } from 'vite';

	let { data } = $props();
	console.log('slug', data);
</script>

<svelte:head>
	<title>maschinenname einfügen</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

{#await data.maschine}
	<div>skeleton build</div>
{:then maschine}
	<div class="flex w-3/4 flex-col justify-center gap-8 pt-32">
		<!-- <h1> {maschine.Titel} </h1> -->

		<div class="w-2/3">
			<!-- <Carousel {data.bilder}/> -->
		</div>

		<div class="w-1/3">tabelle mit daten - bezeichnung jahr, etc</div>

		nächste zeile

		<div class="w-3/4">tabelle mit restlichen Daten</div>

		<p class="w-1/4">Zusätzliche beschreibung</p>

		<button class=""> pdf download für maschinenflyer </button>
	</div>
{:catch}
	SERVER ERROR...
{/await}
