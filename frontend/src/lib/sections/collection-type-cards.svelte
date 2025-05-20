<script lang="ts">
	import { page } from '$app/state';
	import DefaultCards from './default-cards.svelte';
	import { _ } from 'svelte-i18n';

	let data = $props();
	const collectionTypeData = {
		cards: Object.values(data)
			.map((entry: any) => {
				console.log(entry);
				if (!entry.productDataSheet) {
					return null;
				}
				return {
					title:
						entry.productDataSheet && entry.productDataSheet.name
							? entry.productDataSheet.name
							: entry.title,
					thumbnail: entry.pictures ? entry.pictures[0] : entry.images ? entry.images[0] : null,
					redirectButtons: [
						{
							label: $_(`button.learnMore`),
							redirectSlug: `${page.url.pathname.split('de/')[1]}/${entry.slug}`
						}
					]
				};
			})
			.filter((card) => card !== null) // Filter out the null entries
	};
</script>

<DefaultCards {...collectionTypeData} />
