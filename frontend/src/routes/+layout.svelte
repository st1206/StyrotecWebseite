<script lang="ts">
	import '../app.css';
	import SiteHeader from '$lib/layout/site-header.svelte';
	import SiteFooter from '$lib/layout/site-footer.svelte';
	import { _ } from 'svelte-i18n';
	import * as CookieConsent from 'vanilla-cookieconsent';
	import { onMount } from 'svelte';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';
	import { cookiesConfig } from '$lib/config/cookieconsent-config';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { data, children } = $props();

	onMount(() => {
		CookieConsent.run(cookiesConfig);
		// document.documentElement.classList.remove('cc--lightMode');
		// document.documentElement.classList.remove('cc--darkMode');
		// document.documentElement.classList.add('cc--elegant-black');
	});
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
