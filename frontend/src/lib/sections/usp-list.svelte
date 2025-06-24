<script lang="ts">
	import { cn } from '$lib/utils';

	let data: { uspItems: { name: string }[] } = $props();

	let isNameLong = $state<boolean>(false);
	$effect(() => {
		isNameLong = data.uspItems.some(({ name }: { name: string }) => name.length > 50);
	});

	$inspect(data);
</script>

<div
	class="bg-foreground h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
></div>
<section class="bg-foreground w-full">
	<div
		class={cn(
			!isNameLong ? 'sm:w-max' : '',
			'text-secondary container grid grid-cols-1 gap-6 py-16 lg:grid-cols-2 xl:py-24'
		)}
	>
		{#each data.uspItems as item, i}
			<div class="flex gap-2 font-sans text-xl font-semibold sm:text-2xl lg:text-2xl">
				<span class="text-primary">&#x2713; </span>
				<p class="break-words sm:break-normal">
					{item.name}
				</p>
			</div>
		{/each}
	</div>
</section>
<div
	class="bg-foreground h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
></div>
