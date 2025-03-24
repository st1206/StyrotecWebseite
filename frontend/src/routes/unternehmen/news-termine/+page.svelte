<!-- News Seite -->
<script lang="ts">
	import AnwenderCarousel from '$lib/components/anwenderCarousel.svelte';
	import MessenCard from '$lib/components/messenCard.svelte';
	
	import header from '$lib/assets/images/news/messestand.jpg'
	import { _ } from 'svelte-i18n';
	import CardCarousel from '$lib/components/cardCarousel.svelte';
	let { data } = $props();
</script>



<div class="[clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)] bg-gradient-to-r from-amber-500 to-amber-200">
	<img src={header} alt="messestand" class="w-full h-[600px] object-cover">
</div>

<div class="p-4 md:p-10 xl:p-20 xl:mx-[300px]">
	<h1 class="text-xl lg:text-2xl xl:text-5xl ml-3 my-4 uppercase font-boldFont"> {$_('news.header-titel')}</h1>
	<p class="text-lg lg:text-xl text-justify">{$_('news.header-text')}</p>
</div>




<!-- Kundengeschichte -->
 <!--
<div class="from-secondary to-primary-foreground h-[100px] bg-gradient-to-b" id="anwenderstories"></div>
<div class="bg-primary-foreground  h-[1200px]" >
	{#await data.anwenderstories}
		<div>waiting for data</div>
	{:then anwenderstories}
        <div class="text-5xl text-secondary text-center uppercase p-12">{$_('news.kundengeschichten')}</div>
		<div class="flex justify-around">
			{#if anwenderstories.length !== 0}
				<div class="relative xl:top-[100px] overflow-hidden">
					<AnwenderCarousel anwenderstorie={anwenderstories[0]}/>
				</div>
			{:else}
				<div class="mt-64"> no stories yet</div>
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>
-->

<div class="h-[100px]" id="referenzen"></div>

<!-- TODO: Referenzen -->
<div class="bg-secondary py-6 md:py-12 lg:py-20 xl:py-32" >
	{#await data.referenzen}
		<div class="text-primary">waiting for data</div>
	{:then referenzen}
        <div class="text-3xl md:text-4xl lg:text-5xl text-primary-foreground font-boldFont uppercase text-center pb-4 md:pb-12 lg:pb-16 xl:pb-24"> {$_('news.referenzen')} </div>
			{#if referenzen.length !== 0}
				<div class="xl:top-[100px] text-primary">
					<CardCarousel referenzen={referenzen} />
				</div>
			{:else}
				<div class="mt-64 text-primary"> no referenzen yet hello</div>
			{/if}

	{:catch}
		Server Error...
	{/await}
</div>

<div class="h-[100px]" id="messen"></div>

<!-- TODO: Messen -->
<div class="bg-primary-foreground h-auto py-6 md:py-12 lg:py-20 xl:py-32 px-[5%]" >
	{#await data.messens}
		<div>waiting for data</div>
	{:then messen}
        <div class="text-3xl md:text-4xl lg:text-5xl uppercase font-boldFont text-secondary text-center pb-4 md:pb-12 lg:pb-16 xl:pb-24"> {$_('news.messen')} </div>
		<div class="flex flex-col md:flex-row flex-wrap gap-10 justify-around ">
			
				{#if messen.length === 1}
					
						<MessenCard messe={messen[0]} />
					
				{:else}
					
						{#each messen as messe}  {#if messe.Messename !== "Momentan Keine Messe"} <MessenCard {messe} />{/if}{/each}
					
				{/if}
			
			
		</div>
	{:catch}
		Server Error...
	{/await}
</div>
