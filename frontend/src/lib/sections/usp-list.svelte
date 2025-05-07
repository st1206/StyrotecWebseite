<script lang="ts">
	import { cn } from '$lib/utils';

	let data: { name: string }[] = $props();

	let isNameLong = $state<boolean>(false);
	$effect(() => {
		isNameLong = data.some(({ name }: { name: string }) => name.length > 50);
	});
</script>

<div class="bg-foreground h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)]"></div>
<section class="bg-foreground w-full">
	<div
		class={cn(
			!isNameLong ? 'sm:w-max' : '',
			'text-secondary container grid grid-cols-1 gap-y-6 py-16 lg:grid-cols-2 xl:py-24'
		)}
	>
		{#each data as item, i}
			<div class="font-boldFont flex gap-2 text-xl sm:text-2xl lg:text-2xl xl:text-3xl">
				<span class="text-primary">&#x2713; </span>
				<p class="break-words sm:break-normal">
					{item.name}
				</p>
			</div>
		{/each}
	</div>
</section>
<div class="bg-foreground h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
