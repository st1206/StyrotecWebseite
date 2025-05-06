<script lang="ts">
	import gebrauma from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import Carousel from '$lib/components/carousel.svelte';
	import KatCard from '$lib/components/katCard.svelte';
	import { _ } from 'svelte-i18n';
	let { data } = $props();
</script>

<svelte:head>
	<title>Styroporbearbeitung - Übersicht</title>
	<meta
		name="description"
		content="Alles im Bereich der Styroporbearbeitung der Firma Styrotec, angefangen bei werkzeugen und Aufnahmen, bishin zu Maschinenperipherie wie pressen und zerkleinerer"
	/>
</svelte:head>

{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative left-0 top-0 z-10 w-[100%]">
		<Carousel
			height={600}
			pictures={kategorie.filter((item) => item.Kategorie === 'Styroporbearbeitung')[0].Bilder}
		/>
	</div>
{/await}
<div
	class="relative -top-[50px] h-[100px] w-full bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)] md:h-[100px]"
></div>

<div class="flex flex-col bg-secondary py-[30px] lg:flex-row">
	<div class="w-[90%] lg:w-[60%]">
		<div class="relative mb-4 md:-left-[5%] xl:-left-[20%]">
			<h3
				class="pl-2 text-right font-boldFont text-xl uppercase text-primary-foreground md:pl-6 md:text-3xl lg:pl-12 lg:text-5xl"
			>
				{$_(`styroporbearbeitung.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`styroporbearbeitung.sub`)}
			</h1>
		</div>
		<p class="p-4 text-justify md:text-xl lg:text-2xl xl:mx-[10%]">
			{$_(`styroporbearbeitung.beschreibungs-text`)}
		</p>
	</div>
	<img
		src={gebrauma}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>

<div class="bg-secondary">
	<div
		class="flex h-auto w-full flex-col flex-wrap gap-[5%] bg-primary-foreground px-[5%] py-8 text-left text-secondary md:flex-row md:py-12 lg:px-[10%] lg:py-24"
	>
		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			TODO
		</div>
		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			TODO
		</div>

		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			TODO
		</div>
		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			TODO
		</div>
	</div>
</div>

<div>
	<div>
		<div class="mx-[5%] my-[100px] bg-secondary">
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- fräswerkzeuge -->
				<KatCard
					titel={$_(`styroporbearbeitung.fräswerkzeuge`)}
					text={$_(`styroporbearbeitung.fräswerkzeuge-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/fräswerkzeuge"
				/>

				<!-- hohlfrässpindel  Karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.hohlfrässpindeln`)}
					text={$_(`styroporbearbeitung.hohlfrässpindeln-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/hohlfrässpindeln"
				/>

				<!-- absaugungen karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.absaugungen`)}
					text={$_(`styroporbearbeitung.absaugungen-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/absaugungen"
				/>

				<!-- Shredder -->
				<KatCard
					titel={$_(`styroporbearbeitung.zerkleinerer`)}
					text={$_(`styroporbearbeitung.zerkleinerer-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/zerkleinerer"
				/>

				<!-- pressen -->
				<KatCard
					titel={$_(`styroporbearbeitung.pressen`)}
					text={$_(`pressen.styropor-text`)}
					image={gebrauma}
					link="/produkte/spaenepressen/styropor"
				/>

				<!-- rohmaterial -->
				<KatCard
					titel={$_(`styroporbearbeitung.rohmaterial`)}
					text={$_(`styroporbearbeitung.rohmaterial-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/rohmaterial"
				/>

				<!-- kleber Karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.kleber`)}
					text={$_(`styroporbearbeitung.kleber-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/kleber"
				/>
			</div>
		</div>
	</div>
</div>
