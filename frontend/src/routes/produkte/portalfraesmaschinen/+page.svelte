<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import holz from '$lib/assets/images/gebrauchtmaschinen/holz.jpg';
	import modelbau from '$lib/assets/images/gebrauchtmaschinen/modelbau.jpg';
	import zubehoer from '$lib/assets/images/gebrauchtmaschinen/zubehoer.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
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
<div class="hidden xl:block absolute top-[560px] w-full h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>
<div class="bg-secondary flex flex-col gap-16 p-[5%] xl:gap-32">

	

	
		<h3 class="text-primary-foreground text-2xl uppercase xl:text-5xl text-center mt-[100px]">
			{$_(`portalfraes.titel`)}
		</h3>
		<p class="text-xl xl:mx-[10%]">Portalfräsmaschinen sind die ideale Lösung für anspruchsvolle Fräsarbeiten, bei denen höchste Präzision, Stabilität und Effizienz gefragt sind. Sie kommen in zahlreichen Branchen wie dem Maschinenbau, der Luft- und Raumfahrt, der Automobilindustrie und dem Formenbau zum Einsatz. Dank ihrer robusten Bauweise und modernen Steuerungstechnologien ermöglichen sie exakte Bearbeitungsergebnisse und eignen sich besonders für großformatige Werkstücke sowie komplexe Geometrien. Leistungsstarke Spindeln und innovative Antriebssysteme sorgen für eine effiziente und schnelle Bearbeitung unterschiedlichster Materialien – von Aluminium über Stahl bis hin zu Titan und Kunststoff. Je nach Anforderung stehen verschiedene Modelle zur Verfügung, von kompakten Maschinen für kleinere Werkstücke bis hin zu großformatigen Hochleistungsanlagen. Besonders flexibel sind 5-Achs-Portalfräsmaschinen, die auch anspruchsvolle Freiformflächen präzise bearbeiten können. Wer auf maximale Effizienz und höchste Qualität setzt, findet in unseren Portalfräsmaschinen die perfekte Lösung. Kontaktieren Sie uns gerne für eine individuelle Beratung.</p>
	

	<div class="bg-secondary text-primary-foreground text-xl">
		<Tabs style="underline" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary" ulClass="space-x-0 p-1 gap-2">
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