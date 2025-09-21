<script lang="ts">
	import { cn } from '$lib/utils';
	import { SafeData } from '$lib/utils/validation';

	let data: {
		uspItems: { name?: string; title?: string; content?: string }[];
	} = $props();

	const safe = new SafeData(data);

	const validUspItems = $derived(
		safe
			.getArray('uspItems', [])
			.filter((item) => item && typeof item === 'object')
			.map((item) => {
				const itemSafe = new SafeData(item);
				const name = itemSafe.getString('name') || itemSafe.getString('title');
				const content = itemSafe.getString('content');

				return {
					name: name || 'Untitled USP',
					content,
					hasContent: Boolean(content)
				};
			})
			.filter((item) => item.name && item.name.trim().length > 0)
	);

	const hasValidItems = $derived(validUspItems.length > 0);
	const isNameLong = $derived(validUspItems.some((item) => item.name.length > 50));
</script>

<div
	class="bg-foreground h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
></div>

<section class="bg-foreground w-full">
	<div class="container py-16 xl:py-24">
		{#if hasValidItems}
			<div
				class={cn(
					!isNameLong ? 'sm:w-max' : '',
					'text-secondary mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2'
				)}
			>
				{#each validUspItems as item}
					<div class="flex gap-3 font-sans text-xl font-semibold sm:text-2xl lg:text-2xl">
						<span class="text-primary mt-1 flex-shrink-0">&#x2713;</span>
						<div class="flex-1">
							<p class="break-words sm:break-normal">
								{#if (item.name || '').includes('<')}
									{@html item.name}
								{:else}
									{item.name}
								{/if}
							</p>
							{#if item.hasContent}
								<div
									class="prose prose-sm prose-neutral text-secondary/80 mt-2 max-w-none font-normal"
								>
									{#if (item.content || '').includes('<')}
										{@html item.content}
									{:else}
										<p>{item.content}</p>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- No valid USP items fallback -->
			<div class="py-12 text-center">
				<div
					class="bg-secondary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg"
				>
					<svg
						class="text-secondary/60 h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-secondary/80 mb-2 text-lg font-semibold">No USP items available</h3>
				<p class="text-secondary/60 text-sm">No USP items were provided for this section</p>
			</div>
		{/if}
	</div>
</section>

<div
	class="bg-foreground h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
></div>
