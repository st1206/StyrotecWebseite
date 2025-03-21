<script lang="ts">
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let { maschine } = $props();
</script>


<a href={`/produkte/gebrauchtmaschinen/cnc-maschinen/${maschine.slug}`}>
	<div 
		class="w-[400px] h-[400px] md:w-[450px] md:h-[450px] rounded-lg bg-cover bg-center" 
		style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${maschine.Bilder[0].url}`
					: maschine.Bilder[0].formats.small.url})">
			<div class="bg-primary-foreground bg-opacity-50 h-full w-full rounded-lg p-12 text-secondary">
				<h1 class="left-0 top-0 mb-2 text-5xl font-bold ">
						{maschine.Titel} 
				</h1>
				<h2 class="text-4xl">{maschine.Bezeichnung}</h2>
				<span class="text-xl ">Baujahr: {maschine.Baujahr}</span>
				
			</div>

			
	</div>
</a>

