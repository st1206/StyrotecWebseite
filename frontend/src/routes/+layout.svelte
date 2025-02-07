<script lang="ts">
	import SiteHeader from '$lib/layout/site-header.svelte';
	import '../app.css';
	let { children } = $props();
	import SiteFooter from '$lib/layout/site-footer.svelte';
	import SiteContact from '$lib/layout/site-contact.svelte';
	import type { Load } from '@sveltejs/kit';
	import { waitLocale } from 'svelte-i18n';

	export async function preload() {
		return waitLocale();
	}

	export const load: Load = async ({ url }) => {
		// Lese die Sprache aus der URL (z. B. /de oder /en)
		const lang = url.pathname.split('/')[1] || 'de'; // Standard: Deutsch

		return { lang };
	};

	/**
	 *
	 * Globale seo daten aus strapi 'global' laden und in head einfügen
	 *
	 */
</script>

<svelte:head>
	<!-- <title></title>
	<meta name="description" content="" />
	<meta name="keywords" content={} />
	<meta name="author" content="" />
	<meta property="og:title" content="" />
	<meta property="og:url" content={} />
	<meta property="og:image" content="" />
	<meta property="og:image:alt" content={} />
	<meta property="og:description" content={} />
	<meta property="og:site_name" content={} />
	<meta property="og:locale" content="DE_DE" />
	<link rel="shortcut icon" href="" /> -->
</svelte:head>

<!-- root layout  -->

<div class="bg-secondary flex  flex-col">
	<SiteHeader />
	<main
		class="relative  flex-1 "
		style="margin-right: 0; margin-left: 0"
	>
		{@render children()}
	</main>
	<SiteContact />
	<SiteFooter />
</div>
