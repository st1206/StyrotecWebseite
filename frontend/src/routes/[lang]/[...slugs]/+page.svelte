<script lang="ts">
	import { page } from '$app/state';
	import { siteData } from '$lib/config/metadata.js';
	import { locale } from 'svelte-i18n';
	import CMSSection from '$lib/components/cms-section.svelte';
	import { type PageData } from './$types';
	import ContactPopover from '$lib/components/contact-popover.svelte';

	let props = $props<{ data: PageData }>();

	const seoData = $derived(
		props.data.pageContent.cmsData['seo' as keyof typeof props.data.pageContent.cmsData]
	);

	// Create a unique key for the page to force re-rendering on navigation
	const pageKey = $derived(
		`${page.url.pathname}-${props.data.pageContent?.cmsApiSlug || 'fallback'}`
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

{#key pageKey}
	{#if props.data.pageContent}
		{#each props.data.pageContent.sections as section (section.sectionKey)}
			<CMSSection
				sectionKey={section.sectionKey}
				sectionData={props.data.pageContent.cmsData[
					section.sectionKey as keyof typeof props.data.pageContent.cmsData
				]}
				sectionProps={section.props}
				contactForm={props.data.pageContent.contactFormBuilder}
			/>
		{/each}
		{#if props.data.pageContent.cmsData.contactForm}
			<ContactPopover
				name={props.data.pageContent.cmsData.contactForm.employee.name}
				position={props.data.pageContent.cmsData.contactForm.employee.position}
				picture={props.data.pageContent.cmsData.contactForm.employee.contactPicture}
			/>
		{/if}
	{:else}
		<p>Page not found</p>
	{/if}
{/key}
