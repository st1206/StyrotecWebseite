<script lang="ts">
	import SiteHeader from '$lib/layout/site-header.svelte';
	import '../app.css';
	let { children } = $props();
	import SiteFooter from '$lib/layout/site-footer.svelte';
	import SiteContact from '$lib/layout/site-contact.svelte';
	import BottomContactForm from '$lib/layout/bottom-contactForm.svelte';
	import logo from '$lib/assets/images/Logo_schwarzeSchrift_orange.gif';
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
	<link rel="shortcut icon" href={logo} />
</svelte:head>

<!-- root layout  -->

<div class="flex flex-col bg-secondary">
	<SiteHeader />
	<main class="relative flex-1" style="margin-right: 0; margin-left: 0">
		{@render children()}
	</main>
	<BottomContactForm />
	<SiteContact />
	<SiteFooter />
</div>
