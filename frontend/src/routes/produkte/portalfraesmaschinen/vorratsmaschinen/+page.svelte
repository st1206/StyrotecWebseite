<script lang="ts">
    
	
	import arbeitsraum from '$lib/assets/images/portalfraesmaschinen/Arbeitsraumabdeckung.jpg';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
	
	import VorratmaschinenCard from '$lib/components/vorratmaschinenCard.svelte';
	let { data } = $props();
</script>



<div class="relative ">
	<div
		class="bg-primary-foreground absolute hidden lg:block h-[230px] w-[50%] opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)]"
	>
		<h1 class="text-secondary hidden lg:block font-boldFont pl-10 pt-24 text-4xl xl:text-5xl">Schlagwort.</h1>
	</div>
	<img src={arbeitsraum} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="bg-primary-foreground absolute hidden lg:block bottom-0 right-0 h-[200px] w-[40%] [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)]"
	></div>
</div>

<div class="relative text-xl ">
	<div class="bg-primary-foreground h-[30px] w-full"></div>
	<img
		src={arbeitsraum}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] hidden lg:block right-0 h-[300px] w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	/>
	<div
		class="from-primary-foreground/25 hidden lg:block via-primary-foreground/15 to-secondary absolute -top-[170px] right-0 h-[300px] w-[40%] bg-gradient-to-bl [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	></div>
	<div class="mx-4 lg:pb-48 ml-[30px] lg:ml-[80px] md:mr-[300px] lg:mr-[600px] xl:mr-[800px] mt-8 lg:mt-[100px]">
		<div>
			<h1 class="font-boldFont pb-6 text-5xl uppercase">
				{$_(`vorratsmaschinen.übersicht-titel`)}
			</h1>
			<p>{$_(`vorratsmaschinen.übersicht-text`)}</p>
            <p>{$_(`vorratsmaschinen.übersicht-text2`)}</p>
            
		</div>
	</div>
</div>

<div>
	{#await data.vorrat}
		<div>skeleton build</div>
	{:then maschines}	
		<div
			class="mx-2 md:mx-[10%]  py-16 lg:py-[190px] xl:py-[250px]  flex flex-col justify-around flex-wrap gap-8   md:flex-row"
		>
			{#each maschines as maschine}
				<VorratmaschinenCard {maschine} />
			{:else}
				<p class="text-primary uppercase text-7xl">Momentan keine Maschinen auf Vorrat</p>
			{/each}
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>