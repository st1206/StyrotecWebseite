<script lang='ts'>
	
	import MaschinenCard from '$lib/sections/maschinenCard.svelte';
    let { data }= $props();
    
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div class="p-20 px-[20%] pb-80">

    {#await data.maschines}
		<div> skeleton build </div>
			
	{:then maschines} 
		<MaschinenCard {maschines} />
	{:catch}
		SERVER ERROR...
	{/await}
</div>