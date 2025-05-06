<!-- News Seite -->
<script lang="ts">
	import MessenCard from '$lib/components/messenCard.svelte';
	import header from '$lib/assets/images/news/messestand.jpg';
	import CardCarousel from '$lib/prev/cardCarousel.svelte';
	import { _ } from 'svelte-i18n';

	let { data } = $props();
</script>

<div
	class="bg-gradient-to-r from-amber-500 to-amber-200 [clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]"
>
	<img src={header} alt="messestand" class="h-[600px] w-full object-cover" />
</div>

<div class="p-4 md:p-10 xl:mx-[300px] xl:p-20">
	<h1 class="font-boldFont my-4 ml-3 text-xl uppercase lg:text-2xl xl:text-5xl">
		{$_('news.header-titel')}
	</h1>
	<p class="text-justify text-lg lg:text-xl">{$_('news.header-text')}</p>
</div>

<div class="h-[100px]" id="referenzen"></div>

<!-- TODO: Referenzen -->
<div class="bg-secondary py-6 md:py-12 lg:py-20 xl:py-32">
	{#await data.referenzen}
		<div class="text-primary">waiting for data</div>
	{:then referenzen}
		<div
			class="font-boldFont text-primary-foreground pb-4 text-center text-3xl uppercase md:pb-12 md:text-4xl lg:pb-16 lg:text-5xl xl:pb-24"
		>
			{$_('news.referenzen')}
		</div>
		{#if referenzen.length !== 0}
			<div class="text-primary xl:top-[100px]">
				<CardCarousel {referenzen} />
			</div>
		{:else}
			<div class="text-primary mt-64">no referenzen yet</div>
		{/if}
	{:catch}
		Server Error...
	{/await}
</div>

<div class="h-[100px]" id="messen"></div>

<!-- TODO: Messen -->
<div class="bg-primary-foreground h-auto px-[5%] py-6 md:py-12 lg:py-20 xl:py-32">
	{#await data.messens}
		<div>waiting for data</div>
	{:then messen}
		<div
			class="font-boldFont text-secondary pb-4 text-center text-3xl uppercase md:pb-12 md:text-4xl lg:pb-16 lg:text-5xl xl:pb-24"
		>
			{$_('news.messen')}
		</div>
		<div class="flex flex-col flex-wrap justify-around gap-10 md:flex-row">
			{#if messen.length === 1}
				<MessenCard messe={messen[0]} />
			{:else}
				{#each messen as messe}
					{#if messe.Messename !== 'Momentan Keine Messe'}
						<MessenCard {messe} />{/if}{/each}
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>
