<script lang="ts">
	let data = $props();
</script>

<section class="w-full bg-primary-foreground">
	<div class="container grid w-max grid-cols-2 grid-rows-3 gap-6 p-8 py-28 text-white">
		{#each data as item, i}
			<div class="font-boldFont text-xl md:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713; </span>
				{item.name}
			</div>
		{/each}
	</div>
</section>
