<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { innerWidth } from 'svelte/reactivity/window';

	let data = $props();

	let overlayRefs: Array<HTMLElement | null> = $state([]);
	const overlayHeightsMap = new SvelteMap<string, number[]>([]);
	let overlayHeights = $state<number[]>([]);

	async function updateOverlayHeights() {
		await tick();

		overlayRefs.forEach((el, i) => {
			if (el) {
				const heights = overlayHeightsMap.get(page.url.pathname) ?? [];
				if (!heights[i] || heights[i] <= 0) {
					heights[i] = el.clientHeight;
					overlayHeightsMap.set(page.url.pathname, [...heights]);
				}
			}
		});
	}

	$effect(() => {
		overlayHeights = overlayHeightsMap.get(page.url.pathname) ?? [];
	});

	onMount(() => {
		updateOverlayHeights();
	});
</script>

<!-- Decorative top edge -->
<div
	class="bg-foreground mt-20 h-16 w-full [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
></div>

<section class="bg-foreground w-full pb-16 pt-8 sm:mx-auto">
	<h3 class="font-boldFont text-secondary mb-12 text-center text-3xl uppercase md:text-4xl">
		{data.sectionTitle}
	</h3>

	<div class="mx-10 flex flex-col gap-20 px-2 sm:container xl:px-48">
		<Accordion.Root
			type="single"
			class="flex w-full flex-col gap-2"
			onValueChange={updateOverlayHeights}
		>
			{#each data.options as option, i}
				<BlurFade once={true} delay={0.1 + i * 0.1} duration={0.2}>
					<Accordion.Item value={`item-${i + 1}`}>
						<Accordion.Trigger class="text-secondary font-sans font-medium">
							<h4>{option.title}</h4>
						</Accordion.Trigger>
						<Accordion.Content class="bg-secondary/5 pt-2">
							<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								{#each option.optionItems as item, j}
									<div class="h-full" bind:this={overlayRefs[i]}>
										<Card.Root class="bg-secondary/5 h-full px-0">
											{#if item.image}
												<img
													class="h-[260px] w-full object-contain"
													src={!PUBLIC_BACKEND_URL.includes('https')
														? `${PUBLIC_BACKEND_URL}${item.image.formats['large']?.url || item.image.url}`
														: item.image.url}
													alt={item.image.alternativeText}
												/>
											{/if}
											<Card.Header class="mt-12 p-0">
												<Card.Title
													class={cn(
														item.title?.length > 15
															? '[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)]'
															: '[clip-path:polygon(0%_0%,50%_0%,70%_100%,0%_100%)]',
														'bg-secondary w-full '
													)}
												>
													<h3 class="font-boldFont text-foreground p-4">{item.title}</h3>
												</Card.Title>
											</Card.Header>

											<Card.Content
												class={cn(item.subtitle ? 'pt-3' : '', 'bg-secondary px-4')}
												style={`height: ${(innerWidth?.current ?? 0) < 976 ? 'auto' : (overlayHeights[i] ?? 0) - 364 + 'px'}`}
											>
												{#if item.subtitle}
													<h4 class="text-primary mb-1 font-sans font-medium">
														{item.subtitle}
													</h4>
												{/if}
												<p class="prose text-justify font-sans text-xs font-medium">
													{@html item.description}
												</p>
											</Card.Content>
										</Card.Root>
									</div>
								{/each}
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</BlurFade>
			{/each}
		</Accordion.Root>
	</div>
</section>

<!-- Decorative bottom edge -->
<div class="bg-foreground mb-32 h-16 w-full [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
