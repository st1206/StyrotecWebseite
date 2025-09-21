<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { page } from '$app/state';
	import {
		getImageAltText,
		getOptimizedImageUrl,
		handleImageError,
		type ImageSize,
		type ImagePosition
	} from '$lib/utils/image';
	import { SafeData } from '$lib/utils/validation';
	import {
		cn,
		handleAccordionViewport,
		resolveRichText,
		type StrapiRichTextNode
	} from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { innerWidth } from 'svelte/reactivity/window';
	import type { Size, SpacerSection } from '$lib/types/sections';
	import Spacer from './spacer.svelte';
	import ImageCardGrid from '$lib/components/image-card-grid.svelte';
	import { Columns } from 'lucide-svelte';

	type TableRow = { rowLabel?: string; rowValue?: string };
	type TableColumn = { columnLabel?: string; tableRows: TableRow[] };

	// --- TYPES ---
	type ContentHeader = {
		sectionTitle: string;
		description: string;
		isDarkMode: boolean;
		sortOrder?: number;
		anchor: string;
	};

	type ContentTable = {
		tables: {
			title: string;
			tableColumns: {
				columnLabel: string;
				tableRows: {
					rowLabel: string;
					rowValue: string;
				}[];
			}[];
			sortOrder?: number;
		}[];
		isDarkMode?: boolean;
		sortOrder?: number;
	};

	type ContentAccordion = {
		title: string;
		accordions: {
			title: string;
			accordionItems: {
				title: string;
				subtitle: string;
				description: string;
				image: ImageAsset;
				sortOrder?: number;
				isImageTransparent: boolean;
			}[];
			sortOrder?: number;
		}[];
		isDarkMode?: boolean;
		sortOrder?: number;
	};

	type ContentImages = {
		title?: string;
		imageCards: {
			title: string;
			image: ImageAsset;
			isImageTransparent: boolean;
			sortOrder?: number;
		}[];
		isDarkMode?: boolean;
		sortOrder?: number;
	};

	type ContentTextImage = {
		title: string;
		content: StrapiRichTextNode[];
		image: ImageAsset;
		imagePosition: 'top' | 'right' | 'bottom' | 'left';
		imageSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		isImageTransparent: boolean;
		isDarkMode?: boolean;
		sortOrder?: number;
	};

	type ContentSpacer = {
		spacer: SpacerSection;
		sortOrder?: number;
	};

	type ComponentData = { __component: string; sortOrder?: number } & (
		| ContentHeader
		| ContentTable
		| ContentAccordion
		| ContentImages
		| ContentTextImage
		| ContentSpacer
	);

	let data: ComponentData[] = $props();

	let overlayRefs: Array<HTMLElement | null> = $state([]);
	const overlayHeightsMap = new SvelteMap<string, number[]>([]);
	let overlayHeights = $state<number[]>([]);

	async function updateOverlayHeights(value?: string) {
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

		if (!value) {
			return;
		}
		handleAccordionViewport(0, value, accordionDivs);
	}

	$effect(() => {
		overlayHeights = overlayHeightsMap.get(page.url.pathname) ?? [];
	});

	onMount(() => {
		updateOverlayHeights();
	});

	const snapshot: { [key: number]: ComponentData } = $state.snapshot(data);
	const sortedBlocks: ComponentData[] = $derived.by(() => {
		const componentData = Object.values(snapshot);
		if (!componentData.length) {
			return [];
		}

		return componentData.sort((a, b) => {
			const orderA = a.sortOrder ?? 0;
			const orderB = b.sortOrder ?? 0;
			return orderA - orderB;
		});
	});

	function isBlockDarkMode(block: ComponentData): boolean {
		return 'isDarkMode' in block ? block.isDarkMode === true : false;
	}

	// needed for accordion viewport change
	let accordionDivs: (HTMLDivElement | null)[] = $state([]);
</script>

