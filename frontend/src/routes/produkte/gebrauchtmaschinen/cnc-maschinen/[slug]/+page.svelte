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
			class="xl:mx-8 mt-32 mb-32 flex flex-col xl:flex-row xl:flex-wrap gap-8 pl-4 xl:pl-32 "
			
		>
			{#if maschine.extraBeschreibung}
				<div class="w-[70%]">
					<span class="font-bold">{$_(`cnc-Masch-Seite.beschreibung`)}: </span>
					<span>{maschine.extraBeschreibung}</span>
				</div>
			{/if}
			<div
				class="h-fit w-[300px] xl:w-[30%] overflow-x-hidden border-2 border-solid shadow-[10px_10px_20px_rgba(0,0,0,0.75)]"
			>
				<MaschinenCarousel height={carouselHeight} pictures={maschine.Bilder} />
			</div>

			

			<Accordion.Root type="single" class="xl:w-[55%] w-[80%] max-w-[70%]">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.hauptdaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.bezeichnung`)}: </span> <span>{maschine.Bezeichnung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.hersteller`)}: </span> <span>{maschine.Hersteller}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.typ`)}: </span> <span>{maschine.Typ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.baujahr`)}: </span> <span>{maschine.Baujahr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.standort`)}: </span> <span>{maschine.Standort}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.zustand`)}: </span> <span>{maschine.Zustand}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.achsdaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.xachse`)}: </span> <span>{maschine.xAchse}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.yachse`)}: </span> <span>{maschine.yAchse}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.zachse`)}: </span> <span>{maschine.zAchse}</span>
						</div>
						{#if maschine.extraAchsen}
							<div class="flex justify-between">
								<span class="font-medium">{$_(`cnc-Masch-Seite.aachse`)}: </span>
								<span>{maschine.extraAchsen.aAchse}</span>
							</div>
							<div class="bg-primary-foreground flex justify-between bg-opacity-10">
								<span class="font-medium">{$_(`cnc-Masch-Seite.cachse`)}: </span>
								<span>{maschine.extraAchsen.cAchse}</span>
							</div>
						{/if}
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-xy`)}: </span>
							<span>{maschine.VorschubgeschwindigkeitXY}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-z`)}: </span>
							<span>{maschine.VorschubgeschwindigkeitZ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.achsbeschleunigung-xyz`)}: </span>
							<span>{maschine.AchsbeschleunigungXYZ}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.eckdaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.aufspannfläche`)}: </span>
							<span>{maschine.Aufspannflaeche}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.platzbedarf`)}: </span> <span>{maschine.Platzbedarf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.gewicht`)}: </span> <span>{maschine.Gewicht}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-4">
					<Accordion.Trigger>{$_(`cnc-Masch-Seite.technischeDaten`)}:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.steuerung`)}: </span> <span>{maschine.Steuerung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.fräskopf`)}: </span> <span>{maschine.Fraeskopf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.spindelleistung`)}: </span>
							<span>{maschine.Spindelleistung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.spindeldrehzahl`)}: </span>
							<span>{maschine.Spindeldrehzahl}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.drehmoment`)}: </span> <span>{maschine.Drehmoment}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugaufnahme`)}: </span>
							<span>{maschine.Werkzeugaufnahme}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugabspannung`)}: </span>
							<span>{maschine.Werkzeugabspannung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.kühlmittelzufuhr`)}: </span>
							<span>{maschine.Kuehlmittelzufuhr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.blasluft`)}: </span> <span>{maschine.Blasluft}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">{$_(`cnc-Masch-Seite.anschlussleistung`)}: </span>
							<span>{maschine.Anschlussleistung}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">{$_(`cnc-Masch-Seite.vorsicherung`)}: </span> <span>{maschine.Vorsicherung}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>

				{#if maschine.Zusatzoptionen}
					<Accordion.Item value="item-5">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.optionen`)}:</Accordion.Trigger>
						<Accordion.Content>
							{#each maschine.Zusatzoptionen as option}
								<div class="flex justify-between">
									<span>- {option.Option}</span>
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
