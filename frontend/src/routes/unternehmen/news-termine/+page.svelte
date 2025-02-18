<!-- News Seite -->
<script lang="ts">
	import AnwenderCarousel from '$lib/components/anwenderCarousel.svelte';
	import BerichteCarousel from '$lib/components/berichteCarousel.svelte';
	import MessenCarousel from '$lib/components/messenCarousel.svelte';
	import ReferenzCarousel from '$lib/components/referenzCarousel.svelte';
	import { _ } from 'svelte-i18n';
	let { data } = $props();
</script>

<!-- Todo: Anwenderstories -->

<!-- Weiterleitung mit [slug] zu anwenderstories seite-->
<!-- Frage: soll jede Seite gleich sein also anwenderstories, referenzen, berichte und Messen? -->
<div class="bg-primary mt-[64px] h-[1200px]" id="anwenderstories">
	{#await data.anwenderstories}
		<div>waiting for data</div>
	{:then anwenderstories}
        <div class="text-3xl text-secondary ">Hier sind Geschichten von Kunden</div>
		<div class="flex justify-around">
			{#if anwenderstories.length !== 0}
				<div class="relative xl:top-[100px]">
					<AnwenderCarousel anwenderstorie={anwenderstories[0]} />
				</div>
			{:else}
				<div class="mt-64"> no stories yet</div>
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>

<!-- TODO: Referenzen -->
<div class="bg-primary-foreground h-[1200px]" id="referenzen">
	{#await data.referenzen}
		<div class="text-primary">waiting for data</div>
	{:then referenzen}
        <div class="text-3xl text-secondary "> Referenzen </div>
		<div class="flex justify-around">
			{#if referenzen.length !== 0}
				<div class="relative xl:top-[100px] text-primary">
					<ReferenzCarousel referenz={referenzen[0]} />
				</div>
			{:else}
				<div class="mt-64 text-primary"> no referenzen yet hello</div>
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>

<!-- TODO: Berichte -->
<div class="bg-primary h-[1200px]" id="berichte">
	{#await data.berichte}
		<div class="text-primary">waiting for data</div>
	{:then berichte}
        <div class="text-3xl text-secondary "> Berichte </div>
		<div class="flex justify-around">
			{#if berichte.length !== 0}
				<div class="relative xl:top-[100px] text-primary">
					<BerichteCarousel bericht={berichte[0]} />
				</div>
			{:else}
				<div class="mt-64 text-primary-foreground"> no stories yet hello</div>
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>

<!-- TODO: Messen -->
<div class="bg-primary-foreground h-[1200px]" id="messen">
	{#await data.messens}
		<div>waiting for data</div>
	{:then messen}
        <div class="text-3xl text-secondary "> Dieses Jahr sind wir auf Folgenden Messen aufzufinden, Wir freuen uns auf ihren Besuch an unseren Ständen !! </div>
		<div class="flex justify-around">
			{#if messen.length === 1}
				<div class="relative xl:top-[100px]">
					<MessenCarousel messe={messen[0]} />
				</div>
			{:else}
				<div class="relative flex flex-col flex-wrap  gap-3 xl:top-[100px] xl:flex-row">
					{#each messen as messe}  {#if messe.Messename !== "Momentan Keine Messe"} <MessenCarousel {messe} />{/if}{/each}
				</div>
			{/if}
		</div>
	{:catch}
		Server Error...
	{/await}
</div>
