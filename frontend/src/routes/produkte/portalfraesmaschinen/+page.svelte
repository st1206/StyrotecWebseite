<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import holz from '$lib/assets/images/gebrauchtmaschinen/holz.jpg';
	import modelbau from '$lib/assets/images/gebrauchtmaschinen/modelbau.jpg';
	import zubehoer from '$lib/assets/images/gebrauchtmaschinen/zubehoer.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	import img1 from '$lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg';
	console.log(img1);
	let { data } = $props();
</script>

<svelte:head>
	<title>Portalfräsmaschinen - Übersicht</title>
	<meta name="Übersicht- Portalfräsmaschinen" content="Portalfräsmaschinen der Firma Styrotec, Übersicht über FS10 FS15 FS20 Hybrid-3D Vorratsmaschinen" />
</svelte:head>


{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie.filter(item=> item.Kategorie ==="Portalfräsmaschinen")[0].Bilder} />
	</div>
{/await}
<div class="relative -top-[50px] w-full h-[100px] md:h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>


<div class="bg-secondary flex flex-col p-[5%] ">
	
		<h3 class="text-primary-foreground text-2xl uppercase xl:text-5xl text-right font-boldFont w-[60%]">
			{$_(`portalfraes.titel`)}
		</h3>
		<h1 class="uppercase text-right text-4xl w-[60%]">{$_(`portalfraes.sub`)}</h1>
		<p class="text-xl xl:mx-[10%] w-[60%]">{$_(`portalfraes.beschreibungs-text`)}</p>
		<div class="w-[40%] h-auto text-secondary bg-primary-foreground py-8 rounded-lg ">
			<ul class="text-xl xl:mx-[10%] text-left ">
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-1`)}</li>
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-2`)}</li>
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-3`)}</li>
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-4`)}</li>
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-5`)}</li>
				<li class=" text-xl md:text-2xl xl:text-3xl font-boldFont"><span class="text-primary">&#x2713 </span> {$_(`portalfraes.beschreibung-6`)}</li>
			</ul>
		</div>
		
		<div>
			<div class="bg-secondary mx-[5%] my-[100px]">
				<h1 class="uppercase font-boldFont text-5xl text-center">TODO</h1>
				<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
					
					<!-- FS10 karte --> 
					<KatCard titel={$_(`portalfraes.FS10`)} text={$_(`portalfraes.FS10-text`)} image={"/src/lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg"} link="/produkte/portalfraesmaschinen/fs10" />
					
					<!-- FS15 Karte -->
					<KatCard titel={$_(`portalfraes.FS15`)} text={$_(`portalfraes.FS15-text`)} image={"/src/lib/assets/images/portalfraesmaschinen/fs15.jpg"} link="/produkte/portalfraesmaschinen/fs15" />
	
					<!-- FS20 Karte -->
					<KatCard titel={$_(`portalfraes.FS20`)} text={$_(`portalfraes.FS20-text`)} image={"/src/lib/assets/images/portalfraesmaschinen/FS20.jpg"} link="/produkte/portalfraesmaschinen/fs20"/>

					<!-- 3D Karte -->
					<KatCard titel={$_(`portalfraes.hybrid`)} text={$_(`portalfraes.hybrid-text`)} image={"/src/lib/assets/images/portalfraesmaschinen/3d.jpg"} link="/produkte/portalfraesmaschinen/hybridn-3d" />

					<!-- vorratsmaschinen Karte -->
					<KatCard titel={$_(`portalfraes.vorratsmaschinen`)} text={$_(`portalfraes.vorratsmaschinen-text`)} image={"/src/lib/assets/images/portalfraesmaschinen/vorrat.jpg"} link="/produkte/portalfraesmaschinen/vorratsmaschinen" />
					

					
				</div>
			</div>
		</div>
	
	<div class="bg-secondary text-primary-foreground text-xl w-[60%] ">
		<Tabs tabStyle="full" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0" ulClass="space-x-0 p-1 gap-2">
			<TabItem open title={$_(`portalfraes.FS10`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`portalfraes.FS10`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`portalfraes.FS10-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/portalfraesmaschinen/fs10">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={portalfraes}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
			<TabItem title={$_(`portalfraes.FS15`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`portalfraes.FS15`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`portalfraes.FS15-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/portalfraesmaschinen/fs15">{$_(`portalfraes.cta`)}</a></Button
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

			<TabItem title={$_(`portalfraes.FS20`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`portalfraes.FS20`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`portalfraes.FS20-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/portalfraesmaschinen/fs20">{$_(`portalfraes.cta`)}</a></Button
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

			<TabItem title={$_(`portalfraes.hybrid`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`portalfraes.hybrid`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`portalfraes.hybrid-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/portalfraesmaschinen/hybrid-3d">{$_(`portalfraes.cta`)}</a></Button
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

            <TabItem title={$_(`portalfraes.vorratsmaschinen`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`portalfraes.vorratsmaschinen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`portalfraes.vorratsmaschinen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/portalfraesmaschinen/vorratsmaschinen">{$_(`portalfraes.cta`)}</a></Button
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