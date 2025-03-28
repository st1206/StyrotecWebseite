<script>
	import { dev } from '$app/environment';
	import MaschinenCard from '$lib/components/maschinenCard.svelte';
	let { data } = $props();
	import { _ } from 'svelte-i18n';
	let fräsen;
	import top from '$lib/assets/images/gebrauchtmaschinen/onlineshop.jpg';
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="description" content="" />
</svelte:head>


<div class="relative ">
	<div
		class="bg-primary-foreground absolute hidden lg:block h-[230px] w-[50%] opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)]"
	>
		<h1 class="text-secondary hidden lg:block font-boldFont pl-10 pt-24 text-4xl xl:text-5xl">Schlagwort.</h1>
	</div>
	<img src={top} alt="FS10 Titelbild" class="h-[300px] w-full object-cover object-top lg:h-[700px]"/>
	<div
		class="bg-primary-foreground absolute hidden lg:block bottom-0 right-0 h-[200px] w-[40%] [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)]"
	></div>
</div>

<div class="relative text-xl">
	<div class="bg-primary-foreground h-[30px] w-full"></div>
	<img
		src={top}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] hidden lg:block right-0  w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	/>
	<div
		class="from-primary-foreground/25 hidden lg:block via-primary-foreground/15 to-secondary absolute -top-[170px] right-0 h-[300px] w-[40%] bg-gradient-to-bl [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	></div>
	<div class="mx-4 pb-3 ml-[30px] lg:ml-[80px] md:mr-[100px] lg:mr-[45%] xl:mr-[45%] mt-8 lg:mt-[100px]">
		<div>
			<h1 class="font-boldFont  text-5xl text-center uppercase">
				TODO
			</h1>
			<p class="p-4 text-sm sm:text-xl text-justify">TODO</p>
		</div>
	</div>
	
</div>

<div class="p-[5%]">
	{#await data.konventionelle}
		<p>Awaiting Response from Server</p>
	{:then konventionelle}
		
		<!-- Darstellung Fräsmaschinen -->
		<h2 class="uppercase font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">Fräsen</h2>
		<div class="flex flex-col md:flex-row ">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === "Fräsen"}
				<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine} ></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Drehmaschinen -->
		<h2 class="uppercase font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">Drehen</h2>
		<div class="flex flex-col md:flex-row ">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === "Drehen"}
				<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine} ></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung schleifmaschinen -->
		<h2 class="uppercase font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">Schleifen</h2>
		<div class="flex flex-col md:flex-row ">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === "Schleifen"}
				<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine} ></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Bohrmaschinen -->
		<h2 class="uppercase font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">Sägen</h2>
		<div class="flex flex-col md:flex-row ">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === "Sägen"}
				<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine} ></MaschinenCard>
				{/if}
			{/each}
		</div>

		<!-- Darstellung Sägen -->
		<h2 class="uppercase font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">Bohren</h2>
		<div class="flex flex-col md:flex-row ">
			{#each konventionelle as maschine}
				{#if maschine.Zugehoerigkeit === "Bohren"}
				<!-- falsche karte Momentan (angepasst auf cnc-maschine) -->
					<MaschinenCard {maschine} ></MaschinenCard>
				{/if}
			{/each}
		</div>
		
	{:catch}
		<p class="text-7xl text-center">Server Error </p>
	{/await}

	<!-- Fräsen -->
	 <div class="">

	 </div>
</div>
