<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import type { Employee } from '$lib/models/employee';
	import { SafeData } from '$lib/utils/validation';
	import { getImageAltText, optimizeImageUrl } from '$lib/utils/image';
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';
	import ImageCardGrid from '$lib/components/image-card-grid.svelte';

	type ImageCard = {
		title: string;
		subtitle: string;
		image: ImageAsset;
		employee: Employee;
		sortOrder: number;
		isImageTransparent: boolean;
	};

	let data: {
		title?: string;
		description?: string;
		media?: { name: string; url: string; mime: string } | ImageAsset;
		imageCards?: ImageCard[];
		anchor?: string;
	} = $props();

	// --- Primary Data Extraction ---
	const safe = new SafeData(data);
	const title = safe.getString('title', 'Media Section');
	const description = safe.getString('description', '');
	const anchor = safe.getString('anchor', '');
	const imageCards = safe.getArray<ImageCard>('imageCards', []);

	// --- Main Media Processing ---
	const mediaSafe = new SafeData(safe.getObject('media'));
	const mediaUrl = optimizeImageUrl(mediaSafe.getImageUrl(), PUBLIC_BACKEND_URL);
	const mediaMime = mediaSafe.getString('mime');
	const mediaName = mediaSafe.getString('name', 'Media file');

	const isVideo = mediaMime === 'video/mp4';
	const isImage =
		mediaMime?.startsWith('image/') ||
		(!mediaMime && mediaUrl && /\.(jpe?g|png|gif|webp|svg)$/i.test(mediaUrl));
	const hasValidMedia = !!(mediaUrl && (isVideo || isImage));

	// --- Card Processing  ---
	const processedCards = imageCards
		.map((card, index) => {
			const cardSafe = new SafeData(card);
			const employeeSafe = new SafeData(cardSafe.getObject('employee'));

			const imageObject =
				cardSafe.getObject('image') || (employeeSafe.getObject('picture') as ImageAsset);
			const imageUrl = optimizeImageUrl(
				new SafeData(imageObject).getImageUrl(),
				PUBLIC_BACKEND_URL
			);

			const isEmployee = !!cardSafe.getObject('employee');
			const displayName = isEmployee
				? employeeSafe.getString('name', 'Team Member')
				: cardSafe.getString('title', 'Card');
			const displaySubtitle = isEmployee
				? employeeSafe.getString('position', '')
				: cardSafe.getString('subtitle', '');

			return {
				title: displayName,
				subtitle: displaySubtitle,
				imageUrl,
				altText: getImageAltText(imageObject, displayName),
				isImageTransparent: cardSafe.getBoolean('isImageTransparent', false),
				sortOrder: cardSafe.getNumber('sortOrder', index + 1)
			};
		})
		.sort((a, b) => a.sortOrder - b.sortOrder);

	// --- Event Handlers ---
	function handleAssetError(event: Event) {
		const element = event.target as HTMLElement;
		const fallback = element.nextElementSibling as HTMLElement | null;
		if (fallback) {
			element.style.display = 'none';
			fallback.style.display = 'flex';
		}
	}
</script>

<section id={anchor} class="mt-20 scroll-mt-24 lg:container lg:mx-auto lg:mt-32 lg:w-full">
	<div class="bg-foreground lg:shadow-primary">
		{#if hasValidMedia}
			<!-- Video/Image Media (unverändert) -->
			{#if isVideo}
				<video
					autoplay
					loop
					muted
					class="max-h-[750px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
					style="display: block;"
					onerror={handleAssetError}
				>
					<source src={mediaUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div
					class="bg-secondary/20 text-muted-foreground flex max-h-[750px] min-h-[400px] w-full flex-col items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
					style="display: none;"
				>
					<Icons.play class="mb-4 size-16 opacity-50" />
					<h3 class="mb-2 text-lg font-semibold">{title}</h3>
					<p class="text-sm opacity-75">
						{$_('media.videoNotAvailable') || 'Video not available'}
					</p>
				</div>
			{:else if isImage}
				<img
					src={mediaUrl}
					alt={mediaName || title || 'Hero media'}
					class="max-h-[750px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
					style="display: block;"
					onerror={handleAssetError}
					loading="eager"
				/>
				<div
					class="bg-secondary/20 text-muted-foreground flex max-h-[750px] min-h-[400px] w-full flex-col items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
					style="display: none;"
				>
					<Icons.image class="mb-4 size-16 opacity-50" />
					<h3 class="mb-2 text-lg font-semibold">{title}</h3>
					<p class="text-sm opacity-75">
						{$_('media.imageNotAvailable') || 'Image not available'}
					</p>
				</div>
			{/if}
		{:else}
			<!-- No media available (unverändert) -->
			<div
				class="bg-secondary/20 text-muted-foreground flex max-h-[750px] min-h-[400px] w-full flex-col items-center justify-center [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
			>
				<Icons.fileVideo class="mb-4 size-16 opacity-50" />
				<h3 class="mb-2 text-lg font-semibold">{title}</h3>
				<p class="text-sm opacity-75">
					{$_('media.noMediaAvailable') || 'No media available'}
				</p>
			</div>
		{/if}

		<div class="p-8">
			{#if title || description}
				<div class="space-y-4 text-center">
					{#if title}
						<h2 class="text-secondary font-sans text-4xl font-bold">
							{title}
						</h2>
					{/if}
					{#if description}
						<p class="prose prose-neutral text-secondary lg:prose-lg mx-auto max-w-5xl text-center">
							{@html description}
						</p>
					{/if}
				</div>
			{/if}

			<!-- HIER KOMT DIE NEUE KOMPONENTE ZUM EINSATZ -->
			<ImageCardGrid cards={processedCards} isDarkMode={true} />
		</div>
	</div>
</section>
