<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import gebrauma from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import holz from '$lib/assets/images/gebrauchtmaschinen/holz.jpg';
	import modelbau from '$lib/assets/images/gebrauchtmaschinen/modelbau.jpg';
	import zubehoer from '$lib/assets/images/gebrauchtmaschinen/zubehoer.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	let { data } = $props();
</script>

{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie.filter(item=> item.Kategorie ==="gebrauchtmaschinen")[0].Bilder} />
	</div>
{/await}

<div class="bg-secondary flex flex-col gap-16 p-[5%] xl:gap-32">
	<div
		class=" bg-primary-foreground border-2 border-solid p-4 shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:mx-[10%] xl:p-24"
	>
		<h3 class="text-secondary text-2xl uppercase xl:text-5xl">
			{$_(`gebrauMa.titel`)}
		</h3>
	</div>

	<div class="bg-secondary text-primary-foreground text-xl">
		<Tabs style="underline" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary" ulClass="space-x-0 p-1 gap-2">
			<TabItem open title={$_(`gebrauMa.cnc-maschinen`)} activeClass="w-[270px] p-5 bg-primary text-xl" inactiveClass="w-[270px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.cnc-maschinen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`gebrauMa.cnc-maschinen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={gebrauma}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
			<TabItem title={$_(`gebrauMa.cnc-zubehör`)} activeClass="w-[270px] p-5 bg-primary text-xl" inactiveClass="w-[270px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.cnc-zubehör`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`gebrauMa.cnc-zubehör-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={zubehoer}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>

			<TabItem title={$_(`gebrauMa.holz`)} activeClass="w-[270px] p-5 bg-primary text-xl" inactiveClass="w-[270px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.holz`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`gebrauMa.holz-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={holz}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>

			<TabItem title={$_(`gebrauMa.modell`)} activeClass="w-[270px] p-5 bg-primary text-xl" inactiveClass="w-[270px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`gebrauMa.modell`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`gebrauMa.modell-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">{$_(`gebrauMa.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={modelbau}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
		</Tabs>
	</div>
</div>
