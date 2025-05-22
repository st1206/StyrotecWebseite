<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import { liteClient } from 'algoliasearch/lite';
	import { PUBLIC_ALGOLIA_SEARCH_KEY, PUBLIC_ALGOLIA_APP_ID } from '$env/static/public';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Button } from '$lib/components/ui/button';
	import { pages, type PageContent } from '$lib/config/pages';
	import { _, locale as i18nLocaleStore } from 'svelte-i18n';
	import { innerHeight } from 'svelte/reactivity/window';

	// --- Props and State ---
	let { itemStateMap = $bindable() } = $props();

	let searchValue = $state('');
	let isLoading = $state(false);
	let algoliaResponseResults: {
		index: string;
		hits: any[];
		nbHits?: number;
	}[] = $state([]);

	// --- Algolia Setup ---
	const client = liteClient(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY);
	// Ensure 'cnc_mill' and other collection type indexes are configured in Algolia
	// to include 'category' and 'slug' fields in their hits.
	const indexes = ['pages', 'cnc_mill'];

	// --- Utility Functions ---
	function debounce(fn: (...args: any[]) => void, delay: number) {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	}

	function styleAlgoliaHighlight(htmlString: string | null): string | null {
		if (!htmlString) return null;
		return htmlString
			.replace(/<em>/g, '<strong class="font-bold text-primary">')
			.replace(/<\/em>/g, '</strong>');
	}

	function collectHighlights(
		obj: any,
		currentPathParts: string[],
		highlightsList: { path: string; value: string }[]
	) {
		if (!obj || typeof obj !== 'object') return;
		if (typeof obj.value === 'string' && obj.matchLevel && obj.matchLevel !== 'none') {
			const styledValue = styleAlgoliaHighlight(obj.value);
			if (styledValue) {
				highlightsList.push({
					path: currentPathParts.join('.'),
					value: styledValue
				});
			}
			return;
		}
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				if (
					typeof obj[key] === 'object' &&
					obj[key] !== null &&
					key !== 'matchedWords' &&
					key !== 'fullyHighlighted'
				) {
					collectHighlights(obj[key], [...currentPathParts, key], highlightsList);
				}
			}
		}
	}

	function getDisplayTitle(hit: any, indexName: string): string {
		if (indexName === 'pages') {
			return hit.seo?.pageTitle || '-';
		} else {
			// For collection types like 'cnc_mill'
			return hit.productDataSheet?.name || hit.name || '-';
		}
	}

	function getDisplayDescription(hit: any, indexName: string): string {
		const highlights: { path: string; value: string }[] = [];
		if (hit._highlightResult) {
			collectHighlights(hit._highlightResult, [], highlights);
		}
		if (highlights.length > 0) {
			let longestHighlight = highlights[0];
			for (let i = 1; i < highlights.length; i++) {
				if (highlights[i].value.length > longestHighlight.value.length) {
					longestHighlight = highlights[i];
				}
			}
			return longestHighlight.value;
		}
		if (indexName === 'pages') {
			return hit.seo?.pageDescription || 'Keine weitere Beschreibung verfügbar.';
		} else {
			// For collection types
			return hit.productDataSheet?.designation || 'Keine weitere Beschreibung verfügbar.';
		}
	}

	function getLinkForHit(hit: any, indexName: string): string {
		// Use the svelte-i18n store value directly
		const currentSvelteLocale = $i18nLocaleStore;
		const currentAppLocale = currentSvelteLocale === 'en-EN' ? 'en' : 'de';
		const localePrefix = currentSvelteLocale === 'en-EN' ? '/en/' : '/de/';

		if (indexName === 'pages') {
			const objectIdParts = hit.objectID.split('.');
			if (objectIdParts.length < 2) return '#';

			const cmsApiSlugFromHit = objectIdParts[1];
			const pageConfigEntry = Object.values(pages).find(
				(p: PageContent) => p.cmsApiSlug === cmsApiSlugFromHit
			);

			if (pageConfigEntry) {
				const slug = currentAppLocale === 'en' ? pageConfigEntry.enSlug : pageConfigEntry.deSlug;
				return `${localePrefix}${slug}`;
			}
		} else {
			// Logic for collection types (e.g., 'cnc_mill', etc.)
			const categoryKey = (hit.category as keyof typeof pages) || 'cncMills'; // e.g., "cncMills"
			const itemSlug = hit.slug as string; // e.g., "my-specific-cnc-mill"

			if (categoryKey && itemSlug && pages[categoryKey]) {
				const categoryPageConfig = pages[categoryKey];
				const baseSlug =
					currentAppLocale === 'en' ? categoryPageConfig.enSlug : categoryPageConfig.deSlug;

				// Ensure baseSlug doesn't end with a slash and itemSlug doesn't start with one
				// to prevent double slashes, though typically slugs shouldn't have them.
				const cleanBaseSlug = baseSlug.endsWith('/') ? baseSlug.slice(0, -1) : baseSlug;
				const cleanItemSlug = itemSlug.startsWith('/') ? itemSlug.slice(1) : itemSlug;

				return `${localePrefix}${cleanBaseSlug}/${cleanItemSlug}`;
			}
		}
		return '#'; // Fallback
	}

	// --- Search Logic ---
	async function performSearch(query: string) {
		try {
			const response = (await client.search({
				requests: indexes.map((idxName) => ({
					indexName: idxName,
					query,
					hitsPerPage: 10
				}))
			})) as {
				results: { index: string; hits: any[]; nbHits?: number }[];
			};
			algoliaResponseResults = response.results.filter((result) => result.hits.length > 0);
		} catch (error) {
			console.error('Algolia search error:', error);
			algoliaResponseResults = [];
		}
	}

	const debouncedSearch = debounce(async (query: string) => {
		if (query.trim() !== '') {
			isLoading = true;
			algoliaResponseResults = [];
			await performSearch(query);
			isLoading = false;
		} else {
			algoliaResponseResults = [];
			isLoading = false;
		}
	}, 300);

	// --- Effects ---
	$effect(() => {
		if (itemStateMap.get(99)?.open) {
			isLoading = false;
			const searchbar = document.getElementById('searchbar');
			if (searchbar) searchbar.focus();
		}
	});

	$effect(() => {
		debouncedSearch(searchValue);
	});
