<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	let data = $props();

	let hoveredIndex: number | null = $state(null);
	let overlayRefs: Array<HTMLElement | null> = $state([]);
	let overlayHeights: number[] = $state([]);

	function handleMouseEnter(i: number) {
		hoveredIndex = i;
	}
	function handleMouseLeave() {
		hoveredIndex = null;
	}

	onMount(() => {
		overlayRefs.forEach((el, i) => {
			if (el) {
				overlayHeights[i] = el.clientHeight;
			}
		});
	});
</script>

<section class="mb-32 mt-20 sm:container sm:mx-auto lg:mt-28 xl:my-36">
	<h2 class="font-boldFont mb-12 text-center text-3xl uppercase md:text-4xl">
		{data.sectionTitle}
	</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each data.previewCards as card, i}
			<div
				class="relative shadow-md"
				onmouseenter={() => handleMouseEnter(i)}
				onmouseleave={handleMouseLeave}
				aria-hidden="true"
			>
				<Card.Root
					class="group relative h-[300px] 
						w-full 
						overflow-hidden 
						shadow-[5px_5px_0_transparent] transition 
						duration-500 
						hover:shadow-[8px_8px_0_#f6a313]
						focus:outline-none
						lg:h-[400px]
						"
				>
					{#if card.thumbnail}
						<img
							class="absolute inset-0 h-full w-full object-cover object-center"
							src={!PUBLIC_BACKEND_URL.includes('https')
								? `${PUBLIC_BACKEND_URL}${card.thumbnail.formats['large']?.url || card.thumbnail.url}`
								: card.thumbnail.url}
							alt={card.thumbnail.alternativeText}
						/>
					{/if}

					<div
						bind:this={overlayRefs[i]}
						class="
							absolute
							bottom-0
							left-0
							right-0
							overflow-hidden
							bg-white
							shadow-lg
						"
						style="
							transform: translateY({hoveredIndex === i ? '0px' : overlayHeights[i] - 72 + 'px'});
							transition: transform 0.2s ease-in-out;
						"
					>
						<Card.Header>
							<Card.Title class="flex items-end justify-between">
								<h3 class="font-boldFont">{card.title}</h3>
								<h4 class="text-primary text-end font-sans text-sm font-medium tracking-wide">
									Portalfräsmaschinen
								</h4>
							</Card.Title>
						</Card.Header>

						<Card.Content class="prose text-justify font-sans text-xs font-medium">
							{@html card.content}
						</Card.Content>

						<Card.Footer class="mt-2">
							<Button class="text-md hover:shadow-[5px_5px_0_black]">
								<span class="skew-x-[15deg]">{card.ctaText}</span>
							</Button>
						</Card.Footer>
					</div>
				</Card.Root>
			</div>
		{/each}
	</div>
</section>
