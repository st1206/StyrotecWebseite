<script lang="ts">
	import type { ApiMessenMessen } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	let { messe }: { messe: AttributesOf<ApiMessenMessen> } = $props();
</script>

<a href={messe.MesseLink} target="_blank">
<div
	
	class="bg-secondary  shadow-[10px_10px_20px_rgba(0,0,0,0.75)] bg-center rounded-lg hover:scale-105 md:w-[350px] lg:w-[420px] xl:w-[600px]"
	style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
	
							? `${PUBLIC_BACKEND_URL}${messe.Bilder[0].url}`
							: messe.Bilder[0].url})"
>
	<div class="bg-secondary/65 md:w-[350px] lg:w-[420px] xl:w-[600px] rounded-lg">
		<div class="p-12 ">
			<h5 class="left-0 top-0 text-5xl font-bold  text-primary-foreground">	
				{messe.Messename} 	
			</h5>
			<div class="text-xl">
				{#if messe.Messename !== "Momentan Keine Messe"} 
					{messe.Messeanfang.split("-").reverse().join(".")} - {messe.Messeende.split("-").reverse().join(".")} 
				{/if}

			</div>
			
			<div class="text-2xl font-boldFont mt-24">
				{#if messe.Messestand !== "Kein Stand"}
					{$_('news.messestand')}: {messe.Messestand}
				{/if}
			</div>
		</div>
	</div>
</div>
</a>