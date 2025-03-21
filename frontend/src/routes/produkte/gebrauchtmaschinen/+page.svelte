<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import gebrauma from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import holz from '$lib/assets/images/gebrauchtmaschinen/holz.jpg';
	import modellbau from '$lib/assets/images/gebrauchtmaschinen/modelbau.jpg';
	import zubehoer from '$lib/assets/images/gebrauchtmaschinen/zubehoer.jpg';
	import action from '$lib/assets/images/portalfraesmaschinen/fraesaction.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Gebrauchtmaschinen - Übersicht</title>
	<meta name="description" content="Übersicht über Gebrauchtmaschinen und Unterkategorien." />
</svelte:head>



{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie.filter(item=> item.Kategorie ==="Gebrauchtmaschinen")[0].Bilder} />
	</div>
{/await}
<div class="relative -top-[50px] w-full h-[100px] md:h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>


<div class="bg-secondary flex flex-col py-[30px] lg:flex-row">
	<div class="w-[90%] lg:w-[60%]">
		<div class="relative mb-4 md:-left-[5%] xl:-left-[20%]">
			<h1
				class="text-primary-foreground font-boldFont pl-2 text-right text-xl uppercase md:pl-6 md:text-3xl lg:pl-12 lg:text-5xl"
			>
				{$_(`gebrauMa.titel`)}
			</h1>
			<h2 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`gebrauMa.sub`)}
			</h2>
		</div>
		<p class="p-4 md:text-xl lg:text-2xl xl:mx-[10%]">{$_(`gebrauMa.beschreibungs-text`)}</p>
	</div>
	<img
		src={action}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>



<div class="bg-secondary mx-[5%] my-[100px]">
	<h1 class="font-boldFont text-center text-5xl uppercase">TODO</h1>
	<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
		<!-- cnc - maschinen karte -->
		<KatCard
			titel={$_(`gebrauMa.cnc-maschinen`)}
			text={$_(`gebrauMa.cnc-maschinen-text`)}
			image={gebrauma}
			link="/produkte/gebrauchtmaschinen/cnc-maschinen"
		/>

		<!-- cnc zubehör  Karte -->
		<KatCard
			titel={$_(`gebrauMa.cnc-zubehör`)}
			text={$_(`gebrauMa.cnc-zubehör-text`)}
			image={zubehoer}
			link="/produkte/gebrauchtmaschinen/cnc-zubehoer"
		/>

		<!-- modellbaumaschinen Karte -->
		<KatCard
			titel={$_(`gebrauMa.holz`)}
			text={$_(`gebrauMa.holz-text`)}
			image={holz}
			link="/produkte/gebrauchtmaschinen/holzbearbeitungsmaschinen"
		/>

		<!-- holzbearbeitungsmaschinen -->
		<KatCard
			titel={$_(`gebrauMa.modell`)}
			text={$_(`gebrauMa.modell-text`)}
			image={modellbau}
			link="/produkte/gebrauchtmaschinen/modellbaumaschinen"
		/>	
	</div>
</div>


