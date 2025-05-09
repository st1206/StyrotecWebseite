<script lang="ts">
	import { page } from '$app/state';
	import DefaultCards from './default-cards.svelte';
	import { _ } from 'svelte-i18n';

	let data = $props();
	const collectionTypeData = {
		cards: Object.values(data).map((entry: any) => {
			return {
				title: entry.productDataSheet.name ? entry.productDataSheet.name : entry.title,
				thumbnail: entry.pictures ? entry.pictures[0] : entry.images[0],
				redirectButtons: [
					{
						label: $_(`button.learn_more`),
						redirectSlug: `${page.url.pathname.split('de/')[1]}/${entry.slug}`
					}
				]
			};
		})
	};
</script>

<DefaultCards {...collectionTypeData} />
