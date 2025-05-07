<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/state';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { cn, getRedirectLink } from '$lib/utils';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';

	let data: {
		sectionTitle: string;
		previewCards: {
			title: string;
			subtitle: string;
			content: string;
			ctaText: string;
			redirectSlug: string;
			isImageTransparent: boolean;
			thumbnail: ImageAsset;
		}[];
	} = $props();

	let hoveredIndex: number | null = $state(null);
	let overlayRefs: Array<HTMLElement | null> = $state([]);
	let overlayHeights = $state<number[]>([]);

	// Simple object to cache heights per pathname
	const overlayHeightsCache: Record<string, number[]> = {};

	function handleMouseEnter(i: number) {
		hoveredIndex = i;
	}
	function handleMouseLeave() {
		hoveredIndex = null;
	}

	async function updateOverlayHeights() {
		await tick();

		const currentPath = page.url.pathname;
		const heights = overlayHeightsCache[currentPath] ?? [];

		overlayRefs.forEach((el, i) => {
			if (el && (!heights[i] || heights[i] <= 0)) {
				heights[i] = el.clientHeight;
			}
		});

		overlayHeightsCache[currentPath] = heights;
		overlayHeights = heights;
	}

	onMount(() => {
		overlayRefs.forEach((el, i) => {
			if (el) {
				overlayHeights[i] = el.clientHeight;
			}
		});
	});

	$effect(() => {
		const cached = overlayHeightsCache[page.url.pathname];
		if (cached) {
			overlayHeights = cached;
		} else {
			updateOverlayHeights();
		}
	});
</script>

<section class="mb-32 mt-20 px-4 sm:container sm:mx-auto lg:mt-28 xl:my-36">
	<h2 class="font-boldFont mb-12 text-center text-3xl uppercase sm:text-4xl">
		{data.sectionTitle}
	</h2>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
		{#each data.previewCards as card, i}
			<BlurFade once={true} delay={i * 0.1} duration={0.2}>
				<div
					class="relative"
					onmouseenter={() => handleMouseEnter(i)}
					onmouseleave={handleMouseLeave}
					aria-hidden="true"
				>
					<Card.Root
						class="bg-muted-foreground group relative h-[300px] 
						w-full overflow-hidden 
						border-none 
						shadow-[5px_5px_0_#f6a313] transition
						duration-500
						hover:shadow-[10px_10px_0_#f6a313] focus:outline-none lg:h-[400px]
						"
					>
						{#if card.thumbnail}
							<div
								class="absolute z-10 h-full w-full transition duration-300 ease-in-out group-hover:backdrop-blur-sm"
							></div>
							<div
								class={cn(
									card.isImageTransparent ? 'px-4 pb-[80px] pt-4' : '',
									'relative h-full w-full'
								)}
							>
								<img
									class="mx-auto h-full"
									src={!PUBLIC_BACKEND_URL.includes('https')
										? `${PUBLIC_BACKEND_URL}${card.thumbnail.formats['large']?.url || card.thumbnail.url}`
										: card.thumbnail.url}
									alt={card.thumbnail.alternativeText}
								/>
							</div>
						{/if}

						<div
							bind:this={overlayRefs[i]}
							class="
							absolute
							bottom-0
							left-0
							right-0
							z-20
							w-full
							overflow-hidden
						"
							style="
							transform: translateY({hoveredIndex === i ? '0px' : overlayHeights[i] - 64 + 'px'});
							transition: transform 0.2s ease-in-out;
						"
						>
							<Card.Header class="p-0">
								<Card.Title
									class="bg-foreground w-full [clip-path:polygon(0%_0%,60%_0%,80%_100%,0%_100%)]"
								>
									<h3 class="font-boldFont text-secondary p-5">{card.title}</h3>
								</Card.Title>
							</Card.Header>

							<Card.Content class="bg-foreground px-5 pt-2">
								{#if card.subtitle}
									<h4 class="text-primary mb-1 font-sans font-medium">
										{card.subtitle}
									</h4>
								{/if}
								<p
									class={cn(
										card.subtitle ? '' : 'mt-3',
										'prose text-secondary text-justify font-sans text-xs font-medium'
									)}
								>
									{@html card.content}
								</p>
							</Card.Content>

							<Card.Footer class="bg-foreground">
								<Button href={getRedirectLink(card.redirectSlug)}>
									<span class="skew-x-[15deg]">{card.ctaText}</span>
								</Button>
							</Card.Footer>
						</div>
					</Card.Root>
				</div>
			</BlurFade>
		{/each}
	</div>
</section>
