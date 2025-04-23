<script lang="ts">
	import { cn } from '$lib/utils';

	let data = $props();
</script>

<div class="bg-foreground h-16 w-full [clip-path:polygon(100%_0,100%_100%,0_100%)]"></div>
<section class="bg-foreground w-full">
	<div
		class={cn(
			false ? 'w-max' : '',
			'container grid grid-cols-1 gap-8 gap-x-16 px-24 py-16 text-secondary lg:grid-cols-2 xl:py-24'
		)}
	>
		{#each data as item, i}
			<div class="font-boldFont flex gap-2 text-xl md:text-xl lg:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713; </span>
				<p>{item.name}</p>
			</div>
		{/each}
	</div>
</section>
<div class="bg-foreground h-16 w-full [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
