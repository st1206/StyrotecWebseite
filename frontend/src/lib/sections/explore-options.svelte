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
	import { SafeData } from '$lib/validation';
	import { optimizeImageUrl, handleImageError } from '$lib/image';
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';

	type Accordion = {
		__component: 'partial-components.accordion';
		sectionTitle: string;
		title: string;
		accordionItems: {
			title: string;
			subtitle: string;
			description: string;
			image: ImageAsset | null;
			sortOrder: number;
			isImageTransparent: boolean;
		}[];
		sortOrder: number;
	};

	type Table = {
		__component: 'partial-components.table';
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

	type ComponentData = Accordion | Table;

	// Updated type to handle both object and array data structures
	let data: (ComponentData | null)[] | Record<string, any> = $props();

	let overlayRefs: Array<HTMLElement | null> = $state([]);
	const overlayHeightsMap = new SvelteMap<string, number[]>([]);
	let overlayHeights = $state<number[]>([]);

	async function updateOverlayHeights() {
		await tick();
		const currentHeights = overlayHeightsMap.get(page.url.pathname) ?? [];
		let needsUpdate = false;

		overlayRefs.forEach((el, i) => {
			if (el && (!currentHeights[i] || currentHeights[i] <= 0)) {
				currentHeights[i] = el.clientHeight;
				needsUpdate = true;
			}
		});

		if (needsUpdate) {
			overlayHeightsMap.set(page.url.pathname, [...currentHeights]);
		}
	}

	$effect(() => {
		overlayHeights = overlayHeightsMap.get(page.url.pathname) ?? [];
	});

	onMount(() => {
		updateOverlayHeights();
	});

	// Convert object data to array format for processing
	const dataArray = $derived(
		(() => {
			if (Array.isArray(data)) {
				return data;
			}

			if (data && typeof data === 'object') {
				// Extract all numeric keys and convert to array
				const numericKeys = Object.keys(data)
					.filter((key) => !isNaN(Number(key)))
					.sort((a, b) => Number(a) - Number(b));

				return numericKeys.map((key) => data[key]).filter(Boolean);
			}

			return [];
		})()
	);

	const sortedBlocks = $derived(
		dataArray
			.flatMap((block): ComponentData[] => {
				if (!block?.__component) return [];

				const blockSafe = new SafeData(block);

				if (block.__component === 'partial-components.accordion') {
					const accordionItems = blockSafe
						.getArray('accordionItems', [])
						.flatMap((item: any) => {
							if (!item) return [];

							const itemSafe = new SafeData(item);
							const title = itemSafe.getString('title');
							if (!title) return [];

							return [
								{
									title,
									subtitle: itemSafe.getString('subtitle'),
									description: itemSafe.getString('description'),
									image: itemSafe.getObject<ImageAsset>('image'),
									sortOrder: itemSafe.getNumber('sortOrder'),
									isImageTransparent: itemSafe.getBoolean('isImageTransparent') || true
								}
							];
						})
						.sort((a, b) => a.sortOrder - b.sortOrder);

					return [
						{
							...block,
							sectionTitle: blockSafe.getString('sectionTitle'),
							title: blockSafe.getString('title', 'Options'),
							accordionItems,
							sortOrder: blockSafe.getNumber('sortOrder')
						}
					];
				}

				if (block.__component === 'partial-components.table') {
					return [
						{
							...block,
							title: blockSafe.getString('title', 'Table'),
							sortOrder: blockSafe.getNumber('sortOrder')
						}
					];
				}

				return [];
			})
			.sort((a, b) => a.sortOrder - b.sortOrder)
	);

	const sectionTitle = $derived(
		(
			sortedBlocks.find((b) => b.__component === 'partial-components.accordion') as
				| Accordion
				| undefined
		)?.sectionTitle || ''
	);
</script>

<div
	class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
></div>

<section class="bg-foreground w-full py-16 sm:mx-auto">
	{#if sortedBlocks.length > 0}
		{#if sectionTitle}
			<h3
				class="text-secondary mb-12 text-center font-sans text-3xl font-bold uppercase md:text-4xl"
			>
				{sectionTitle}
			</h3>
		{/if}

		<div class="flex flex-col gap-20 px-2 sm:container xl:px-48">
			<Accordion.Root
				type="multiple"
				value={['item-1']}
				class="flex w-full flex-col gap-4"
				onValueChange={updateOverlayHeights}
			>
				{#each sortedBlocks as block, i}
					{#if block.__component === 'partial-components.accordion'}
						{@const component = block}
						<BlurFade once={true} delay={0.1 + i * 0.1} duration={0.2}>
							<Accordion.Item value={`item-${i + 1}`}>
								<Accordion.Trigger class="text-secondary font-sans font-medium">
									<h4>{component.title}</h4>
								</Accordion.Trigger>
								<Accordion.Content class="bg-secondary/5 pt-2">
									{#if component.accordionItems.length > 0}
										<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
											{#each component.accordionItems as item, k}
												<div class="h-full" bind:this={overlayRefs[i]}>
													<Card.Root class="bg-secondary/5 h-full px-0">
														{@const imageUrl = optimizeImageUrl(
															new SafeData(item.image).getImageUrl(),
															PUBLIC_BACKEND_URL
														)}
														{#if imageUrl}
															<img
																class={cn(
																	item.isImageTransparent
																		? 'h-[260px] w-full object-contain'
																		: 'h-[260px] w-full object-cover'
																)}
																src={imageUrl}
																alt={item.image?.alternativeText || item.title}
																style="display: block;"
																onerror={handleImageError}
																loading="lazy"
															/>
															<div
																class="bg-secondary/20 text-muted-foreground flex h-[260px] flex-col items-center justify-center"
																style="display: none;"
															>
																<Icons.image class="mb-2 size-12 opacity-50" />
																<p class="px-4 text-center text-sm">
																	{item.title}
																</p>
																<p class="mt-1 text-xs opacity-75">
																	{$_('common.imageNotAvailable') || 'Image not available'}
																</p>
															</div>
														{/if}
														<Card.Header class="mt-12 p-0">
															<Card.Title
																class={cn(
																	item.isImageTransparent && imageUrl
																		? item.title?.length > 15
																			? '[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)]'
																			: '[clip-path:polygon(0%_0%,60%_0%,80%_100%,0%_100%)]'
																		: ''
																)}
															>
																<h3 class="text-secondary p-4 font-sans font-bold">
																	{item.title}
																</h3>
															</Card.Title>
														</Card.Header>

														<Card.Content
															class={cn(
																imageUrl ? 'bg-secondary/10' : '',
																item.isImageTransparent ? 'pt-4' : '',
																'p-4'
															)}
															style={`height: ${(innerWidth.current ?? 0) < 976 ? 'auto' : (overlayHeights[i] ?? 0) - 364 + 'px'}`}
														>
															{#if item.subtitle}
																<h4 class="text-md text-primary mb-1 font-sans font-medium">
																	{item.subtitle}
																</h4>
															{/if}
															<div class="prose-sm text-secondary text-justify font-sans">
																{@html item.description}
															</div>
														</Card.Content>
													</Card.Root>
												</div>
											{/each}
										</div>
									{:else}
										<div class="flex flex-col items-center justify-center py-8 text-center">
											<Icons.list class="mb-4 size-12 opacity-30" />
											<p class="text-secondary/70">
												{$_('accordion.noItems') || 'No items available in this section'}
											</p>
										</div>
									{/if}
								</Accordion.Content>
							</Accordion.Item>
						</BlurFade>
					{:else if block.__component === 'partial-components.table'}
						{@const component = block}
						<BlurFade once={true} delay={0.1 + i * 0.1} duration={0.2}>
							<Accordion.Item value={`item-${i + 1}`}>
								<Accordion.Trigger class="text-secondary font-sans font-medium">
									<h4>{component.title}</h4>
								</Accordion.Trigger>
								<Accordion.Content class="bg-secondary/5 pt-2">
									{#if component.tableColumns?.length > 0 && component.tableColumns[0]?.tableRows?.length > 0}
										<div class="overflow-x-auto">
											<Table.Root>
												<Table.Header>
													<Table.Row
														class="border-secondary/20 bg-secondary/10 hover:bg-secondary/15"
													>
														<Table.Head class="text-secondary"></Table.Head>
														{#each component.tableColumns as column}
															<Table.Head class="text-secondary text-center font-sans font-bold">
																{column.columnLabel}
															</Table.Head>
														{/each}
													</Table.Row>
												</Table.Header>
												<Table.Body class="text-secondary">
													{#each component.tableColumns[0].tableRows as row, idx}
														<Table.Row class="border-secondary/20 hover:bg-secondary/5">
															<Table.Cell class="bg-secondary/10 w-[100px] sm:w-[150px]">
																{row.rowLabel}
															</Table.Cell>
															{#each component.tableColumns as column}
																<Table.Cell class="min-w-[100px] text-center font-medium">
																	{column.tableRows[idx]?.rowValue || '-'}
																</Table.Cell>
															{/each}
														</Table.Row>
													{/each}
												</Table.Body>
											</Table.Root>
										</div>
									{:else}
										<div class="flex flex-col items-center justify-center py-8 text-center">
											<Icons.table class="mb-4 size-12 opacity-30" />
											<p class="text-secondary/70">
												{$_('table.noData') || 'No table data available'}
											</p>
										</div>
									{/if}
								</Accordion.Content>
							</Accordion.Item>
						</BlurFade>
					{/if}
				{/each}
			</Accordion.Root>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<Icons.settings class="mb-4 size-16 opacity-30" />
			<h3 class="text-secondary mb-2 text-lg font-semibold">
				{$_('exploreOptions.noOptions') || 'No options available'}
			</h3>
			<p class="text-secondary/70 max-w-md">
				{$_('exploreOptions.noOptionsDescription') ||
					'Configuration options and details will be displayed here when available.'}
			</p>
		</div>
	{/if}
</section>

<div
	class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
></div>
