<script>
	import MaschinenCard from '$lib/components/maschinenCard.svelte';
	import { _ } from 'svelte-i18n';
	import top from '$lib/assets/images/gebrauchtmaschinen/onlineshop.jpg';

	let { data } = $props();
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="description" content="" />
</svelte:head>

<div class="relative">
	<div
		class="absolute hidden h-[230px] w-[50%] bg-primary-foreground opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] lg:block"
	>
		<h1 class="hidden pl-10 pt-24 font-boldFont text-4xl text-secondary lg:block xl:text-5xl">
			Schlagwort.
		</h1>
	</div>
	<img
		src={top}
		alt="FS10 Titelbild"
		class="h-[300px] w-full object-cover object-top lg:h-[700px]"
	/>
	<div
		class="absolute bottom-0 right-0 hidden h-[200px] w-[40%] bg-primary-foreground [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
	></div>
</div>

<div class="relative text-xl">
	<div class="h-[30px] w-full bg-primary-foreground"></div>
	<img
		src={top}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] right-0 hidden w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	/>
	<div
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] bg-gradient-to-bl from-primary-foreground/25 via-primary-foreground/15 to-secondary [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	></div>
	<div
		class="mx-4 ml-[30px] mt-8 pb-3 md:mr-[100px] lg:ml-[80px] lg:mr-[45%] lg:mt-[100px] xl:mr-[45%]"
	>
		<div>
			<h1 class="text-center font-boldFont text-5xl uppercase">TODO</h1>
			<p class="p-4 text-justify text-sm sm:text-xl">TODO</p>
		</div>
	</div>
</div>

<div class="p-[5%]">
	{#await data.konventionelle}
		<p>Awaiting Response from Server</p>
	{:then konventionelle}
		<!-- Darstellung Fräsmaschinen -->
		<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-4xl">Fräsen</h2>
		<div class="flex flex-col md:flex-row">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === 'Fräsen'}
					<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine}></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Drehmaschinen -->
		<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-4xl">Drehen</h2>
		<div class="flex flex-col md:flex-row">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === 'Drehen'}
					<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine}></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung schleifmaschinen -->
		<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-4xl">Schleifen</h2>
		<div class="flex flex-col md:flex-row">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === 'Schleifen'}
					<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine}></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Bohrmaschinen -->
		<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-4xl">Sägen</h2>
		<div class="flex flex-col md:flex-row">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === 'Sägen'}
					<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine}></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Sägen -->
		<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-4xl">Bohren</h2>
		<div class="flex flex-col md:flex-row">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === 'Bohren'}
					<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine}></MaschinenCard>
				{/if}
			{/each}
		</div>
	{:catch}
		<p class="text-center text-7xl">Server Error</p>
	{/await}

	<!-- Fräsen -->
	<div class=""></div>
</div>
