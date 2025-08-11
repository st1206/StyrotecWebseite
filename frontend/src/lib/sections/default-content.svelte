<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import { cn, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { innerWidth } from 'svelte/reactivity/window';
	import { SvelteMap } from 'svelte/reactivity';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Lightbox } from 'svelte-lightbox';
	import { SafeData } from '$lib/validation';
	import { getOptimizedImageUrl, handleImageError, getImageAltText } from '$lib/image';

	type TableRow = { rowLabel?: string; rowValue?: string };
	type TableColumn = { columnLabel?: string; tableRows: TableRow[] };

	// --- TYPES ---
	type ContentHeader = {
		sectionTitle: string;
		description: string;
		isDarkMode: boolean;
	};

	type ContentTable = {
		title: string;
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
			}[];
			sortOrder?: number;
		}[];
		sortOrder?: number;
	};

	type ContentImages = {
		title?: string;
		images: ImageAsset[];
		sortOrder?: number;
	};

	type ContentTextImage = {
		title: string;
		content: StrapiRichTextNode[];
		image: ImageAsset;
		imagePosition: 'top' | 'right' | 'bottom' | 'left';
		sortOrder?: number;
	};

	type ComponentData = { __component: string; sortOrder?: number } & (
		| ContentHeader
		| ContentTable
		| ContentAccordion
		| ContentImages
		| ContentTextImage
	);

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

	// <!-- DARKMODE REWORK NEEDED -->
	// const isDarkMode = $derived(() => {
	// 	const firstBlock = sortedBlocks[0] as ContentHeader;
	// 	return firstBlock?.isDarkMode || false;
	// });
	const isDarkMode = true;
</script>

