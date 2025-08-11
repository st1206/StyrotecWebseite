<script lang="ts">
	import { page } from '$app/state';
	import { siteData } from '$lib/config/metadata.js';
	import { locale } from 'svelte-i18n';
	import CMSSection from '$lib/components/cms-section.svelte';
	import type { SEOSection } from '$lib/types/sections';

	let { data } = $props();

	const seoData: SEOSection | undefined = $state(
		data.pageContent.cmsData['seo' as keyof typeof data.pageContent.cmsData]
	);
</script>

<svelte:head>
	<title>{seoData ? seoData.pageTitle : siteData.siteName}</title>
	<meta name="description" content={seoData ? seoData.pageDescription : siteData.siteDescription} />
	<meta property="og:title" content={seoData ? seoData.pageTitle : siteData.siteName} />
	<meta
		property="og:description"
		content={seoData ? seoData.pageDescription : siteData.siteDescription}
	/>
	<meta property="og:url" content={`https://styrotec.de/${page.url.pathname}`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteData.siteName} />
	<meta property="og:locale" content={$locale} />
</svelte:head>

{#if data.pageContent}
	{#each data.pageContent.sections as section}
		<CMSSection
			sectionKey={section.sectionKey}
			sectionData={data.pageContent.cmsData[
				section.sectionKey as keyof typeof data.pageContent.cmsData
			]}
			sectionProps={section.props}
			contactForm={data.pageContent.contactFormBuilder}
		/>
	{/each}
{:else}
	<p>Page not found</p>
{/if}
