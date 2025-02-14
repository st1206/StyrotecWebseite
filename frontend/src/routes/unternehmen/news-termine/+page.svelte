<!-- News Seite -->
<script lang="ts">
	import MessenCarousel from '$lib/components/messenCarousel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { _ } from 'svelte-i18n';
	let { data } = $props();
</script>

<!-- Todo: Anwenderstories --- aus header menü an diesen Punkt springen -->

<!-- Weiterleitung mit [slug] zu anwenderstories seite-->
<!-- Frage: soll jede Seite gleich sein also anwenderstories, referenzen, berichte und Messen? -->
<div class="bg-primary h-[1200px]" id="anwenderstories"></div>

<!-- TODO: Referenzen --- aus header menü an diesen Punkt springen-->
<div class="bg-primary-foreground h-[1200px]" id="referenzen"></div>

<!-- TODO: Berichte --- aus header menü an diesen Punkt springen-->
<div class="bg-primary h-[1200px]" id="berichte"></div>

<!-- TODO: Messen  --- aus header menü an diesen Punkt springen-->
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
