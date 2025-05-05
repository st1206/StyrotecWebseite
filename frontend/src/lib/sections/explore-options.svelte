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
	import * as Table from '$lib/components/ui/table';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';

	type OptionTextImage = {
		sectionTitle: string;
		accordions: {
			title: string;
			accordionItems: {
				title: string;
				subtitle: string;
				description: string;
				image: ImageAsset;
				sortOrder: number;
			}[];
			sortOrder: number;
		}[];
		sortOrder: number;
	};

	type Table = {
		title: string;
		tableColumns: {
			columnLabel: string;
			tableRows: {
				rowLabel: string;
				rowValue: string;
			}[];
		}[];
		sortOrder: number;
	};

	type ComponentData = { __component: string } & (OptionTextImage | Table);

	let data: ComponentData[] = $props();

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

	const snapshot = $state.snapshot(data);
	const sortedBlocks: ComponentData[] = $derived.by(() => {
		return Object.values(snapshot).sort((a, b) => {
			const orderA = a.sortOrder ?? 0;
			const orderB = b.sortOrder ?? 0;
			return orderA - orderB;
		});
	});
</script>

<div
	class="bg-foreground mt-20 h-16 w-full [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
></div>

<section class="bg-foreground w-full pb-16 pt-8 sm:mx-auto">
	{#if sortedBlocks?.length}
		<h3 class="font-boldFont text-secondary mb-12 text-center text-3xl uppercase md:text-4xl">
			{(sortedBlocks[0] as OptionTextImage).sectionTitle}
		</h3>

		<div class="flex flex-col gap-20 px-2 sm:container xl:px-48">
			<Accordion.Root
				type="multiple"
				value={['item-1']}
				class="flex w-full flex-col gap-4"
				onValueChange={updateOverlayHeights}
			>
				{#each sortedBlocks as block, i}
					{#if block.__component === 'partial-components.option-text-image'}
						<!-- Text-Image Block -->
						{@const component = block as OptionTextImage}
						{#each component.accordions as accordion, j}
							<BlurFade once={true} delay={0.1 + j * 0.1} duration={0.2}>
								<Accordion.Item value={`item-${i + 1}`}>
									<Accordion.Trigger class="text-secondary font-sans font-medium">
										<h4>{accordion.title}</h4>
									</Accordion.Trigger>
									<Accordion.Content class="bg-secondary/5 pt-2">
										<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
											{#each accordion.accordionItems as item, k}
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
															class={cn(item.subtitle ? 'pt-4' : '', 'bg-secondary px-4')}
															style={`height: ${(innerWidth?.current ?? 0) < 976 ? 'auto' : (overlayHeights[i] ?? 0) - 364 + 'px'}`}
														>
															{#if item.subtitle}
																<h4 class="text-primary text-md mb-1 font-sans font-medium">
																	{item.subtitle}
																</h4>
															{/if}
															<p class="prose-sm text-justify font-sans">
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
					{:else if block.__component === 'partial-components.option-table'}
						<!-- Table Block -->
						{@const component = block as Table}
						<BlurFade once={true} delay={0.1 + i * 0.1} duration={0.2}>
							<Accordion.Item value={`item-${i + 1}`}>
								<Accordion.Trigger class="text-secondary font-sans font-medium">
									<h4>{component.title}</h4>
								</Accordion.Trigger>
								<Accordion.Content class="bg-secondary/5 pt-2">
									<div class="overflow-x-auto">
										<Table.Root>
											<Table.Header>
												<Table.Row
													class="bg-secondary/10 hover:bg-secondary/15 border-secondary/20"
												>
													<Table.Head class="text-secondary"></Table.Head>
													{#each component.tableColumns as column}
														<Table.Head class="text-secondary font-boldFont text-center">
															{column.columnLabel}
														</Table.Head>
													{/each}
												</Table.Row>
											</Table.Header>
											<Table.Body class="text-secondary">
												{#each component.tableColumns[0].tableRows as row, idx}
													<Table.Row class="hover:bg-secondary/5 border-secondary/20">
														<Table.Cell class="bg-secondary/10 w-[100px] sm:w-[150px]">
															{row.rowLabel}
														</Table.Cell>
														{#each component.tableColumns as column}
															<Table.Cell class="min-w-[100px] text-center font-medium">
																{column.tableRows[idx].rowValue}
															</Table.Cell>
														{/each}
													</Table.Row>
												{/each}
											</Table.Body>
										</Table.Root>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</BlurFade>
					{/if}
				{/each}
			</Accordion.Root>
		</div>
	{/if}
</section>

<div class="bg-foreground mb-32 h-16 w-full [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
