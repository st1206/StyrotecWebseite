<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import gebrauma from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
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
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie[0].Bilder} />
	</div>
{/await}
<div class="relative -top-[50px] w-full h-[100px] md:h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>
<div class="bg-secondary flex flex-col py-[30px] lg:flex-row">
	<div class="w-[90%] lg:w-[60%]">
		<div class="relative mb-4 md:-left-[5%] xl:-left-[20%]">
			<h3
				class="text-primary-foreground font-boldFont pl-2 text-right text-xl uppercase md:pl-6 md:text-3xl lg:pl-12 lg:text-5xl"
			>
				{$_(`styroporbearbeitung.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`styroporbearbeitung.sub`)}
			</h1>
		</div>
		<p class="p-4 md:text-xl lg:text-2xl xl:mx-[10%]">{$_(`styroporbearbeitung.beschreibungs-text`)}</p>
	</div>
	<img
		src={gebrauma}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>

<div>
	<div>
		<div class="bg-secondary mx-[5%] my-[100px]">
			<h1 class="font-boldFont text-center text-5xl uppercase">TODO</h1>
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- absaugungen karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.absaugungen`)}
					text={$_(`styroporbearbeitung.absaugungen-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/absaugungen"
				/>

				<!-- hohlfrässpindel  Karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.hohlfrässpindeln`)}
					text={$_(`styroporbearbeitung.hohlfrässpindeln-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/hohlfrässpindeln"
				/>

				<!-- kleber Karte -->
				<KatCard
					titel={$_(`styroporbearbeitung.kleber`)}
					text={$_(`styroporbearbeitung.kleber-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/kleber"
				/>

				<!-- fräswerkzeuge -->
				<KatCard
					titel={$_(`styroporbearbeitung.fräswerkzeuge`)}
					text={$_(`styroporbearbeitung.fräswerkzeuge-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/fräswerkzeuge"
				/>

				<!-- pressen -->
				<KatCard
					titel={$_(`styroporbearbeitung.pressen`)}
					text={$_(`styroporbearbeitung.pressen-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/pressen"
				/>

				<!-- rohmaterial -->
				<KatCard
					titel={$_(`styroporbearbeitung.rohmaterial`)}
					text={$_(`styroporbearbeitung.rohmaterial-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/rohmaterial"
				/>

				<!-- holzbearbeitungsmaschinen -->
				<KatCard
					titel={$_(`styroporbearbeitung.zerkleinerer`)}
					text={$_(`styroporbearbeitung.zerkleinerer-text`)}
					image={gebrauma}
					link="/produkte/styroporbearbeitung/zerkleinerer"
				/>	
			</div>
		</div>
	</div>
</div>