</script>

<div class="mt-8 w-full">
	<div class="flex w-full justify-end">
		<Button
			variant="secondary"
			class="mr-2"
			size="icon"
			onclick={() => itemStateMap.set(99, { hovered: false, open: false })}
		>
			<Icons.X />
		</Button>
	</div>

	<div class="relative mt-16 w-full">
		<Icons.search class="text-secondary absolute left-5 top-1/2 -translate-y-1/2 md:size-8" />
		<input
			id="searchbar"
			bind:value={searchValue}
			placeholder="Suchen..."
			class="placeholder:text-secondary/50 text-secondary caret-secondary bg-secondary/10 border-primary absolute top-1/2
                        w-full -translate-y-1/2 px-20 py-2 text-3xl focus-visible:border focus-visible:outline-none md:h-20"
			autocomplete="off"
		/>
		<div class="absolute right-5 top-1/2 -translate-y-1/2">
			{#if isLoading}
				<Icons.spinner class="text-secondary animate-spin md:size-6" />
			{/if}
		</div>
	</div>

	<div class="my-28 max-h-[70vh] pr-2">
		{#if searchValue.trim() !== '' && !isLoading && algoliaResponseResults.length === 0}
			<div class="text-secondary text-center text-lg">
				Keine Ergebnisse für "{searchValue}" gefunden.
			</div>
		{/if}

		{#if algoliaResponseResults.length > 0}
			<ScrollArea style="height: {(innerHeight?.current ?? 0) - 300}px">
				<div class="space-y-8">
					{#each algoliaResponseResults as indexResult (indexResult.index)}
						<section class="bg-secondary/10 rounded-lg p-4 shadow md:p-6">
							<h2
								class="text-primary border-secondary/20 mb-4 border-b pb-2 text-xl font-semibold md:text-2xl"
							>
								{$_(indexResult.index)}
							</h2>
							<div class="space-y-4">
								{#each indexResult.hits as hit (hit.objectID)}
									{@const link = getLinkForHit(hit, indexResult.index)}
									<article class="bg-secondary/5 rounded-md p-3 md:p-4">
										<h3 class="text-accent mb-1 text-lg font-medium md:text-xl">
											{getDisplayTitle(hit, indexResult.index)}
										</h3>
										{@html `<p class="text-secondary/80 text-sm md:text-base mb-2 line-clamp-2">${getDisplayDescription(hit, indexResult.index)}</p>`}
										{#if link !== '#'}
											<Button
												variant="link"
												onclick={() => itemStateMap.set(99, { hovered: false, open: false })}
												href={link}
												class="h-auto p-0"
											>
												{$_('button.learnMore') || 'Details'}
											</Button>
										{/if}
									</article>
								{/each}
							</div>
						</section>
					{/each}
				</div>
			</ScrollArea>
		{/if}
	</div>
</div>
