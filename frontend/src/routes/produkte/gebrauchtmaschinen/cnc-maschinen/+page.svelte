<script lang="ts">
	import MaschinenCard from '$lib/components/maschinenCard.svelte';
	import Marquee from '$lib/components/marquee.svelte';
	import Carousel from '$lib/components/carousel.svelte';
	
	let { data } = $props();
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

{#await data.maschines}
	<div>skeleton build</div>
{:then maschines}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={maschines[0].Bilder} />
	</div>
	
	<div class="hidden xl:block absolute top-[560px] w-full h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>

	<h3
		class="text-secondary font-boldFont bg-secondary-foreground absolute z-20 ml-[35%] hidden w-[30%] border-2 border-solid py-8 text-center text-5xl font-medium shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:block"
		style="margin-top: {100}px"
	>
		CNC Maschinen
	</h3>
	<h3
		class="text-secondary bg-secondary-foreground z-50 block border-2 border-solid text-center text-5xl shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:hidden"
		style="margin-top: {30}px"
	>
		CNC Maschinen
	</h3>

	<div class="text-xl m-5 p-4 xl:m-20 xl:p-16 xl:mt-[350px] bg-primary-foreground text-secondary  shadow-[10px_20px_60px_rgba(0,0,0,0.65)]">
		In unserem Lager finden Sie eine große Auswahl an <span class="text-primary">gebrauchten CNC-Fräsmaschinen</span> führender
		Hersteller. Jede Maschine wird von unseren Experten sorgfältig geprüft und gewartet, um eine
		einwandfreie Funktionalität und Präzision zu gewährleisten. Der Kauf einer gebrauchten
		CNC-Maschine bietet zahlreiche Vorteile: Sie sparen Kosten, profitieren von sofortiger
		Verfügbarkeit und tragen gleichzeitig zur Nachhaltigkeit bei. Unsere Maschinen sind nicht nur
		leistungsfähig, sondern auch eine ressourcenschonende Alternative zu Neugeräten. Ob für
		Industrie, Handwerk oder Kleinbetriebe - wir haben die passende Lösung für Ihre Anforderungen.
	</div>

	

	<div
		class="mx-[10%] my-[100px] flex w-[80%] flex-col flex-wrap gap-8 xl:my-[100px]  xl:flex-row"
	>
		{#each maschines as maschine}
			<MaschinenCard {maschine} />
		{:else}
			<p>Keine Maschinen gefunden</p>
		{/each}
	</div>
{:catch}
	SERVER ERROR...
{/await}
