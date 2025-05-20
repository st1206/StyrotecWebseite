<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { liteClient } from 'algoliasearch/lite';
	import { PUBLIC_ALGOLIA_SEARCH_KEY, PUBLIC_ALGOLIA_APP_ID } from '$env/static/public';

	let { itemStateMap = $bindable() } = $props();
	let searchValue = $state('');

	const client = liteClient(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY);

	// Define the indexes to search
	const indexes = ['pages'];

	// Debounce function
	function debounce(fn: (...args: any[]) => void, delay: number) {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	}

	const debouncedSearch = debounce((query: string) => {
		if (query.trim() !== '') {
			search(query);
		}
	}, 200);

	$effect(() => {
		if (itemStateMap.get(99)?.open) {
			searchValue = '';
			const searchbar = document.getElementById('searchbar');
			if (searchbar) {
				searchbar.focus();
			}
		}
	});

	$effect(() => {
		debouncedSearch(searchValue);
	});

	let results: any[] = $state([]);
	async function search(query: string) {
		const res = await client.search({
			requests: indexes.map((indexName) => ({
				indexName,
				query,
				hitsPerPage: 10
			}))
		});
	}
</script>

<div class="w-full">
	<BlurFade duration={0.3}>
		<div class="relative w-full">
			<Icons.search class="text-secondary absolute left-5 top-1/2 -translate-y-1/2 md:size-8" />
			<input
				id="searchbar"
				bind:value={searchValue}
				placeholder="Suchen..."
				class="placeholder:text-secondary/50 text-secondary caret-secondary bg-secondary/10 border-primary absolute top-1/2
                        w-full -translate-y-1/2 px-20 py-2 text-3xl focus-visible:border focus-visible:outline-none md:h-20"
			/>
			<div class="absolute right-5 top-1/2 -translate-y-1/2">
				<Icons.spinner class="text-secondary  animate-spin md:size-6" />
			</div>
		</div>
	</BlurFade>
	{#each results as result}
		<div class="mt-4">
			{#each result.hits as hit}
				<div class="border-secondary/20 border-b p-4">
					<h2 class="text-primary text-xl">{hit.title}</h2>
					<p class="text-secondary">{hit.content}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>
