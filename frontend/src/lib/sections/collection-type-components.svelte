<script lang="ts">
	import { page } from '$app/state';
	import Brochures from './brochures.svelte';
	import DefaultCards from './default-cards.svelte';
	import { locale, _ } from 'svelte-i18n';
	import Fairs from './fairs.svelte';
	import { SafeData } from '$lib/utils/validation';
	import Downloads from './downloads.svelte';

	let data: any = $props();

	// Safe data processing
	const safe = new SafeData(data);
	const dataType = safe.getString('type', 'defaultCards');
	const currentLocale = $locale === 'de-DE' ? 'de' : 'en';

	function getDataEntries(): any[] {
		if (!data) return [];

		if (Array.isArray(data)) {
			return data.filter((entry) => entry && typeof entry === 'object');
		}

		if (typeof data === 'object') {
			const entries = Object.entries(data)
				.filter(
					([key, value]) => key !== 'type' && key !== 'error' && value && typeof value === 'object'
				)
				.map(([_, value]) => value);

			return entries.length > 0
				? entries
				: Object.values(data).filter((entry) => entry && typeof entry === 'object');
		}

		return [];
	}

	const dataEntries = getDataEntries();

	const defaultCards = $derived.by(() => {
		const validCards = dataEntries
			.map((entry: any) => {
				if (!entry) return null;
				const entrySafe = new SafeData(entry);
				const productDataSheet = entrySafe.getObject<{ name?: string }>('productDataSheet');
				const title = entrySafe.getString('title');
				const slug = entrySafe.getString('slug');
				if (!productDataSheet && !title) return null;
				const cardTitle = productDataSheet?.name || title || 'Untitled Item';
				const pictures = entrySafe.getArray<any>('pictures', []);
				const thumbnail = pictures[0] || null;
				if (!slug) return null;
				return {
					title: cardTitle,
					thumbnail,
					redirectButtons: [
						{
							label: $_('button.learnMore', { default: 'Learn More' }),
							redirectSlug: `${page.url.pathname.split(`${currentLocale}/`)[1]}/${slug}`,
							isPrimaryAction: true
						}
					]
				};
			})
			.filter((card) => card !== null);
		return { cards: validCards };
	});

	const brochures = $derived.by(() => {
		const validBrochures = dataEntries
			.map((entry: any) => {
				if (!entry) return null;
				const entrySafe = new SafeData(entry);
				const file = entrySafe.getObject<Record<string, unknown>>('file');
				if (!file) return null;
				return {
					title: entrySafe.getString('title'),
					thumbnail: entrySafe.getObject('thumbnail'),
					file
				};
			})
			.filter((entry) => entry !== null);
		return validBrochures;
	});

	const fairs = $derived.by(() => {
		const validFairs = dataEntries
			.map((entry: any) => {
				if (!entry) return null;
				const entrySafe = new SafeData(entry);
				const startDate = entrySafe.getString('startDate');
				if (!startDate) return null;
				return {
					name: entrySafe.getString('name', 'Unnamed Event'),
					description: entrySafe.getString('description'),
					content: entrySafe.getArray('content'),
					city: entrySafe.getString('city'),
					startDate,
					endDate: entrySafe.getString('endDate'),
					externalLink: entrySafe.getString('externalLink'),
					logo: entrySafe.getObject('logo')
				};
			})
			.filter((entry) => entry !== null);
		return validFairs;
	});

	const downloads = $derived.by(() => {
		const validDownloads = dataEntries
			.map((entry: any) => {
				if (!entry) return null;

				const entrySafe = new SafeData(entry);
				const file = entrySafe.getObject<{ url: string }>('file');

				// We only need an entry with a title and a file URL
				if (!entrySafe.getString('title') || !file?.url) {
					return null;
				}

				return {
					title: entrySafe.getString('title'),
					description: entrySafe.getString('description'),
					sortOrder: entrySafe.getNumber('sortOrder'),
					file
				};
			})
			.filter((entry) => entry !== null);

		return validDownloads.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
	});

	const hasValidData = $derived.by(() => {
		switch (dataType) {
			case 'brochures':
				return brochures.length > 0;
			case 'fairs':
				return fairs.length > 0;
			case 'downloads':
				return downloads.length > 0;
			default:
				return defaultCards.cards.length > 0;
		}
	});

	const hasError = $derived.by(() => {
		return (
			safe.getString('error') || (dataEntries.length === 0 && data && typeof data === 'object')
		);
	});

	$inspect(data);
</script>

{#if hasError}
	<!-- Error state (Unchanged) -->
	<div class="py-16 text-center">
		<div
			class="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg"
		>
			<svg class="text-destructive h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
		</div>
		<h3 class="text-destructive mb-2 text-lg font-semibold">Collection data error</h3>
		<p class="text-muted-foreground mb-2 text-sm">
			Type: <code class="bg-muted rounded px-1">{dataType}</code>
		</p>
		{#if safe.getString('error')}
			<p class="text-destructive text-xs">{safe.getString('error')}</p>
		{:else}
			<p class="text-muted-foreground text-xs">No valid data entries found in collection</p>
		{/if}
	</div>
{:else if !hasValidData}
	<!-- No data state (Unchanged) -->
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
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		</div>
		<h3 class="text-muted-foreground mb-2 text-lg font-semibold">
			No {dataType} available
		</h3>
		<p class="text-muted-foreground text-sm">
			{#if dataEntries.length > 0}
				{dataEntries.length} item(s) found but none match the required format for {dataType}
			{:else}
				No data was provided for this collection
			{/if}
		</p>
	</div>
	<!-- --- TEMPLATE MODIFICATION --- -->
{:else if dataType === 'brochures'}
	<Brochures brochures={brochures as any} />
{:else if dataType === 'fairs'}
	<Fairs fairs={fairs as any} />
{:else if dataType === 'downloads'}
	<Downloads {downloads} />
{:else}
	<DefaultCards {...defaultCards} />
{/if}
