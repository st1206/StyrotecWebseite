<script lang="ts">
	import type { ApiMessenMessen } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	let { messe }: { messe: AttributesOf<ApiMessenMessen> } = $props();
	console.log(messe)
</script>

<a href={messe.MesseLink} target="_blank">
<Card
	
	class="bg-secondary w-[450px] h-[310px] shadow-[10px_10px_20px_rgba(0,0,0,0.75)] bg-center hover:scale-105 xl:w-[450px]"
	style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
	
							? `${PUBLIC_BACKEND_URL}${messe.Bilder[0].url}`
							: messe.Bilder[0].url})"
	padding= "none"
	size= "md"
							
>
	<div class="bg-secondary/65 w-[310px] h-[310px] xl:w-[450px] rounded-lg">
		<div class="p-12">
			<h5 class="left-0 top-0 text-5xl font-bold  text-primary-foreground">	
				{messe.Messename} 	
			</h5>
			<div class="text-xl">
				{#if messe.Messename !== "Momentan Keine Messe"} 
					{messe.Messeanfang.split("-").reverse().join(".")} - {messe.Messeende.split("-").reverse().join(".")} 
				{/if}

			</div>
			
			<div class="text-2xl font-boldFont mt-24">
				{$_('news.messestand')}: {messe.Messestand}
			</div>
		</div>
	</div>
</Card>
</a>