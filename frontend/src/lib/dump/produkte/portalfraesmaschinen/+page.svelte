<script lang="ts">
	import fs10Bild from '$lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg';
	import fs15Bild from '$lib/assets/images/portalfraesmaschinen/fs15.jpg';
	import fs20Bild from '$lib/assets/images/portalfraesmaschinen/FS20.jpg';
	import dreidBild from '$lib/assets/images/portalfraesmaschinen/3d.jpg';
	import vorratBild from '$lib/assets/images/portalfraesmaschinen/VorratMaschine.jpg';
	import Carousel from '$lib/components/carousel.svelte';
	import KatCard from '$lib/components/katCard.svelte';
	import action from '$lib/assets/images/portalfraesmaschinen/fraesaction.jpg';
	import { _ } from 'svelte-i18n';

	let { data } = $props();
</script>

<svelte:head>
	<title>Portalfräsmaschinen - Übersicht</title>
	<meta
		name="description"
		content="Portalfräsmaschinen der Firma Styrotec, Übersicht über FS10, FS15, FS20, Hybrid-3D und Vorratsmaschinen"
	/>
</svelte:head>

{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative left-0 top-0 z-10 w-[100%]">
		<Carousel
			height={600}
			pictures={kategorie.filter((item) => item.Kategorie === 'Portalfräsmaschinen')[0].Bilder}
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
				{$_(`portalfraes.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`portalfraes.sub`)}
			</h1>
		</div>
		<p class="p-4 text-justify md:text-xl lg:text-2xl xl:mx-[10%]">
			{$_(`portalfraes.beschreibungs-text`)}
		</p>
	</div>
	<img
		src={action}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>

<div class="bg-secondary">
	<div
		class="flex h-auto w-full flex-col bg-primary-foreground py-8 pl-[5%] text-center text-secondary md:py-12 md:pl-[5%] lg:flex-row lg:py-24 lg:pl-[15%] lg:text-left"
	>
		<div class="w-[80%] text-xl lg:w-[50%]">
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-1`)}
			</div>
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-2`)}
			</div>
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-3`)}
			</div>
		</div>
		<div class="w-[80%] text-xl lg:w-[50%]">
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-4`)}
			</div>
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-5`)}
			</div>
			<div class=" mb-2 font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`portalfraes.beschreibung-6`)}
			</div>
		</div>
	</div>
</div>

<div>
	<div>
		<div class="mx-[5%] my-[100px] bg-secondary">
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- FS10 karte -->
				<KatCard
					titel={$_(`portalfraes.FS10`)}
					text={$_(`portalfraes.FS10-text`)}
					image={fs10Bild}
					link="/produkte/portalfraesmaschinen/fs10"
				/>

				<!-- FS15 Karte -->
				<KatCard
					titel={$_(`portalfraes.FS15`)}
					text={$_(`portalfraes.FS15-text`)}
					image={fs15Bild}
					link="/produkte/portalfraesmaschinen/fs15"
				/>

				<!-- FS20 Karte -->
				<KatCard
					titel={$_(`portalfraes.FS20`)}
					text={$_(`portalfraes.FS20-text`)}
					image={fs20Bild}
					link="/produkte/portalfraesmaschinen/fs20"
				/>

				<!-- 3D Karte -->
				<KatCard
					titel={$_(`portalfraes.hybrid`)}
					text={$_(`portalfraes.hybrid-text`)}
					image={dreidBild}
					link="/produkte/portalfraesmaschinen/hybrid-3d"
				/>

				<!-- vorratsmaschinen Karte -->
				<KatCard
					titel={$_(`portalfraes.vorratsmaschinen`)}
					text={$_(`portalfraes.vorratsmaschinen-text`)}
					image={vorratBild}
					link="/produkte/portalfraesmaschinen/vorratsmaschinen"
				/>
			</div>
		</div>
	</div>
</div>
