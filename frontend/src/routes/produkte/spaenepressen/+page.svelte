<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Spänepressen - Übersicht</title>
	<meta
		name="description"
		content="Spänepressen der Firma Styrotec, Übersicht unsere Pressen für die Materialien Metall, Kunststoffe und Styropor"
	/>
</svelte:head>




<div>
	
    <img
		class="relative z-10 size-full object-cover h-[600px]"
		src={portalfraes}
		alt="bild"
	/>
	<div class="relative -top-[20px] w-full h-[70px] bg-primary [clip-path:polygon(0%_0%,100%_0%,60%_100%,0%_100%)]"></div>
</div>	


<div class="bg-secondary flex flex-col py-[30px] lg:flex-row">
	<div class="w-[90%] lg:w-[60%]">
		<div class="relative mb-4 md:-left-[5%] xl:-left-[20%]">
			<h3
				class="text-primary-foreground font-boldFont pl-2 text-right text-xl uppercase md:pl-6 md:text-3xl lg:pl-12 lg:text-5xl"
			>
				{$_(`pressen.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`pressen.sub`)}
			</h1>
		</div>
		<p class="p-4 md:text-xl lg:text-2xl xl:mx-[10%]">{$_(`pressen.beschreibungs-text`)}</p>
	</div>
	<img
		src={portalfraes}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>

	
<div class="bg-secondary ">
	<div
		class="text-secondary bg-primary-foreground flex flex-col text-left lg:gap-12 lg:flex-row h-auto w-full py-8 md:py-12 md:pl-[5%] lg:py-24 px-[5%] lg:pl-[10%]"
	>
		<div class="text-xl w-[90%] lg:w-[50%] ">
			<div class=" font-boldFont mb-2 text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`pressen.beschreibung-1`)}
			</div>
			<div class=" font-boldFont mb-2 text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`pressen.beschreibung-2`)}
			</div>
		</div>
		<div class="text-xl w-[80%] lg:w-[50%] ">
			<div class=" font-boldFont mb-2 text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`pressen.beschreibung-3`)}
			</div>
			<div class=" font-boldFont mb-2 text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713 </span>
				{$_(`pressen.beschreibung-4`)}
			</div>
		</div>
	</div>
</div>	
	
	
<div> 
	<div>
		<div class="bg-secondary mx-[5%] my-[100px]">
			<h1 class="uppercase font-boldFont text-5xl text-center">TODO</h1>
			
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- Kunststoff karte -->
				 
				<KatCard titel={$_(`pressen.kunststoff`)} text="TODO" image={""} link="/produkte/spaenepressen/kunststoffe" />
				
				<!-- Metalle Karte -->
				<KatCard titel={$_(`pressen.metalle`)} text="TODO" image={""} link="/produkte/spaenepressen/metalle" />

				<!-- Styropor Karte -->
				<KatCard titel={$_(`pressen.styropor`)} text="TODO" image={""} link="/produkte/spaenepressen/styropor" />

			</div>
		</div>
	</div>
	
	
</div>
