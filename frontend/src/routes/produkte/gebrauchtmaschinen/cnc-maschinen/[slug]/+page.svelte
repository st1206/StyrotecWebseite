<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	import MaschinenCarousel from '$lib/components/maschinenCarousel.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	let { data } = $props();
	
	const carouselHeight = 600;
</script>

<div class="text-2xl">
{#await data.maschine}
	<div>skeleton build</div>
{:then maschine}
	{#if maschine}
		<div class="relative left-0 top-0 w-[100%]">
			<Carousel height={carouselHeight} pictures={maschine.Bilder} />
		</div>

		<h3
			class="hidden xl:block text-secondary bg-secondary-foreground absolute z-20 ml-[35%] w-[30%] border-2 border-solid py-8 text-center text-5xl font-medium shadow-[10px_20px_60px_rgba(0,0,0,0.95)] -mt-14"
		>
			{maschine.Titel}
		</h3>
		<h3 
			class="block xl:hidden text-secondary text-center bg-secondary-foreground border-2 z-50 border-solid text-5xl shadow-[10px_20px_60px_rgba(0,0,0,0.95)]">
			{maschine.Titel}
		</h3>

		<div
			class="xl:mx-8 mt-32 mb-32 flex flex-col xl:flex-row xl:flex-wrap gap-8 pl-4 xl:pl-32 text-2xl"
			
		>
			{#if maschine.extraBeschreibung}
				<div class="w-[70%]">
					<span class="font-bold">{$_(`cnc-Masch-Seite.beschreibung`)}: </span>
					<span>{maschine.extraBeschreibung}</span>
				</div>
			{/if}
			<div
				class="h-fit w-[80%] md:w-[60%] xl:w-[30%] overflow-x-hidden border-2 border-solid shadow-[10px_10px_20px_rgba(0,0,0,0.75)]"
			>
				<MaschinenCarousel height={carouselHeight} pictures={maschine.Bilder} />
			</div>

			

			<Accordion.Root type="single" class="xl:w-[55%] w-[80%] ">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.hauptdaten`)}:</Accordion.Trigger>
					<Accordion.Content >
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.bezeichnung`)}: </span> <span class="text-right">{maschine.Bezeichnung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.hersteller`)}: </span> <span class="text-right">{maschine.Hersteller}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.typ`)}: </span> <span class="text-right">{maschine.Typ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.baujahr`)}: </span> <span class="text-right">{maschine.Baujahr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.standort`)}: </span> <span class="text-right">{maschine.Standort}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.zustand`)}: </span> <span class="text-right">{maschine.Zustand}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.achsdaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.xachse`)}: </span> <span class="text-right">{maschine.xAchse}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.yachse`)}: </span> <span class="text-right">{maschine.yAchse}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.zachse`)}: </span> <span class="text-right">{maschine.zAchse}</span>
						</div>
						{#if maschine.extraAchsen}
							<div class="flex justify-between">
								<span class="font-medium">{$_(`cnc-Masch-Seite.aachse`)}: </span>
								<span class="text-right">{maschine.extraAchsen.aAchse}</span>
							</div>
							<div class="bg-primary-foreground flex justify-between bg-opacity-10">
								<span class="font-medium">{$_(`cnc-Masch-Seite.cachse`)}: </span>
								<span class="text-right">{maschine.extraAchsen.cAchse}</span>
							</div>
						{/if}
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-xy`)}: </span>
							<span class="text-right">{maschine.VorschubgeschwindigkeitXY}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-z`)}: </span>
							<span class="text-right">{maschine.VorschubgeschwindigkeitZ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.achsbeschleunigung-xyz`)}: </span>
							<span class="text-right">{maschine.AchsbeschleunigungXYZ}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.eckdaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.aufspannfläche`)}: </span>
							<span class="text-right">{maschine.Aufspannflaeche}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.platzbedarf`)}: </span> <span class="text-right">{maschine.Platzbedarf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.gewicht`)}: </span> <span class="text-right">{maschine.Gewicht}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-4">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.technischeDaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.steuerung`)}: </span> <span class="text-right">{maschine.Steuerung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.fräskopf`)}: </span> <span class="text-right">{maschine.Fraeskopf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.spindelleistung`)}: </span>
							<span class="text-right">{maschine.Spindelleistung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.spindeldrehzahl`)}: </span>
							<span class="text-right">{maschine.Spindeldrehzahl}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.drehmoment`)}: </span> <span class="text-right">{maschine.Drehmoment}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugaufnahme`)}: </span>
							<span class="text-right">{maschine.Werkzeugaufnahme}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugabspannung`)}: </span>
							<span class="text-right">{maschine.Werkzeugabspannung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.kühlmittelzufuhr`)}: </span>
							<span class="text-right">{maschine.Kuehlmittelzufuhr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.blasluft`)}: </span> <span class="text-right">{maschine.Blasluft}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.anschlussleistung`)}: </span>
							<span class="text-right">{maschine.Anschlussleistung}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorsicherung`)}: </span> <span class="text-right">{maschine.Vorsicherung}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>

				{#if maschine.Zusatzoptionen}
					<Accordion.Item value="item-5">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.optionen`)}:</Accordion.Trigger>
						<Accordion.Content>
							{#each maschine.Zusatzoptionen as option}
								<div class="flex justify-between">
									<span class="text-right">- {option.Option}</span>
								</div>
							{/each}
						</Accordion.Content>
					</Accordion.Item>
				{/if}
			</Accordion.Root>
		</div>
	{:else}
		Keine Maschine gefunden
	{/if}
{:catch}
	SERVER ERROR...
{/await}
</div>
