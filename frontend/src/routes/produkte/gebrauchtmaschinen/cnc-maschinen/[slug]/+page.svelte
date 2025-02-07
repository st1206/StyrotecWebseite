<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	import MaschinenCarousel from '$lib/components/maschinenCarousel.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	let { data } = $props();
	
	const carouselHeight = 600;
</script>

{#await data.maschine}
	<div>skeleton build</div>
{:then maschine}
	{#if maschine}
		<div class="absolute left-0 top-0 w-[100%]">
			<Carousel height={carouselHeight} pictures={maschine.Bilder} />
		</div>

		<h3
			class="hidden xl:block text-secondary bg-secondary-foreground absolute z-20 ml-[35%] w-[30%] border-2 border-solid py-8 text-center text-5xl font-medium shadow-[10px_20px_60px_rgba(0,0,0,0.95)]"
			style="margin-top: {carouselHeight - 90}px"
		>
			{maschine.Titel}
		</h3>
		<h3 
			class="block xl:hidden text-secondary text-center bg-secondary-foreground border-2 z-50 border-solid text-5xl shadow-[10px_20px_60px_rgba(0,0,0,0.95)]"
			style="margin-top: {300}px">
			{maschine.Titel}
		</h3>

		<div
			class="mx-8 mt-10 flex flex-row flex-wrap gap-8 pl-32"
			style="xl:margin-top: {carouselHeight + 100}px"
		>
			{#if maschine.extraBeschreibung}
				<div class="w-screen">
					<span class="font-medium">Beschreibung: </span>
					<span>{maschine.extraBeschreibung}</span>
				</div>
			{/if}
			<div
				class="h-fit w-[30%] overflow-x-hidden border-2 border-solid shadow-[10px_10px_20px_rgba(0,0,0,0.75)]"
			>
				<MaschinenCarousel height={carouselHeight} pictures={maschine.Bilder} />
			</div>

			<!-- https://next.shadcn-svelte.com/docs/components/table -->

			<Accordion.Root type="single" class="w-[55%] sm:max-w-[70%]">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Hauptdaten:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Bezeichnung: </span> <span>{maschine.Bezeichnung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Hersteller: </span> <span>{maschine.Hersteller}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Typ: </span> <span>{maschine.Typ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Baujahr: </span> <span>{maschine.Baujahr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Standort: </span> <span>{maschine.Standort}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Zustand: </span> <span>{maschine.Zustand}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>Achs-Daten:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">x-Achse: </span> <span>{maschine.xAchse}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">y-Achse </span> <span>{maschine.yAchse}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">z-Achse: </span> <span>{maschine.zAchse}</span>
						</div>
						{#if maschine.extraAchsen}
							<div class="flex justify-between">
								<span class="font-medium">a-Achse: </span>
								<span>{maschine.extraAchsen.aAchse}</span>
							</div>
							<div class="bg-primary-foreground flex justify-between bg-opacity-10">
								<span class="font-medium">c-Achse: </span>
								<span>{maschine.extraAchsen.cAchse}</span>
							</div>
						{/if}
						<div class="flex justify-between">
							<span class="font-medium">Vorschubgeschwindigkeit X-Y-Achse: </span>
							<span>{maschine.VorschubgeschwindigkeitXY}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Vorschubgeschwindigkeit Z-Achse: </span>
							<span>{maschine.VorschubgeschwindigkeitZ}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Achsbeschleunigung X-Y-Z-Achse: </span>
							<span>{maschine.AchsbeschleunigungXYZ}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>Eckdaten:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Aufspannfläche: </span>
							<span>{maschine.Aufspannflaeche}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Platzbedarf: </span> <span>{maschine.Platzbedarf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Gewicht: </span> <span>{maschine.Gewicht}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-4">
					<Accordion.Trigger>Technische Daten:</Accordion.Trigger>
					<Accordion.Content>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Steuerung: </span> <span>{maschine.Steuerung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Fräskopf: </span> <span>{maschine.Fraeskopf}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Spindelleistung: </span>
							<span>{maschine.Spindelleistung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Spindeldrehzahl: </span>
							<span>{maschine.Spindeldrehzahl}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Drehmoment: </span> <span>{maschine.Drehmoment}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Werkzeugaufnahme: </span>
							<span>{maschine.Werkzeugaufnahme}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Werkzeugabspannung: </span>
							<span>{maschine.Werkzeugabspannung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Kühlmittelzufuhr: </span>
							<span>{maschine.Kuehlmittelzufuhr}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Blasluft: </span> <span>{maschine.Blasluft}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Anschlussleistung: </span>
							<span>{maschine.Anschlussleistung}</span>
						</div>
						<div class="bg-primary-foreground flex justify-between bg-opacity-10">
							<span class="font-medium">Vorsicherung: </span> <span>{maschine.Vorsicherung}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Spindelleistung: </span>
							<span>{maschine.Spindelleistung}</span>
						</div>
					</Accordion.Content>
				</Accordion.Item>

				{#if maschine.Zusatzoptionen}
					<Accordion.Item value="item-5">
						<Accordion.Trigger>Optionen:</Accordion.Trigger>
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
