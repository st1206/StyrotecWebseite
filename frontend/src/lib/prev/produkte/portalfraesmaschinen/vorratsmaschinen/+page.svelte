<script lang="ts">
	import arbeitsraum from '$lib/assets/images/portalfraesmaschinen/Arbeitsraumabdeckung.jpg';
	import VorratmaschinenCard from '$lib/components/vorratmaschinenCard.svelte';
	import { _ } from 'svelte-i18n';

	let { data } = $props();
</script>

<div class="relative">
	<div
		class="absolute hidden h-[230px] w-[50%] bg-primary-foreground opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] lg:block"
	>
		<h1 class="hidden pl-10 pt-24 font-boldFont text-4xl text-secondary lg:block xl:text-5xl">
			Schlagwort.
		</h1>
	</div>
	<img src={arbeitsraum} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="absolute bottom-0 right-0 hidden h-[200px] w-[40%] bg-primary-foreground [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
	></div>
</div>

<div class="relative text-xl">
	<div class="h-[30px] w-full bg-primary-foreground"></div>
	<img
		src={arbeitsraum}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	/>
	<div
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] bg-gradient-to-bl from-primary-foreground/25 via-primary-foreground/15 to-secondary [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	></div>
	<div
		class="mx-4 ml-[30px] mt-8 pb-3 md:mr-[100px] lg:ml-[80px] lg:mr-[45%] lg:mt-[100px] xl:mr-[45%]"
	>
		<div>
			<h1 class="pb-6 font-boldFont text-5xl uppercase">
				{$_(`vorratsmaschinen.übersicht-titel`)}
			</h1>
			<p>{$_(`vorratsmaschinen.übersicht-text`)}</p>
			<p class="text-justify">{$_(`vorratsmaschinen.übersicht-text2`)}</p>
		</div>
	</div>
</div>

<div>
	{#await data.vorrat}
		<div>skeleton build</div>
	{:then maschines}
		<div
			class="mx-2 flex flex-col flex-wrap justify-around gap-8 py-16 md:mx-[10%] md:flex-row lg:py-[190px] xl:py-[250px]"
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
