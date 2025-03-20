<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Carousel from '$lib/components/carousel.svelte';
	import MaschinenCarousel from '$lib/components/maschinenCarousel.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	let { data } = $props();

	const carouselHeight = 600;
</script>

<div class="text-2xl">
	{#await data.vorrat}
		<div>skeleton build</div>
	{:then maschine}
		{#if maschine}
			<img
				src={!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${maschine.Bilder[0].url}`
					: maschine.Bilder[0].url}
				alt="Bilder"
				class="relative z-10 h-[300px] w-full object-cover lg:h-[600px]"
			/>
			<div
				class="bg-primary relative -top-[50px] h-[100px] w-full [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)] md:h-[100px]"
			></div>
			<div class=" mr-[40%] xl:mt-[50px]">
				<h1
					class="text-primary-foreground font-boldFont pl-2 text-right text-3xl uppercase md:pl-6 md:text-5xl lg:pl-12 lg:text-7xl"
				>
					{maschine.Titel}
				</h1>
				<h2 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-3xl">
					Hello
				</h2>
			</div>
			<div
				class="bg-primary-foreground text-secondary mb-32 mt-32 flex flex-col gap-8 py-12 pl-4 text-2xl xl:flex-row xl:flex-wrap xl:pl-32"
			>
				
				<div
					class="h-fit w-[80%] overflow-x-hidden border-2 border-solid shadow-[10px_10px_20px_rgba(0,0,0,0.75)] md:w-[60%] xl:w-[30%]"
				>
					<MaschinenCarousel height={carouselHeight} pictures={maschine.Bilder} />
				</div>
				<Accordion.Root type="single" class="w-[80%] xl:w-[55%] ">
					<Accordion.Item value="item-1">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.hauptdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="bg-secondary/15 text-md border-secondary/25 block w-full border p-4">
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.bezeichnung`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.hersteller`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.typ`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.baujahr`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.standort`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.zustand`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.achsdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="bg-secondary/15 text-md border-secondary/25 block w-full border p-4">
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.xachse`)}: </span>
									<span class="text-right">{maschine.xAchse}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.yachse`)}: </span>
									<span class="text-right">{maschine.yAchse}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.zachse`)}: </span>
									<span class="text-right">{maschine.zAchse}</span>
								</div>
								
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-xy`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-z`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.achsbeschleunigung-xyz`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.eckdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="bg-secondary/15 text-md border-secondary/25 block w-full border p-4">
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.aufspannfläche`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.platzbedarf`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.gewicht`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-4">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.technischeDaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="bg-secondary/15 text-md border-secondary/25 block w-full border p-4">
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.steuerung`)}: </span>
									<span class="text-right">{maschine.Steuerung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.fräskopf`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.spindelleistung`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.spindeldrehzahl`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.drehmoment`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugaufnahme`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugabspannung`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.kühlmittelzufuhr`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.blasluft`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.anschlussleistung`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorsicherung`)}: </span>
									<span class="text-right">Platzhalter</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		{:else}
			Keine Maschine gefunden
		{/if}
	{:catch}
		SERVER ERROR...
	{/await}
</div>
