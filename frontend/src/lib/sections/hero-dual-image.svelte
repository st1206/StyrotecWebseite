<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { cn } from '$lib/utils';
	import { SafeData } from '$lib/validation';
	import { handleImageError, optimizeImageUrl } from '$lib/image';
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';

	let data: {
		keyword?: string;
		subKeyword?: string;
		image?: ImageAsset;
		heroTextImage?: { title?: string; subtitle?: string; content?: string; image?: ImageAsset };
	} = $props();

	const safe = new SafeData(data);
	const keyword = safe.getString('keyword', 'Hero Section');
	const subKeyword = safe.getString('subKeyword', '');
	const image = safe.getObject<ImageAsset>('image');
	const heroTextImage = safe.getObject('heroTextImage', {});

	const heroTextImageSafe = new SafeData(heroTextImage);
	const heroData = {
		title: heroTextImageSafe.getString('title', ''),
		subtitle: heroTextImageSafe.getString('subtitle', ''),
		content: heroTextImageSafe.getString('content', ''),
		image: heroTextImageSafe.getObject('image') as ImageAsset
	};

	function getHeroImageUrl(imageData: any): string {
		if (!imageData) return '';

		const imageSafe = new SafeData(imageData);
		const formats = imageSafe.getObject('formats', {}) as Record<string, any>;
		const url = formats.large?.url || formats.medium?.url || imageSafe.getString('url');

		return url ? optimizeImageUrl(url, PUBLIC_BACKEND_URL) : '';
	}
	const mainImageUrl = getHeroImageUrl(image);
	const secondaryImageUrl = getHeroImageUrl(heroData.image);

	// Validation
	const hasMainImage = !!mainImageUrl;
	const hasSecondaryImage = !!secondaryImageUrl;
	const hasContent = !!(heroData.title || heroData.subtitle || heroData.content);
</script>

