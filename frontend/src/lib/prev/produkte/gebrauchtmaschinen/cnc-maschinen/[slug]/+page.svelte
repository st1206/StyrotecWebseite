<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
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
			<img
				src={!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${maschine.Bilder[0].url}`
					: maschine.Bilder[0].url}
				alt="Bilder"
				class="relative z-10 h-[300px] w-full object-cover lg:h-[600px]"
			/>
			<div
				class="relative -top-[50px] h-[100px] w-full bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)] md:h-[100px]"
			></div>
			<div class=" mr-[40%] xl:mt-[50px]">
				<h1
					class="pl-2 text-right font-boldFont text-7xl uppercase text-primary-foreground md:pl-6 md:text-5xl lg:pl-12 lg:text-9xl"
				>
					{maschine.Titel}
				</h1>
				<h2 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-5xl">
					{maschine.Bezeichnung}
				</h2>
			</div>
			<div
				class="mb-32 mt-32 flex flex-col gap-8 bg-primary-foreground py-12 pl-4 text-2xl text-secondary xl:flex-row xl:flex-wrap xl:pl-32"
			>
				{#if maschine.extraBeschreibung}
					<div class="w-[70%]">
						<span class="font-bold">{$_(`cnc-Masch-Seite.beschreibung`)}: </span>
						<span>{maschine.extraBeschreibung}</span>
					</div>
				{/if}
				<div
					class="h-fit w-[80%] overflow-x-hidden border-2 border-solid shadow-[10px_10px_20px_rgba(0,0,0,0.75)] md:w-[60%] xl:w-[30%]"
				>
					<MaschinenCarousel height={carouselHeight} pictures={maschine.Bilder} />
				</div>
				<Accordion.Root type="single" class="w-[80%] xl:w-[55%] ">
					<Accordion.Item value="item-1">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.hauptdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="text-md block w-full border border-secondary/25 bg-secondary/15 p-4">
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.bezeichnung`)}: </span>
									<span class="text-right">{maschine.Bezeichnung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.hersteller`)}: </span>
									<span class="text-right">{maschine.Hersteller}</span>
								</div>
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.typ`)}: </span>
									<span class="text-right">{maschine.Typ}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.baujahr`)}: </span>
									<span class="text-right">{maschine.Baujahr}</span>
								</div>
								<div class=" flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.standort`)}: </span>
									<span class="text-right">{maschine.Standort}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.zustand`)}: </span>
									<span class="text-right">{maschine.Zustand}</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.achsdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="text-md block w-full border border-secondary/25 bg-secondary/15 p-4">
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
								{#if maschine.extraAchsen}
									<div class="flex justify-between">
										<span class="font-medium">{$_(`cnc-Masch-Seite.aachse`)}: </span>
										<span class="text-right">{maschine.extraAchsen.aAchse}</span>
									</div>
									<div class="flex justify-between">
										<span class="font-medium">{$_(`cnc-Masch-Seite.cachse`)}: </span>
										<span class="text-right">{maschine.extraAchsen.cAchse}</span>
									</div>
								{/if}
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-xy`)}: </span>
									<span class="text-right">{maschine.VorschubgeschwindigkeitXY}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorschub-z`)}: </span>
									<span class="text-right">{maschine.VorschubgeschwindigkeitZ}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.achsbeschleunigung-xyz`)}: </span>
									<span class="text-right">{maschine.AchsbeschleunigungXYZ}</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.eckdaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="text-md block w-full border border-secondary/25 bg-secondary/15 p-4">
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.aufspannfläche`)}: </span>
									<span class="text-right">{maschine.Aufspannflaeche}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.platzbedarf`)}: </span>
									<span class="text-right">{maschine.Platzbedarf}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.gewicht`)}: </span>
									<span class="text-right">{maschine.Gewicht}</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-4">
						<Accordion.Trigger>{$_(`cnc-Masch-Seite.technischeDaten`)}:</Accordion.Trigger>
						<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
							<div class="text-md block w-full border border-secondary/25 bg-secondary/15 p-4">
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.steuerung`)}: </span>
									<span class="text-right">{maschine.Steuerung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.fräskopf`)}: </span>
									<span class="text-right">{maschine.Fraeskopf}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.spindelleistung`)}: </span>
									<span class="text-right">{maschine.Spindelleistung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.spindeldrehzahl`)}: </span>
									<span class="text-right">{maschine.Spindeldrehzahl}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.drehmoment`)}: </span>
									<span class="text-right">{maschine.Drehmoment}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugaufnahme`)}: </span>
									<span class="text-right">{maschine.Werkzeugaufnahme}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.werkzeugabspannung`)}: </span>
									<span class="text-right">{maschine.Werkzeugabspannung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.kühlmittelzufuhr`)}: </span>
									<span class="text-right">{maschine.Kuehlmittelzufuhr}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.blasluft`)}: </span>
									<span class="text-right">{maschine.Blasluft}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.anschlussleistung`)}: </span>
									<span class="text-right">{maschine.Anschlussleistung}</span>
								</div>
								<div class="flex justify-between">
									<span class="font-medium">{$_(`cnc-Masch-Seite.vorsicherung`)}: </span>
									<span class="text-right">{maschine.Vorsicherung}</span>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>

					{#if maschine.Zusatzoptionen}
						<Accordion.Item value="item-5">
							<Accordion.Trigger>{$_(`cnc-Masch-Seite.optionen`)}:</Accordion.Trigger>
							<Accordion.Content class="mx-1 pt-4 xl:text-xl ">
								{#each maschine.Zusatzoptionen as option}
									<div class="text-md block w-full border border-secondary/25 bg-secondary/15 p-4">
										<div class="flex justify-between">
											<span class="text-right">- {option.Option}</span>
										</div>
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
