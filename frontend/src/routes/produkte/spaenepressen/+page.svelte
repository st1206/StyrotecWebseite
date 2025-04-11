<script lang="ts">
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import Carousel from '$lib/components/carousel.svelte';
	import KatCard from '$lib/components/katCard.svelte';
	import { _ } from 'svelte-i18n';

	let { data } = $props();
</script>

<svelte:head>
	<title>Spänepressen - Übersicht</title>
	<meta
		name="description"
		content="Spänepressen der Firma Styrotec, Übersicht unsere Pressen für die Materialien Metall, Kunststoffe und Styropor"
	/>
</svelte:head>

{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative left-0 top-0 z-10 w-[100%]">
		<Carousel
			height={600}
			pictures={kategorie.filter((item) => item.Kategorie === 'Spaenepressen')[0].Bilder}
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
				{$_(`pressen.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`pressen.sub`)}
			</h1>
		</div>
		<p class="p-4 text-justify md:text-xl lg:text-2xl xl:mx-[10%]">
			{$_(`pressen.beschreibungs-text`)}
		</p>
	</div>
	<img
		src={portalfraes}
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
			{$_(`pressen.beschreibung-2`)}
		</div>
		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			{$_(`pressen.beschreibung-4`)}
		</div>

		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			{$_(`pressen.beschreibung-1`)}
		</div>
		<div class=" mb-12 w-[80%] font-boldFont text-xl md:w-[45%] md:text-2xl xl:text-3xl">
			<span class="text-primary">&#x2713 </span>
			{$_(`pressen.beschreibung-3`)}
		</div>
	</div>
</div>

<div>
	<div>
		<div class="mx-[5%] my-[100px] bg-secondary">
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- Metalle Karte -->
				<KatCard
					titel={$_(`pressen.metalle`)}
					text={$_('pressen.metalle-text')}
					image={''}
					link="/produkte/spaenepressen/metalle"
				/>

				<!-- Kunststoff karte -->
				<KatCard
					titel={$_(`pressen.kunststoff`)}
					text={$_('pressen.kunststoff-text')}
					image={''}
					link="/produkte/spaenepressen/kunststoffe"
				/>

				<!-- Styropor Karte -->
				<KatCard
					titel={$_(`pressen.styropor`)}
					text={$_('pressen.styropor-text')}
					image={''}
					link="/produkte/spaenepressen/styropor"
				/>
			</div>
		</div>
	</div>
</div>
