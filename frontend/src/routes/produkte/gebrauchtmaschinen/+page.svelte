<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import imgNorbert from '$lib/assets/images/norbert_schreibtisch.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
</script>


{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie[0].Bilder} />
	</div>
{/await}



<div class="mt-32 flex flex-col gap-16 p-[5%] xl:gap-32">
	<div
		class=" bg-primary-foreground border-2 border-solid p-4 shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:mx-[10%] xl:p-24 "
	>
		<h3 class="text-secondary text-2xl uppercase xl:text-5xl">
			{$_(`gebrauMa.titel`)}  
		</h3>
	</div>
	<div class="relative border-2 border-solid bg-primary-foreground text-secondary  shadow-[10px_20px_60px_rgba(0,0,0,0.95)] w-[80%] left-[10%]">
		<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.cnc-maschinen`)}</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				{$_(`gebrauMa.cnc-maschinen-text`)}
			</div>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
		<Button
				class="relative -bottom-5 left-[45%] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
			>
	</div>

	<div class="relative border-2 border-solid bg-primary-foreground text-secondary  shadow-[10px_20px_60px_rgba(0,0,0,0.95)] w-[80%] left-[10%]">
		<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.cnc-zubehör`)}</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				{$_(`gebrauMa.cnc-zubehör-text`)}
			</div>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
		<Button
				class="relative -bottom-5 left-[45%] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
			>
	</div>

	<div class="relative border-2 border-solid bg-primary-foreground text-secondary  shadow-[10px_20px_60px_rgba(0,0,0,0.95)] w-[80%] left-[10%]">
		<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.holz`)}</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				{$_(`gebrauMa.holz-text`)}
			</div>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
		<Button
				class="relative -bottom-5 left-[45%] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
			>
	</div>

	<div class="relative border-2 border-solid bg-primary-foreground text-secondary  shadow-[10px_20px_60px_rgba(0,0,0,0.95)] w-[80%] left-[10%]">
		<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.modell`)}</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				{$_(`gebrauMa.modell-text`)}
			</div>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
		<Button
				class="relative -bottom-5 left-[45%] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
			>
	</div>
</div>