<section class="w-full">
	{#if sortedBlocks?.length > 0}
		{#each sortedBlocks as block, i}
			{@const currentIsDark = isBlockDarkMode(block)}
			{@const prevIsDark = i > 0 ? isBlockDarkMode(sortedBlocks[i - 1]) : false}
			{@const nextIsDark =
				i < sortedBlocks.length - 1 ? isBlockDarkMode(sortedBlocks[i + 1]) : false}

			{@const isStartOfDarkGroup = currentIsDark && !prevIsDark}
			{@const isEndOfDarkGroup = currentIsDark && !nextIsDark}

			{#if isStartOfDarkGroup}
				<div
					class="bg-foreground mt-24 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
				></div>
			{/if}

			<div class={cn(currentIsDark ? 'bg-foreground' : '')}>
				<div class="px-4 sm:container 2xl:px-0">
					{#if block.__component === 'partial-components.content-header'}
						{@const componentData = block as ContentHeader}
						{@render HeaderTemplate(componentData)}
					{:else if block.__component === 'partial-components.content-table'}
						{@const componentData = block as ContentTable}
						{@render TableTemplate(componentData)}
					{:else if block.__component === 'partial-components.content-accordion'}
						{@const componentData = block as ContentAccordion}
						{@render AccordionTemplate(componentData)}
					{:else if block.__component === 'partial-components.content-images'}
						{@const componentData = block as ContentImages}
						{@render ImagesTemplate(componentData)}
					{:else if block.__component === 'partial-components.content-text-image'}
						{@const componentData = block as ContentTextImage}
						{@render TextImageTemplate(componentData)}
					{:else if block.__component === 'partial-components.content-spacer'}
						{@const componentData = block as ContentSpacer}
						{@render SpacerTemplate(componentData.spacer)}
					{/if}
				</div>
			</div>

			{#if isEndOfDarkGroup}
				<div
					class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
				></div>
			{/if}
		{/each}
	{:else}
		<div class="sm:container">
			<div class="py-16 text-center">
				<div class="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
					<svg
						class="text-muted-foreground h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<h3 class="text-muted-foreground mb-2 text-lg font-semibold">No content available</h3>
				<p class="text-muted-foreground text-sm">
					No content blocks were provided for this section
				</p>
			</div>
		</div>
	{/if}
</section>

{#snippet HeaderTemplate(block: ContentHeader)}
	{@const safe = new SafeData(block)}
	{@const title = safe.getString('sectionTitle', 'Untitled Section')}
	{@const description = safe.getString('description')}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}
	{@const anchor = safe.getString('anchor')}

	<div
		id={anchor}
		class={cn(isDarkMode ? 'py-16' : 'lg:pt-15 pb-16 pt-28', 'flex flex-col items-center gap-2')}
	>
		<h3
			class={cn(isDarkMode ? 'text-secondary' : 'text-foreground', 'font-sans text-4xl font-bold')}
		>
			{title}
		</h3>
		{#if description}
			<div
				class={cn(
					isDarkMode ? 'text-secondary' : 'text-foreground',
					'prose prose-neutral lg:prose-lg max-w-5xl text-justify'
				)}
			>
				{#if (description || '').includes('<')}
					{@html description}
				{:else}
					<p>{description}</p>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet TableTemplate(block: ContentTable)}
	{@const safe = new SafeData(block)}
	{@const tables = safe.getArray('tables', [])}
	{@const validTables = tables.filter((table: any) => table && typeof table === 'object')}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}

	<!-- NEW: Calculate the total column span required by all tables -->
	{@const totalColumnSpan = validTables.reduce((accumulator, currentTable) => {
		const tableSafe = new SafeData(currentTable);
		const columns = tableSafe.getArray('tableColumns', []);
		// A table takes 2 spans if it has more than one column, otherwise it takes 1
		return accumulator + (columns.length > 1 ? 2 : 1);
	}, 0)}

	{#if validTables.length > 0}
		<div
			class={cn(
				'grid grid-cols-1 gap-4 py-16',
				`md:grid-cols-${totalColumnSpan > 3 ? 4 : totalColumnSpan}`,
				validTables.length <= 1 && 'md:mx-16 lg:mx-36 xl:mx-48'
			)}
		>
			{#each validTables as table}
				{@const tableSafe = new SafeData(table)}
				{@const tableTitle = tableSafe.getString('title')}
				{@const tableColumns = tableSafe.getArray<TableColumn>('tableColumns', [])}
				{@const validColumns = tableColumns.filter(
					(col: any) => col && typeof col === 'object' && 'columnLabel' in col
				)}

				<div
					class={cn(
						validColumns.length > 1 ? 'md:col-span-2' : 'md:col-span-1',
						'mx-auto h-full w-full text-center '
					)}
				>
					{#if tableTitle}
						<h4
							class={cn(
								isDarkMode ? 'text-secondary' : 'text-foreground',
								'my-4 font-sans text-2xl font-bold'
							)}
						>
							{tableTitle}
						</h4>
					{/if}

					{#if validColumns.length > 0}
						{@const firstColumn = validColumns[0]}
						{@const firstColumnSafe = new SafeData(firstColumn)}
						{@const tableRows = firstColumnSafe.getArray<TableRow>('tableRows', [])}
						{@const validRows = tableRows.filter((row: any) => row && typeof row === 'object')}

						{#if validRows.length > 0}
							<div class="overflow-x-auto">
								<Table.Root>
									<Table.Header>
										<Table.Row
											class={cn(
												isDarkMode
													? 'bg-secondary/10 hover:bg-secondary/15'
													: 'bg-foreground/10 hover:bg-foreground/15'
											)}
										>
											<Table.Head class={cn(isDarkMode ? 'text-secondary' : 'text-foreground')}
											></Table.Head>
											{#each validColumns as column}
												{@const columnSafe = new SafeData(column)}
												{@const columnLabel = columnSafe.getString('columnLabel', 'Column')}
												<Table.Head
													class={cn(
														isDarkMode ? 'text-secondary' : 'text-foreground',
														'text-center font-sans font-bold'
													)}
												>
													{columnLabel}
												</Table.Head>
											{/each}
										</Table.Row>
									</Table.Header>
									<Table.Body class={cn(isDarkMode ? 'text-secondary' : 'text-foreground')}>
										{#each validRows as row, idx}
											{@const rowSafe = new SafeData(row)}
											{@const rowLabel = rowSafe.getString('rowLabel', `Row ${idx + 1}`)}

											<Table.Row
												class={cn(
													'border-secondary/20',
													isDarkMode
														? 'hover:bg-secondary/5 even:bg-secondary/5'
														: 'hover:bg-foreground/5 even:bg-foreground/5'
												)}
											>
												<Table.Cell
													class={cn(
														isDarkMode ? 'bg-secondary/10' : 'bg-foreground/10',
														'w-[100px] sm:w-[150px]'
													)}
												>
													{rowLabel}
												</Table.Cell>
												{#each validColumns as column}
													{@const columnSafe = new SafeData(column)}
													{@const columnRows = columnSafe.getArray('tableRows', [])}
													{@const cellData = columnRows[idx]}
													{@const cellSafe = new SafeData(cellData)}
													{@const cellValue = cellSafe.getString('rowValue', '-')}

													<Table.Cell
														class={cn(
															isDarkMode ? 'bg-secondary/5' : '',
															'min-w-[100px] text-center font-medium'
														)}
													>
														{@html cellValue}
													</Table.Cell>
												{/each}
											</Table.Row>
										{/each}
									</Table.Body>
								</Table.Root>
							</div>
						{:else}
							<div class="flex flex-col items-center justify-center py-8 text-center">
								<svg
									class={cn('mb-4 h-12 w-12', isDarkMode ? 'opacity-30' : 'text-muted-foreground')}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-12.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125m-17.25 0h17.25m-17.25 0v-12.75m17.25 12.75v-12.75m0 0H3.375m17.25 0c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125m-1.125-1.125v-1.125m-15 1.125v-1.125m15 0H4.5m15 0v-1.125m-15 1.125v-1.125m12.75 0v-1.125m-10.5 1.125v-1.125"
									/>
								</svg>
								<p class={cn(isDarkMode ? 'text-secondary/70' : 'text-muted-foreground')}>
									No table data available
								</p>
							</div>
						{/if}
					{:else}
						<div class="py-8 text-center">
							<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
								No table columns available
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<div class="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
				<svg
					class="text-muted-foreground h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			</div>
			<h4
				class={cn(isDarkMode ? 'text-secondary' : 'text-foreground', 'mb-2 text-lg font-semibold')}
			>
				No tables available
			</h4>
			<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
				No table data was provided for this section
			</p>
		</div>
	{/if}
{/snippet}

{#snippet AccordionTemplate(block: ContentAccordion)}
	{@const safe = new SafeData(block)}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}

	<div class={cn('h-full w-full py-16 lg:mx-auto')}>
		{#if block.title}
			<h4
				class={cn(
					isDarkMode ? 'text-secondary' : 'text-foreground',
					'my-4 text-center font-sans text-2xl font-bold'
				)}
			>
				{block.title}
			</h4>
		{/if}
		<div bind:this={accordionDivs[0]}>
			<Accordion.Root
				type="single"
				value={'item-1'}
				class="flex w-full flex-col gap-4"
				onValueChange={(value) => updateOverlayHeights(value)}
			>
				{#each block.accordions as accordion, i}
					<Accordion.Item value={`item-${i + 1}`} data-value={`item-${i + 1}`} class="border-none">
						<Accordion.Trigger
							class={cn(
								isDarkMode
									? 'bg-secondary/10 text-secondary hover:bg-secondary/15'
									: 'bg-foreground/10 text-foreground hover:bg-foreground/15',
								'border-primary border-b font-sans font-medium'
							)}
						>
							<h4>{accordion.title}</h4>
						</Accordion.Trigger>
						<Accordion.Content
							class={cn(isDarkMode ? 'bg-secondary/5' : 'bg-foreground/5', 'pt-2')}
						>
							{#if accordion.accordionItems.length > 0}
								<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{#each accordion.accordionItems as item, k}
										<div class="h-full" bind:this={overlayRefs[i]}>
											<Card.Root
												class={cn(isDarkMode ? 'bg-secondary/5' : 'bg-foreground/5', 'h-full px-0')}
											>
												{@const imageUrl = getOptimizedImageUrl(item.image)}
												{#if imageUrl}
													<img
														class={cn(
															item.isImageTransparent
																? 'h-[260px] w-full object-contain'
																: 'h-[260px] w-full object-cover'
														)}
														src={imageUrl}
														alt={getImageAltText(item.image, item.title)}
														loading="lazy"
														onerror={handleImageError}
													/>
												{/if}

												<Card.Header class="p-0">
													<Card.Title
														class={cn(
															isDarkMode ? 'bg-secondary/10' : 'bg-foreground/10',
															item.isImageTransparent && imageUrl
																? item.title?.length > 15
																	? '[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)]'
																	: '[clip-path:polygon(0%_0%,60%_0%,80%_100%,0%_100%)]'
																: '',
															'w-full'
														)}
													>
														<h3
															class={cn(
																isDarkMode ? 'text-secondary' : 'text-foreground',
																'p-4 font-sans font-bold'
															)}
														>
															{item.title}
														</h3>
													</Card.Title>
												</Card.Header>

												<Card.Content
													class={cn(
														imageUrl ? (isDarkMode ? 'bg-secondary/10' : 'bg-foreground/10') : '',
														item.isImageTransparent ? 'pt-4' : '',
														'p-4'
													)}
													style={`height: ${(innerWidth?.current ?? 0) < 976 ? 'auto' : (overlayHeights[i] ?? 0) - 316 + 'px'}`}
												>
													{#if item.subtitle}
														<h4 class="text-md text-primary mb-1 font-sans font-medium">
															{item.subtitle}
														</h4>
													{/if}
													<div
														class={cn(
															'prose-sm text-justify font-sans',
															isDarkMode ? 'text-secondary' : 'text-foreground'
														)}
													>
														{@html item.description}
													</div>
												</Card.Content>
											</Card.Root>
										</div>
									{/each}
								</div>
							{:else}
								<div class="flex flex-col items-center justify-center py-8 text-center">
									<svg
										class={cn(
											'mb-4 h-12 w-12',
											isDarkMode ? 'opacity-30' : 'text-muted-foreground'
										)}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="1.5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
									<p class={cn(isDarkMode ? 'text-secondary/70' : 'text-muted-foreground')}>
										No items available in this section
									</p>
								</div>
							{/if}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</div>
{/snippet}

{#snippet ImagesTemplate(block: ContentImages)}
	{@const safe = new SafeData(block)}
	{@const title = safe.getString('title')}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}
	{@const imageCards = safe.getArray<any>('imageCards', [])}

	{@const processedCards = imageCards
		.map((card, index) => {
			const cardSafe = new SafeData(card);
			return {
				title: cardSafe.getString('title'),
				subtitle: undefined, // Kein Subtitle in diesem Kontext
				imageUrl: getOptimizedImageUrl(cardSafe.getObject('image')),
				altText: getImageAltText(cardSafe.getObject('image'), cardSafe.getString('title')),
				isImageTransparent: cardSafe.getBoolean('isImageTransparent', false),
				sortOrder: cardSafe.getNumber('sortOrder', index + 1)
			};
		})
		.sort((a, b) => a.sortOrder - b.sortOrder)}

	<div class="mx-auto py-16">
		{#if title}
			<h4
				class={cn(
					isDarkMode ? 'text-secondary' : 'text-foreground',
					'my-4 text-center font-sans text-2xl font-bold'
				)}
			>
				{title}
			</h4>
		{/if}

		<ImageCardGrid cards={processedCards} {isDarkMode} />
	</div>
{/snippet}

<!-- START: MODIFIED SECTION -->
{#snippet TextImageTemplate(block: ContentTextImage)}
	{@const safe = new SafeData(block)}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}
	{@const isImageTransparent = safe.getBoolean('isImageTransparent', false)}
	{@const imageSize = safe.getString('imageSize', 'md') as ImageSize}
	{@const imagePosition = safe.getString('imagePosition', 'bottom') as ImagePosition}

	{@const imageSizeMap: Record<ImageSize, string> = {
		xs: 'md:w-1/4',
		sm: 'md:w-2/5',
		md: 'md:w-1/2',
		lg: 'md:w-3/5',
		xl: 'md:w-3/4'
	}}

	{@const isHorizontalLayout = imagePosition === 'left' || imagePosition === 'right'}

	<div class="mx-auto py-16">
		<div
			class={cn(
				'flex flex-col gap-6 sm:gap-4 lg:gap-12',
				imagePosition === 'left' && 'md:flex-row',
				imagePosition === 'right' && 'md:flex-row-reverse'
			)}
		>
			{#if block.image}
				{@const imageUrl = getOptimizedImageUrl(block.image)}
				{#if imageUrl}
					<img
						class={cn(
							'max-h-[400px] w-full object-cover',
							!isImageTransparent && 'shadow-primary',
							isHorizontalLayout && imageSizeMap[imageSize],
							imagePosition === 'bottom' ? 'order-2' : 'order-1'
						)}
						src={imageUrl}
						alt={getImageAltText(block.image, block.title)}
						loading="lazy"
						onerror={handleImageError}
					/>
				{:else}
					<div
						class={cn(
							'bg-muted flex h-[400px] w-full flex-col items-center justify-center',
							!isImageTransparent && 'shadow-primary',
							isHorizontalLayout && imageSizeMap[imageSize],
							imagePosition === 'bottom' ? 'order-2' : 'order-1'
						)}
					>
						<svg
							class="text-muted-foreground mb-2 h-12 w-12"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p class="text-muted-foreground text-sm">Image not available</p>
					</div>
				{/if}
			{/if}

			<div class={cn('flex-1', imagePosition === 'bottom' ? 'order-1' : 'order-2')}>
				<h4
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'my-2 font-sans text-2xl font-bold'
					)}
				>
					{block.title}
				</h4>
				<div
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'prose prose-neutral xl:prose-lg max-w-none text-justify'
					)}
				>
					{@html resolveRichText(block.content)}
				</div>
			</div>
		</div>
	</div>
{/snippet}
<!-- END: MODIFIED SECTION -->

{#snippet SpacerTemplate(block: SpacerSection)}
	{@const safe = new SafeData(block)}
	{@const height = safe.getString('height') as Size}
	{@const isDarkMode = safe.getBoolean('isDarkMode', false)}
	{@const withSeparatorLine = safe.getBoolean('withSeparatorLine', false)}

	<Spacer {height} {isDarkMode} {withSeparatorLine} />
{/snippet}
