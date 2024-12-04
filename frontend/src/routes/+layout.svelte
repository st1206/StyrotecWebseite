<script lang="ts">
	import SiteHeader from '$lib/layout/site-header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="relative flex min-h-screen flex-col items-center">
	<SiteHeader />
	<main class="flex-1 sm:container">
		{@render children()}
	</main>
</div>

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
