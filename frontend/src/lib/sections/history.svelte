<script lang="ts">
	import { page } from '$app/state';
	import { onMount, tick } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { innerWidth } from 'svelte/reactivity/window';

	interface HistoryEntry {
		title: string;
		description: string;
		year: string | number;
	}

	let data: { sectionTitle: string; historyEntries: HistoryEntry[] } = $props();

	let cardRefs: Array<HTMLElement | null> = $state([]);
	const cardHeightsMap = new SvelteMap<string, number[]>([]);
	let cardHeights = $state<number[]>([]);

	async function updateCardHeights() {
		await tick();

		cardRefs.forEach((el, i) => {
			if (el) {
				const heights = cardHeightsMap.get(page.url.pathname) ?? [];
				if (!heights[i] || heights[i] <= 0) {
					heights[i] = el.clientHeight;
					cardHeightsMap.set(page.url.pathname, [...heights]);
				}
			}
		});
	}

	$effect(() => {
		cardHeights = cardHeightsMap.get(page.url.pathname) ?? [];
	});

	onMount(() => {
		updateCardHeights();
	});
</script>

<section id="historie" class="my-20 scroll-mt-24 px-4 lg:container lg:mx-auto lg:my-32 lg:w-full">
	<div class="mx-auto w-full max-w-6xl">
		{#if data.sectionTitle}
			<!-- Heading -->
			<h2 class="text-foreground mb-16 text-center font-sans text-4xl font-bold uppercase">
				{data.sectionTitle}
			</h2>
		{/if}

		{#each data.historyEntries as item, i}
			<!-- ************* MOBILE (< sm) LAYOUT ************* -->
			<!-- Card column -->
			<div class="flex w-full items-center gap-8 md:hidden">
				<div class="flex flex-col items-center">
					<div
						class="bg-primary w-1"
						style={`height: ${(innerWidth?.current ?? 0) > 768 ? 'auto' : ((cardHeights[i] ?? 0) - 48) / 2 + 'px'}`}
					></div>
					<div class="bg-foreground z-10 flex min-h-12 min-w-12 items-center justify-center">
						<span class="font-boldFont text-foreground text-sm">{item.year}</span>
					</div>
					<div
						class="bg-primary w-1"
						style={`height: ${(innerWidth?.current ?? 0) > 768 ? 'auto' : ((cardHeights[i] ?? 0) - 48) / 2 + 'px'}`}
					></div>
				</div>
				<div
					class="bg-foreground text-secondary shadow-primary h-full w-full p-4 transition duration-300 ease-in-out hover:shadow-[8px_8px_0_#f6a313]"
					bind:this={cardRefs[i]}
				>
					<h3 class="text-md font-sans font-bold uppercase md:text-xl lg:text-2xl">
						{item.title}
					</h3>
					<p class="prose prose-neutral prose-sm text-secondary/80">
						{@html item.description}
					</p>
				</div>
			</div>

			<!-- Spacer for mobile -->
			{#if i < data.historyEntries.length - 1}
				<div class="flex items-center gap-4 md:hidden">
					<div class="flex w-12 justify-center">
						<div class="bg-primary h-10 w-1"></div>
					</div>
				</div>
			{/if}

			<!-- ************* DESKTOP/TABLET (sm AND UP) LAYOUT ************* -->
			<div class="hidden md:grid md:grid-cols-9">
				{#if i % 2 === 0}
					<!-- Left-aligned card -->
					<div class="col-span-4">
						<div
							class="bg-foreground text-secondary shadow-primary p-2 transition duration-300 ease-in-out hover:shadow-[8px_8px_0_#f6a313] md:p-4"
						>
							<h3 class="text-md font-sans font-bold uppercase md:text-xl lg:text-2xl">
								{item.title}
							</h3>
							<p class="prose prose-neutral prose-xs sm:prose-sm text-secondary/80">
								{@html item.description}
							</p>
						</div>
					</div>

					<!-- Timeline column -->
					<div class="relative col-span-1 flex items-center justify-center">
						<div class="bg-primary h-full w-1"></div>
						<div
							class="bg-foreground absolute z-10 flex min-h-12 min-w-12 items-center justify-center"
						>
							<p class="font-boldFont text-primary text-sm">{item.year}</p>
						</div>
					</div>

					<!-- Empty right column -->
					<div class="col-span-4"></div>
				{:else}
					<!-- Empty left column -->
					<div class="col-span-4"></div>

					<!-- Timeline column -->
					<div class="relative col-span-1 flex items-center justify-center">
						<div class="bg-primary h-full w-1"></div>
						<div
							class="bg-foreground absolute z-10 flex min-h-12 min-w-12 items-center justify-center"
						>
							<p class="text-foreground font-sans text-sm font-bold">{item.year}</p>
							<p class="font-boldFont text-primary text-sm">{item.year}</p>
						</div>
					</div>
					<div class="col-span-4">
						<div
							class="bg-foreground text-secondary shadow-primary p-2 transition duration-300 ease-in-out hover:shadow-[8px_8px_0_#f6a313] md:p-4"
						>
							<h3 class="text-md font-sans font-bold uppercase md:text-xl lg:text-2xl">
								{item.title}
							</h3>
							<p class="prose prose-neutral prose-xs sm:prose-sm text-secondary/80">
								{@html item.description}
							</p>
						</div>
					</div>
				{/if}
			</div>

			<!-- Spacer for tablet/desktop -->
			{#if i < data.historyEntries.length - 1}
				<div class="hidden md:grid md:grid-cols-9">
					<div class="col-span-4"></div>
					<div class="col-span-1 flex items-center justify-center">
						<div class="bg-primary h-[50px] w-1"></div>
					</div>
					<div class="col-span-4"></div>
				</div>
			{/if}
		{/each}
	</div>
</section>
