<script lang="ts">
	import { page } from '$app/state';
	import Brochures from './brochures.svelte';
	import DefaultCards from './default-cards.svelte';
	import { locale, _ } from 'svelte-i18n';

	let data = $props();
	const currentLocale = $locale === 'de-DE' ? 'de' : 'en';
	const defaultCards = {
		cards: Object.values(data)
			.map((entry: any) => {
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
							redirectSlug: `${page.url.pathname.split(`${currentLocale}/`)[1]}/${entry.slug}`
						}
					]
				};
			})
			.filter((card) => card !== null) // Filter out the null entries
	};
	const brochures = {
		brochures: Object.values(data)
			.map((entry: any) => {
				if (!entry.file) {
					return null;
				}
				return {
					thumbnail: entry.thumbnail,
					file: entry.file
				};
			})
			.filter((card) => card !== null) // Filter out the null entries
	};
	$inspect(data);
</script>

{#if data.type === 'brochures'}
	<Brochures {...brochures} />
{:else}
	<DefaultCards {...defaultCards} />
{/if}