<section class="mt-20 lg:container lg:mx-auto lg:mt-32 lg:w-full">
	<BlurFade once={true} delay={0} duration={0.3}>
		<div class="relative">
			<div
				class={cn(
					keyword.length <= 5 ? 'w-2/5' : 'w-3/5',
					'bg-foreground/95 absolute hidden h-[130px] [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] md:block lg:h-[200px]'
				)}
			>
				<h1
					class={cn(
						keyword.length <= 5 ? 'w-3/5 lg:w-2/5' : 'w-1/2',
						keyword.length <= 15 ? 'xl:text-5xl' : '',
						'text-secondary pt-6 text-center font-sans text-3xl font-bold lg:pt-12 lg:text-4xl'
					)}
				>
					{keyword || '-'}
				</h1>
			</div>
			{#if hasMainImage}
				<!-- Main hero image -->
				<img
					src={mainImageUrl}
					alt={image?.alternativeText || keyword || 'Hero image'}
					class="bg-secondary shadow-foreground z-20 h-[300px] w-full object-cover lg:h-[600px]"
					style="display: block;"
					onerror={handleImageError}
					loading="eager"
				/>

				<!-- Fallback for broken main image -->
				<div
					class="bg-secondary text-muted-foreground shadow-foreground z-20 flex h-[300px] w-full flex-col items-center justify-center lg:h-[600px]"
					style="display: none;"
				>
					<Icons.image class="mb-4 size-16 opacity-50" />
					<h2 class="mb-2 text-xl font-bold">{keyword}</h2>
					<p class="text-sm opacity-75">
						{$_('common.imageNotAvailable') || 'Image not available'}
					</p>
				</div>
			{:else}
				<!-- No main image available -->
				<div
					class="bg-secondary text-muted-foreground shadow-foreground z-20 flex h-[300px] w-full flex-col items-center justify-center lg:h-[600px]"
				>
					<Icons.image class="mb-4 size-16 opacity-50" />
					<h2 class="mb-2 text-xl font-bold">{keyword}</h2>
					<p class="text-sm opacity-75">
						{$_('common.noImageAvailable') || 'No image available'}
					</p>
				</div>
			{/if}
			{#if subKeyword}
				<BlurFade once={true} delay={0.2} duration={0.3}>
					<div
						class={cn(
							hasSecondaryImage ? 'bg-foreground' : 'bg-foreground/95',
							'absolute bottom-0 right-0 hidden h-[200px] w-2/5 [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block'
						)}
					>
						{#if hasSecondaryImage}
							<h2
								class="text-secondary absolute bottom-12 right-10 font-sans text-3xl font-bold xl:text-4xl"
							>
								{subKeyword}
							</h2>
						{/if}
					</div>
				</BlurFade>
			{/if}
		</div>
	</BlurFade>

	<div class="relative w-full">
		<BlurFade once={true} delay={0.3} duration={0.3}>
			{#if hasContent}
				<div
					class={cn(
						hasSecondaryImage ? 'absolute left-0 h-[410px] lg:w-3/5' : 'px-16 pt-16 lg:w-full',
						'flex w-full flex-col items-center justify-center px-4 sm:px-8'
					)}
				>
					<div class="mb-4">
						{#if heroData.title}
							<h2
								class={cn(
									hasSecondaryImage ? 'text-right' : 'text-center',
									'text-right font-sans text-3xl font-bold uppercase sm:text-4xl xl:text-5xl'
								)}
							>
								{heroData.title}
							</h2>
						{/if}
						{#if heroData.subtitle}
							<h3
								class={cn(
									hasSecondaryImage ? 'text-right' : 'text-center',
									'text-2xl uppercase xl:text-3xl'
								)}
							>
								{heroData.subtitle}
							</h3>
						{/if}
					</div>
					{#if heroData.content}
						<p
							class={cn(
								hasSecondaryImage ? '' : 'max-w-7xl text-center',
								'prose prose-neutral xl:prose-lg max-w-none'
							)}
						>
							{@html heroData.content}
						</p>
					{/if}
				</div>
			{:else}
				<!-- Empty content state -->
				<div class="flex w-full flex-col items-center justify-center px-4 py-16 sm:px-8">
					<Icons.fileText class="mb-4 size-12 opacity-30" />
					<p class="text-muted-foreground text-center">
						{$_('hero.noContent') || 'No content available for this section'}
					</p>
				</div>
			{/if}
		</BlurFade>

		{#if hasSecondaryImage}
			<BlurFade once={true} delay={0.1} duration={0.3}>
				<div
					class="shadow-foreground absolute right-0 hidden h-[600px] w-2/5 -translate-y-[194px] lg:block"
				>
					{#if subKeyword}
						<div
							class="bg-foreground/95 absolute bottom-0 right-0 z-30 h-1/4 w-2/3 [clip-path:polygon(0%_100%,100%_100%,100%_0%)]"
						>
							<h2
								class="text-secondary absolute bottom-6 right-7 font-sans text-3xl font-bold xl:text-4xl"
							>
								{subKeyword}
							</h2>
						</div>
					{/if}

					<!-- Secondary image with fallback -->
					<img
						src={secondaryImageUrl}
						alt={heroData.image?.alternativeText || heroData.title || 'Secondary hero image'}
						class="h-full w-full object-cover [clip-path:polygon(0%_33.2%,100%_0%,100%_100%,0%_100%)]"
						style="display: block;"
						onerror={handleImageError}
						loading="lazy"
					/>

					<!-- Fallback for broken secondary image -->
					<div
						class="bg-secondary/20 text-muted-foreground flex h-full w-full flex-col items-center justify-center [clip-path:polygon(0%_33.2%,100%_0%,100%_100%,0%_100%)]"
						style="display: none;"
					>
						<Icons.image class="mb-2 size-12 opacity-50" />
						<p class="px-4 text-center text-sm">
							{heroData.title || 'Secondary Image'}
						</p>
						<p class="mt-1 text-xs opacity-75">
							{$_('common.imageNotAvailable') || 'Image not available'}
						</p>
					</div>
				</div>
			</BlurFade>
		{/if}
	</div>
	{#if hasSecondaryImage}
		<div class="h-[410px]"></div>
	{/if}
</section>
