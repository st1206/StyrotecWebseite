<script lang='ts'>
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import MaschinenCard from '$lib/sections/maschinenCard.svelte';
    let { data }= $props();
    console.log(data);
</script>


<div class="pt-20">
    {#await data.maschines}
		<div> skeleton build </div>
			
		{:then maschines} 
			<MaschinenCard {maschines} />
		{:catch}
			SERVER ERROR...
	{/await}
</div>