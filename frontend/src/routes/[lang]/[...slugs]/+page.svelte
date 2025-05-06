<script lang="ts">
	import { sectionMap } from '$lib/sections';

	let { data } = $props();
</script>

{#if data.pageContent}
	{console.log('pageContent', data.pageContent)}
	{#each data.pageContent.sections as section}
		{@const SectionComponent = sectionMap[section.sectionKey as keyof typeof sectionMap]}
		{#if SectionComponent}
			<SectionComponent
				{...data.pageContent.cmsData[section.sectionKey as keyof typeof data.pageContent.cmsData]}
				{...section.props}
			/>
		{:else}
			<p>Section {section.sectionKey} not found</p>
		{/if}
	{/each}
{:else}
	<p>Page not found</p>
{/if}
