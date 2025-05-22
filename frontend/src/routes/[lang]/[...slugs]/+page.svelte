<script lang="ts">
	import { page } from '$app/state';
	import { siteData } from '$lib/config/metadata.js';
	import { sectionMap } from '$lib/sections';
	import { locale } from 'svelte-i18n';

	let { data } = $props();

	type SEOObject = {
		pageTitle: string;
		pageDescription: string;
		keywords: string;
	};

	const seoData: SEOObject = $state(
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
	{console.log(data)}
	{#each data.pageContent.sections as section}
		{@const SectionComponent = sectionMap[section.sectionKey as keyof typeof sectionMap]}
		{#if SectionComponent}
			<SectionComponent
				{...data.pageContent.cmsData[section.sectionKey as keyof typeof data.pageContent.cmsData]}
				{...section.props}
				contactForm={data.pageContent.contactFormBuilder}
			/>
		{:else if section.sectionKey !== 'seo'}
			<p>Section {section.sectionKey} not found</p>
		{/if}
	{/each}
{:else}
	<p>Page not found</p>
{/if}
