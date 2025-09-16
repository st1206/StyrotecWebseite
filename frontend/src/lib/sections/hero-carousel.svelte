<script lang="ts">
	import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI, CarouselOptions } from '$lib/components/ui/carousel/context';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { Icons } from '$lib/assets/icons';
	import { SafeData } from '$lib/utils/validation';
	import { getOptimizedImageUrl, getImageAltText, handleImageError } from '$lib/utils/image';

	let data: { keyphrase?: string; images?: ImageAsset[]; carouselSpeed?: number } = $props();

	// Create safe data accessor
	const safe = new SafeData(data);
	const keyphrase = safe.getString('keyphrase');
	const images = safe.getArray<ImageAsset>('images', []);
	const carouselSpeed = safe.getNumber('carouselSpeed');

	let api = $state<CarouselAPI>();

	const autoPlayOptions: AutoplayOptionsType = {
		delay: carouselSpeed || 4000,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	};

	const carouselOptions: CarouselOptions = {
		loop: images.length > 1,
		watchDrag: images.length > 1,
		dragFree: false,
		containScroll: 'trimSnaps',
		align: 'start',
		breakpoints: {
			'(min-width: 768px)': {
				align: 'start'
			}
		}
	};

	let current = $state(0);

	// Filter out invalid images
	const validImages = $derived(
		images.filter((image) => {
			const url = getOptimizedImageUrl(image);
			return url && url.length > 0;
		})
	);

	const hasValidImages = $derived(validImages.length > 0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});

	function goToPreviousSlide() {
		if (api) {
			api.scrollPrev();
		}
	}

	function goToNextSlide() {
		if (api) {
			api.scrollNext();
		}
	}

	function goToSlide(slide: number) {
		current = slide;
		api?.scrollTo(slide - 1);
	}

	function getDotClass(slide: number) {
		return slide === current
			? 'w-2 h-2 bg-primary transition focus:outline-none'
			: 'w-2 h-2 bg-secondary/70 hover:bg-secondary transition focus:outline-none';
	}
</script>

<section class="mx-auto mt-20 lg:container lg:mt-32 lg:w-full">
	{#if hasValidImages}
		<div class="shadow-primary relative">
			<Carousel.Root
				setApi={(emblaApi) => (api = emblaApi)}
				plugins={validImages.length > 1 ? [Autoplay(autoPlayOptions) as any] : []}
				opts={carouselOptions}
			>
				<Carousel.Content class="h-[350px] md:h-[500px] lg:h-[600px]">
					{#each validImages as image, i}
						{@const imageUrl = getOptimizedImageUrl(image)}
						{@const imageAlt = getImageAltText(image, `Carousel image ${i + 1}`)}
						<Carousel.Item class="pl-0">
							<img
								class="h-full w-full object-cover"
								src={imageUrl}
								alt={imageAlt}
								loading={i === 0 ? 'eager' : 'lazy'}
								onerror={handleImageError}
							/>
							<div class="bg-muted flex h-full w-full flex-col items-center justify-center">
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
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p class="text-muted-foreground text-sm">Image {i + 1} not available</p>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>

			<!-- Gradient and Title Overlay -->
			<div
				class="from-foreground/100 via-foreground/40 pointer-events-none absolute inset-0 z-10 bg-gradient-to-r to-transparent"
			>
				<div class="relative h-full w-full">
					{#if keyphrase}
						<div class="absolute inset-y-0 z-20 flex items-center pl-8">
							<h1 class="font-sans text-4xl font-bold text-white drop-shadow-md lg:text-5xl">
								{#if keyphrase.includes('<')}
									{@html keyphrase}
								{:else}
									{keyphrase}
								{/if}
							</h1>
						</div>
					{/if}
				</div>
			</div>

			<!-- Navigation Controls -->
			{#if validImages.length > 1}
				<div class="absolute bottom-5 left-10 z-20 flex items-center gap-1">
					<button type="button" aria-label="Go to previous slide" onclick={goToPreviousSlide}>
						<Icons.chevronLeft class="text-secondary/70 hover:text-secondary size-5 transition" />
					</button>
					<div class="flex items-center space-x-2">
						{#each Array.from({ length: validImages.length }, (_, i) => i + 1) as slide (slide)}
							<button
								type="button"
								aria-label="Go to slide {slide}"
								onclick={() => goToSlide(slide)}
								class={getDotClass(slide)}
							></button>
						{/each}
					</div>
					<button type="button" aria-label="Go to next slide" onclick={goToNextSlide}>
						<Icons.chevronRight class="text-secondary/70 hover:text-secondary size-5 transition" />
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<!-- Fallback content remains the same -->
		<div
			class="border-muted-foreground/20 bg-muted shadow-primary relative flex h-[500px] flex-col items-center justify-center border-2 border-dashed lg:h-[600px]"
		>
			{#if keyphrase}
				<div class="absolute inset-y-0 z-20 flex items-center pl-8">
					<h1 class="text-foreground font-sans text-4xl font-bold drop-shadow-md lg:text-5xl">
						{#if keyphrase.includes('<')}
							{@html keyphrase}
						{:else}
							{keyphrase}
						{/if}
					</h1>
				</div>
			{/if}

			<div class="text-center">
				<svg
					class="text-muted-foreground mx-auto mb-4 h-16 w-16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<p class="text-muted-foreground text-lg">No carousel images available</p>
				{#if images.length > 0}
					<p class="text-muted-foreground mt-2 text-sm">
						{images.length} image(s) provided but none could be loaded
					</p>
				{:else}
					<p class="text-muted-foreground mt-2 text-sm">
						No images were provided for this carousel
					</p>
				{/if}
			</div>
		</div>
	{/if}
</section>
