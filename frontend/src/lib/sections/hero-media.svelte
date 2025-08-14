<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import type { Employee } from '$lib/models/employee';
	import { SafeData } from '$lib/utils/validation';
	import { optimizeImageUrl } from '$lib/utils/image';
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';

	type ImageCard = {
		title: string;
		subtitle: string;
		image: ImageAsset;
		employee: Employee;
		sortOrder: number;
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

	// --- Card Processing ---
	const processedCards = imageCards.map((card, index) => {
		const cardSafe = new SafeData(card);
		const employeeSafe = new SafeData(cardSafe.getObject('employee'));

		$inspect(cardSafe);
		$inspect(employeeSafe);

		// Determine the primary image URL, prioritizing the card's own image
		const imageObject = cardSafe.getObject('image') || employeeSafe.getObject('picture');
		const imageUrl = optimizeImageUrl(new SafeData(imageObject).getImageUrl(), PUBLIC_BACKEND_URL);

		// Determine display name/subtitle, prioritizing employee data
		const isEmployee = !!cardSafe.getObject('employee');
		$inspect(isEmployee);
		const displayName = isEmployee
			? employeeSafe.getString('name', 'Team Member')
			: cardSafe.getString('title', 'Card');
		const displaySubtitle = isEmployee
			? employeeSafe.getString('position', '')
			: cardSafe.getString('subtitle', '');

		return {
			displayName,
			displaySubtitle,
			imageUrl,
			image: cardSafe.getObject<ImageAsset>('image'),
			sortOrder: cardSafe.getNumber('sortOrder', index + 1)
		};
	});

	// --- Derived State ---
	const sortedCards = $derived(processedCards.slice().sort((a, b) => a.sortOrder - b.sortOrder));

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
			{#if isVideo}
				<!-- Video media -->
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
				<!-- Fallback for broken video -->
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
				<!-- Image media -->
				<img
					src={mediaUrl}
					alt={mediaName || title || 'Hero media'}
					class="max-h-[750px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
					style="display: block;"
					onerror={handleAssetError}
					loading="eager"
				/>
				<!-- Fallback for broken image -->
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
			<!-- No media available -->
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

			{#if sortedCards.length > 0}
				<div class="mt-16 grid grid-cols-1 flex-wrap gap-12 md:grid-cols-2 xl:grid-cols-3">
					{#each sortedCards as card}
						<div class="bg-foreground/10 relative shadow-xl">
							{#if card.imageUrl}
								<!-- Card image with fallback -->
								<img
									src={card.imageUrl}
									alt={card.image?.alternativeText || card.displayName}
									class="mx-auto h-[300px] w-auto object-cover object-top lg:h-[330px] xl:h-[400px]"
									style="display: block;"
									onerror={handleAssetError}
									loading="lazy"
								/>
								<!-- Fallback for broken card image -->
								<div
									class="bg-secondary/20 text-muted-foreground flex h-[300px] flex-col items-center justify-center lg:h-[330px] xl:h-[400px]"
									style="display: none;"
								>
									<Icons.user class="mb-2 size-12 opacity-50" />
									<p class="px-4 text-center text-sm">{card.displayName}</p>
									<p class="mt-1 text-xs opacity-75">
										{$_('common.imageNotAvailable') || 'Image not available'}
									</p>
								</div>
							{:else}
								<!-- No image available -->
								<div
									class="bg-secondary/20 text-muted-foreground flex h-[300px] flex-col items-center justify-center lg:h-[330px] xl:h-[400px]"
								>
									<Icons.user class="mb-2 size-12 opacity-50" />
									<p class="px-4 text-center text-sm">{card.displayName}</p>
									<p class="mt-1 text-xs opacity-75">
										{$_('common.noImageAvailable') || 'No image available'}
									</p>
								</div>
							{/if}

							<div
								class="bg-foreground/90 absolute bottom-0 flex w-full flex-col justify-between p-2 px-4"
							>
								<h4 class="text-secondary font-sans text-3xl font-bold">
									{card.displayName}
								</h4>
								{#if card.displaySubtitle}
									<h5 class="text-primary">{card.displaySubtitle}</h5>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else if title || description}
				<!-- Empty cards state -->
				<div class="mt-16 flex flex-col items-center justify-center py-8 text-center">
					<Icons.users class="mb-4 size-12 opacity-30" />
					<p class="text-secondary/70">
						{$_('media.noCardsAvailable') || 'No team members or cards available'}
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>
