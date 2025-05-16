<script lang="ts">
	import '../app.css';
	import SiteHeader from '$lib/layout/site-header.svelte';
	import SiteFooter from '$lib/layout/site-footer.svelte';
	import { _ } from 'svelte-i18n';

	let { data, children } = $props();
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
	<meta property="og:locale" content="DE_DE" /> -->
	<!-- <link rel="shortcut icon" href={logo} /> -->
</svelte:head>

<!-- root layout  -->

<div class="flex min-h-screen flex-col">
	<SiteHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter socialMediaChannels={data.socialMediaChannels} />
</div>
