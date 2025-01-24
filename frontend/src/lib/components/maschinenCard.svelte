<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';

	let { maschine }: { maschine: AttributesOf<ApiMaschineMaschine> } = $props();
</script>

<Card class="max-w-[250px] shadow-[10px_10px_20px_rgba(0,0,0,0.75)]  hover:scale-105 ">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{maschine.Titel}
	</h5>
	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
		{maschine.Bezeichnung}
	</p>
	{#each maschine.Bilder as bild}
		<img src={`${PUBLIC_BACKEND_URL}${bild.url}`} alt="bild" />
	{/each}
	<span class="font-medium dark:text-white">Baujahr: {maschine.Baujahr}, {maschine.slug} </span>
	<p>
		<a
			class="text-primary hover:bg-primary-foreground"
			href={`/produkte/gebrauchtmaschinen/cnc-maschinen/${maschine.slug}`}>Weiter zur maschine</a
		>
	</p>
</Card>
