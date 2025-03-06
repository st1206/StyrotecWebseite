<script lang="ts">
	import type { ApiMessenMessen } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let { messe }: { messe: AttributesOf<ApiMessenMessen> } = $props();
	
</script>

<Card
	
	class="bg-secondary w-[310px] shadow-[10px_10px_20px_rgba(0,0,0,0.75)]  hover:scale-105 xl:w-[450px] "
	style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
	
							? `${PUBLIC_BACKEND_URL}${messe.Bilder[0].url}`
							: messe.Bilder[0].url})"
							
>
	<div class="bg-secondary/35 w-auto ">

	
	<h5 class="left-0 top-0 mb-2 text-2xl font-bold  text-primary-foreground">
        
		{messe.Messename} <br>
        {#if messe.Messename !== "Momentan Keine Messe"} von {messe.Messeanfang.split("-").reverse().join(".")} bis {messe.Messeende.split("-").reverse().join(".")} {/if}
	</h5>
</div>
</Card>
