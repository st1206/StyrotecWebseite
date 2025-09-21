<script lang="ts">
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { SafeData } from '$lib/utils/validation';
	import { getOptimizedImageUrl, getImageAltText, handleImageError } from '$lib/utils/image';

	let data: {
		title?: string;
		subtitle?: string;
		content?: string;
		image?: ImageAsset;
	} = $props();

	// Create safe data accessor
	const safe = new SafeData(data);

	// Get safe values with fallbacks
	const title = safe.getString('title', 'Untitled Section');
	const subtitle = safe.getString('subtitle');
	const content = safe.getString('content', 'No content available.');
	const imageAlt = getImageAltText(data.image, 'Hero image');

	const optimizedImageUrl = getOptimizedImageUrl(data.image);
</script>

<section
	class="bg-secondary mx-auto mb-32 mt-20 flex w-full flex-col gap-16 px-4 sm:container lg:my-36 lg:flex-row"
>
	<div class="flex w-full flex-col items-center justify-center">
		<div class="mb-4">
			<h2
				class="uppercases text-right font-sans text-3xl font-bold sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl"
			>
				{title}
			</h2>
			{#if subtitle}
				<h3 class="text-right text-2xl uppercase xl:text-3xl">
					{subtitle}
				</h3>
			{/if}
		</div>
		<div
			class="prose prose-sm prose-neutral md:prose-base xl:prose-lg text-justif max-w-none text-center lg:text-start"
		>
			{#if (content || '').includes('<')}
				{@html content}
			{:else}
				<p>{content}</p>
			{/if}
		</div>
	</div>

	{#if optimizedImageUrl}
		<!-- Image section with robust error handling -->
		<div class="mx-auto flex w-full max-w-lg items-center justify-center">
			<img
				src={optimizedImageUrl}
				alt={imageAlt}
				class="shadow-primary h-[300px] w-full object-cover lg:h-[330px] xl:h-[400px]"
				loading="lazy"
				onerror={handleImageError}
			/>
			<!-- Fallback for broken images -->
			<div
				class="bg-muted shadow-primary mx-auto hidden h-[300px] w-auto flex-col items-center justify-center rounded-lg lg:h-[330px] xl:h-[400px]"
			>
				<svg
					class="text-muted-foreground mb-2 h-16 w-16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<p class="text-muted-foreground text-sm">Image not available</p>
			</div>
		</div>
	{/if}
</section>
