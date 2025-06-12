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

	const snapshot = $state.snapshot(data);
	const sortedBlocks: ComponentData[] = $derived.by(() => {
		return Object.values(snapshot).sort((a, b) => {
			const orderA = a.sortOrder ?? 0;
			const orderB = b.sortOrder ?? 0;
			return orderA - orderB;
		});
	});

	const isDarkMode = $derived((Object.values(snapshot)[0] as ContentHeader)?.isDarkMode || false);
</script>

{#if isDarkMode}
	<div
		class="bg-foreground mt-24 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
	></div>
{/if}

<section class={cn(isDarkMode ? 'bg-foreground' : '', 'w-full pb-16')}>
	<div class="sm:container">
		{#if sortedBlocks?.length}
			{#each sortedBlocks as block, i}
				{#if block.__component === 'partial-components.content-header'}
					{@const componentData = block as ContentHeader}
					{@render HeaderTemplate(componentData)}
				{/if}

				{#if block.__component === 'partial-components.content-table'}
					{@const componentData = block as ContentTable}
					{@render TableTemplate(componentData)}
				{/if}

				{#if block.__component === 'partial-components.content-accordion'}
					{@const componentData = block as ContentAccordion}
					{@render AccordionTemplate(componentData)}
				{/if}

				{#if block.__component === 'partial-components.content-images'}
					{@const componentData = block as ContentImages}
					{@render ImagesTemplate(componentData)}
				{/if}

				{#if block.__component === 'partial-components.content-text-image'}
					{@const componentData = block as ContentTextImage}
					{@render TextImageTemplate(componentData)}
				{/if}
			{/each}
		{/if}
	</div>
</section>

{#if isDarkMode}
	<div
		class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
	></div>
{/if}

{#snippet HeaderTemplate(block: ContentHeader)}
	<div class={cn(isDarkMode ? 'pt-16' : 'pt-32', 'flex flex-col items-center gap-2')}>
		<h3 class={cn(isDarkMode ? 'text-secondary' : 'text-foreground', 'font-boldFont text-4xl')}>
			{block.sectionTitle}
		</h3>
		<p
			class={cn(
				isDarkMode ? 'text-secondary' : 'text-foreground',
				'prose prose-neutral lg:prose-lg max-w-5xl text-justify'
			)}
		>
			{@html block.description}
		</p>
	</div>
{/snippet}

{#snippet TableTemplate(block: ContentTable)}
	{#each block.tables as table}
		<div class="lg: mx-auto my-16 mt-24 h-full w-full text-center">
			{#if table.title}
				<h4
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'font-boldFont my-4 text-2xl'
					)}
				>
					{table.title}
				</h4>
			{/if}
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
						<Table.Head class={cn(isDarkMode ? 'text-secondary' : 'text-foreground')}></Table.Head>
						{#each table.tableColumns as column}
							<Table.Head
								class={cn(
									isDarkMode ? 'text-secondary' : 'text-foreground',
									'font-boldFont text-center'
								)}
							>
								{column.columnLabel}
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body class={cn(isDarkMode ? 'text-secondary' : 'text-foreground')}>
					{#each table.tableColumns[0].tableRows as row, idx}
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
								{row.rowLabel}
							</Table.Cell>
							{#each table.tableColumns as column}
								<Table.Cell class="min-w-[100px] text-center font-medium">
									{column.tableRows[idx].rowValue}
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{/each}
{/snippet}

{#snippet AccordionTemplate(block: ContentAccordion)}
	<div class={cn('my-16 mt-24 h-full w-full lg:mx-auto')}>
		{#if block.title}
			<h4 class="font-boldFont text-secondary my-4 text-center text-2xl">{block.title}</h4>
		{/if}
		<Accordion.Root type="multiple" value={['item-1']} class="flex w-full flex-col gap-4">
			{#each block.accordions as accordion, i}
				<Accordion.Item value={`item-${i + 1}`} class="border-none">
					<Accordion.Trigger
						class={cn(
							isDarkMode
								? 'text-secondary bg-secondary/10 hover:bg-secondary/15'
								: 'text-foreground bg-foreground/10 hover:bg-foreground/15',
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
													isDarkMode ? 'bg-secondary' : 'bg-foreground',
													'w-full'
												)}
											>
												<h3
													class={cn(
														isDarkMode ? 'text-foreground' : 'text-secondary',
														'font-boldFont p-4'
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
												<h4 class="text-primary text-md mb-1 font-sans font-medium">
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
	<div class="mx-auto my-16">
		{#if block.title}
			<h4 class="font-boldFont my-4 text-center text-2xl">{block.title}</h4>
		{/if}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
			{#each block.images as image}
				{#if image}
					<Lightbox transitionDuration={50}>
						<img
							class="shadow-primary h-[400px] w-full object-cover"
							src={!PUBLIC_BACKEND_URL.includes('https')
								? `${PUBLIC_BACKEND_URL}${image.formats['large']?.url || image.url}`
								: image.url}
							alt={image.alternativeText}
						/>
					</Lightbox>
				{/if}
			{/each}
		</div>
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
						? `${PUBLIC_BACKEND_URL}${block.image.formats['large']?.url || block.image.url}`
						: block.image.url}
					alt={block.image.alternativeText}
				/>
			{/if}

			<div class={cn('flex-1', block.imagePosition === 'bottom' ? 'order-1' : 'order-2')}>
				<h4
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'font-boldFont my-2 text-2xl'
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
