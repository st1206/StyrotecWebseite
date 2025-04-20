<script lang="ts">
	let data = $props();
</script>

<section class="bg-primary-foreground w-full">
	<div
		class="container grid w-max grid-cols-1 grid-rows-3 gap-6 px-8 py-16 text-white lg:grid-cols-2 xl:py-24"
	>
		{#each data as item, i}
			<div class="font-boldFont text-xl md:text-xl lg:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713; </span>
				{item.name}
			</div>
		{/each}
	</div>
</section>
