<script lang="ts">
	import SiteHeader from '$lib/layout/site-header.svelte';
	import '../app.css';
	let { children } = $props();
	import SiteFooter from '$lib/layout/site-footer.svelte';
	import SiteContact from '$lib/layout/site-contact.svelte';

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

<div class="from-background via-secondary to-secondary-foreground flex min-h-screen flex-col bg-gradient-to-b from-10%">
	<SiteHeader />
	<main
		class="relative mt-[66px] flex-1 py-4 sm:py-7"
		style="margin-right: 0; margin-left: 0"
	>
		{@render children()}
	</main>
	<SiteContact />
	<SiteFooter />
</div>
