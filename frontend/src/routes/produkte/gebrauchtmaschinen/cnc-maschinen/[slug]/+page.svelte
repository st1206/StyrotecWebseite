<script lang="ts">
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import Carousel from '$lib/sections/carousel.svelte';

	let { data } = $props();
	console.log('slug', data);
</script>


<div class="grid grid-rows-[auto,1fr,auto] grid-cols-1 gap-4 min-h-screen w-full">
    {#await data.gefilterteMaschine}
        <div>skeleton build</div>
    {:then gefilterteMaschine}
        {@const maschine = gefilterteMaschine.data[0]}
        <div class="flex flex-row w-full gap-6 p-32">
            <!-- <h1> {maschine.Titel} </h1> -->

            <div class="w-2/3">
               <!-- Bilder muss als relation zur Datenstruktur "Bilder" um auf carousel zugreifen zu können -->
            </div>

            <div class="w-1/3">tabelle mit daten - bezeichnung jahr, etc </div>

            nächste zeile

            <div class="w-3/4">tabelle mit restlichen Daten {maschine.Titel}</div>

            <p class="w-1/4">{maschine.Hersteller}</p>

            <button class=""> pdf download für maschinenflyer </button>
        </div>
        <div class="flex-row">
            {maschine.AchsbeschleunigungXYZ}
            {maschine.Anschlussleistung}
        </div>
    {:catch}
        SERVER ERROR...
    {/await}
</div>
