<script lang="ts">
	import type { ApiAnwenderstorieAnwenderstorie } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let { anwenderstorie }: { anwenderstorie: AttributesOf<ApiAnwenderstorieAnwenderstorie> } = $props();
</script>

<Card
	class="bg-secondary w-[310px] shadow-[10px_10px_20px_rgba(0,0,0,0.75)]  hover:scale-105 xl:w-[450px]"
>
	<img
		class="relative left-0 top-0 w-[240px] bg-center xl:w-[380px]"
		src={!PUBLIC_BACKEND_URL.includes('https')
			? `${PUBLIC_BACKEND_URL}${anwenderstorie.Bilder[0].url}`
			: anwenderstorie.Bilder[0].formats.small.url}
		alt="bild"
	/>
	<h5 class="left-0 top-0 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        
		{anwenderstorie.Titel} <br>
        {anwenderstorie.Kunde} 
	</h5>
</Card>