{#if isDarkMode}
	<div
		class="bg-foreground mt-24 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
	></div>
{/if}

<section class={cn(true ? 'bg-foreground' : '', 'w-full pb-16')}>
	<div class="sm:container">
		{#if sortedBlocks?.length > 0}
			{#each sortedBlocks as block, i}
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
				{/if}
			{/each}
		{:else}
			<!-- No content blocks available -->
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
		{/if}
	</div>
</section>

{#if isDarkMode}
	<div
		class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
	></div>
{/if}

{#snippet HeaderTemplate(block: ContentHeader)}
	{@const safe = new SafeData(block)}
	{@const title = safe.getString('sectionTitle', 'Untitled Section')}
	{@const description = safe.getString('description')}

	<div class={cn(isDarkMode ? 'pt-16' : 'pt-32', 'flex flex-col items-center gap-2')}>
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
				{#if description.includes('<')}
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
	{@const blockTitle = safe.getString('title')}
	{@const tables = safe.getArray('tables', [])}
	{@const validTables = tables.filter((table: any) => table && typeof table === 'object')}

	{#if validTables.length > 0}
		{#each validTables as table}
			{@const tableSafe = new SafeData(table)}
			{@const tableTitle = tableSafe.getString('title')}
			{@const tableColumns = tableSafe.getArray<TableColumn>('tableColumns', [])}
			{@const validColumns = tableColumns.filter(
				(col: any) => col && typeof col === 'object' && 'columnLabel' in col
			)}

			<div class="mx-auto my-16 mt-24 h-full w-full text-center">
				{#if blockTitle && !tableTitle}
					<h4
						class={cn(
							isDarkMode ? 'text-secondary' : 'text-foreground',
							'my-4 font-sans text-2xl font-bold'
						)}
					>
						{blockTitle}
					</h4>
				{/if}

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
						<Table.Root>
							<Table.Header>
								<Table.Row
									class={cn(
										isDarkMode
											? 'bg-secondary/10 hover:bg-secondary/15'
											: 'bg-foreground/10 hover:bg-foreground/15',
										'border-foreground/20'
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
											isDarkMode
												? 'bg-secondary/5 hover:bg-secondary/20'
												: 'bg-foreground/5 hover:bg-foreground/20',
											'border-foreground/20'
										)}
									>
										<Table.Cell
											class={cn(
												isDarkMode ? 'bg-secondary/5' : 'bg-foreground/5',
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

											<Table.Cell class="min-w-[100px] text-center font-medium">
												{cellValue}
											</Table.Cell>
										{/each}
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					{:else}
						<!-- No valid rows -->
						<div class="py-8 text-center">
							<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
								No table rows available
							</p>
						</div>
					{/if}
				{:else}
					<!-- No valid columns -->
					<div class="py-8 text-center">
						<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
							No table columns available
						</p>
					</div>
				{/if}
			</div>
		{/each}
	{:else}
		<!-- No valid tables -->
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
	<div class={cn('my-16 mt-24 h-full w-full lg:mx-auto')}>
		{#if block.title}
			<h4 class="text-secondary my-4 text-center font-sans text-2xl font-bold">{block.title}</h4>
		{/if}
		<Accordion.Root type="multiple" value={['item-1']} class="flex w-full flex-col gap-4">
			{#each block.accordions as accordion, i}
				<Accordion.Item value={`item-${i + 1}`} class="border-none">
					<Accordion.Trigger
						class={cn(
							isDarkMode
								? 'bg-secondary/10 text-secondary hover:bg-secondary/15'
								: 'bg-foreground/10 text-foreground hover:bg-foreground/15',
							'font-sans font-medium'
						)}
					>
						<h4>{accordion.title}</h4>
					</Accordion.Trigger>
					<Accordion.Content class={cn(isDarkMode ? 'bg-secondary/5' : 'bg-foreground/5', 'pt-2')}>
						<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
							{#each accordion.accordionItems as item, k}
								<div class="h-full" bind:this={overlayRefs[i]}>
									<Card.Root
										class={cn(isDarkMode ? 'bg-secondary/10' : 'bg-foreground/10', 'px-0')}
									>
										{#if item.image}
											<img
												class="h-[260px] w-full object-contain"
												src={!PUBLIC_BACKEND_URL.includes('https')
													? `${PUBLIC_BACKEND_URL}${item.image.formats?.['large']?.url || item.image.url}`
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
													isDarkMode ? 'bg-secondary' : 'bg-foreground',
													'w-full'
												)}
											>
												<h3
													class={cn(
														isDarkMode ? 'text-foreground' : 'text-secondary',
														'p-4 font-sans font-bold'
													)}
												>
													{item.title}
												</h3>
											</Card.Title>
										</Card.Header>

										<Card.Content
											class={cn(
												item.subtitle ? 'pt-4' : '',
												isDarkMode ? 'bg-secondary' : 'bg-foreground',
												'px-4'
											)}
											style={`height: ${(innerWidth?.current ?? 0) < 976 ? 'auto' : (overlayHeights[i] ?? 0) - 364 + 'px'}`}
										>
											{#if item.subtitle}
												<h4 class="text-md text-primary mb-1 font-sans font-medium">
													{item.subtitle}
												</h4>
											{/if}
											<p
												class={cn(
													isDarkMode ? 'text-foreground' : 'text-secondary',
													'prose-sm text-justify font-sans'
												)}
											>
												{@html item.description}
											</p>
										</Card.Content>
									</Card.Root>
								</div>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
{/snippet}

{#snippet ImagesTemplate(block: ContentImages)}
	{@const safe = new SafeData(block)}
	{@const title = safe.getString('title')}
	{@const images = safe.getArray<ImageAsset>('images', [])}
	{@const validImages = images.filter((img) => img && getOptimizedImageUrl(img))}

	<div class="mx-auto my-16">
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

		{#if validImages.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
				{#each validImages as image, i}
					{@const imageUrl = getOptimizedImageUrl(image)}
					{@const imageAlt = getImageAltText(image, `Image ${i + 1}`)}

					<div class="relative">
						<Lightbox transitionDuration={50}>
							<img
								class="shadow-primary h-[400px] w-full object-cover"
								src={imageUrl}
								alt={imageAlt}
								loading="lazy"
								onerror={handleImageError}
							/>
							<!-- Fallback for broken images -->
							<div
								class="bg-muted shadow-primary flex h-[400px] w-full flex-col items-center justify-center"
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
								<p class="text-muted-foreground text-sm">Image {i + 1} not available</p>
							</div>
						</Lightbox>
					</div>
				{/each}
			</div>
		{:else}
			<!-- No valid images -->
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
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h4
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'mb-2 text-lg font-semibold'
					)}
				>
					No images available
				</h4>
				{#if images.length > 0}
					<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
						{images.length} image(s) provided but none could be loaded
					</p>
				{:else}
					<p class={cn(isDarkMode ? 'text-secondary/60' : 'text-muted-foreground', 'text-sm')}>
						No images were provided for this gallery
					</p>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet TextImageTemplate(block: ContentTextImage)}
	<div class="mx-auto my-16 mt-28">
		<div
			class={cn(
				'flex flex-col gap-4 lg:gap-12',
				block.imagePosition === 'left' && 'md:flex-row',
				block.imagePosition === 'right' && 'md:flex-row-reverse'
			)}
		>
			{#if block.image}
				<img
					class={cn(
						'shadow-primary h-[400px] w-full object-cover',
						(block.imagePosition === 'left' || block.imagePosition === 'right') && 'md:w-1/2',
						block.imagePosition === 'bottom' ? 'order-2' : 'order-1'
					)}
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${block.image.formats?.['large']?.url || block.image.url}`
						: block.image.url}
					alt={block.image.alternativeText}
				/>
			{/if}

			<div class={cn('flex-1', block.imagePosition === 'bottom' ? 'order-1' : 'order-2')}>
				<h4
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'my-2 font-sans text-2xl font-bold'
					)}
				>
					{block.title}
				</h4>
				<p
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'prose prose-neutral xl:prose-lg max-w-none text-justify'
					)}
				>
					{@html resolveRichText(block.content)}
				</p>
			</div>
		</div>
	</div>
{/snippet}
