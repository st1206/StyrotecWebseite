<script lang='ts'>
	
	import MaschinenCard from '$lib/sections/maschinenCard.svelte';
    let { data }= $props();
    console.log(data);
</script>

<svelte:head>
	<title>CNC-Maschinen Übersicht</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div class="pt-20">
    {#await data.maschines}
		<div> skeleton build </div>
			
	{:then maschines} 
		<MaschinenCard {maschines} />
	{:catch}
		SERVER ERROR...
	{/await}
</div>