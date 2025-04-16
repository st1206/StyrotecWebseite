<script lang="ts">
	import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { CarouselAPI, CarouselOptions } from '$lib/components/ui/carousel/context';

	let data = $props();

	let api = $state<CarouselAPI>();

	const autoPlayOptions: AutoplayOptionsType = {
		delay: 5000,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	};
	const carouselOptions: CarouselOptions = {
		loop: true,
		dragFree: false,
		containScroll: 'trimSnaps',
		align: 'start',
		breakpoints: {
			'(min-width: 768px)': {
				align: 'start'
			}
		}
	};

	const count = $derived(api ? api.scrollSnapList().length : 0);
	let current = $state(0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});

	// Function to change the slide.
	function goToSlide(slide: number) {
		current = slide;
		api?.scrollTo(slide - 1);
	}

	// Helper function to compute the CSS classes for each dot.
	function getDotClass(slide: number) {
		return slide === current
			? 'w-3 h-3 rounded-full bg-primary transition focus:outline-none'
			: 'w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500 transition focus:outline-none';
	}
</script>

<section class="sm:container">
	<div class="relative -mx-8 mt-32 xl:shadow-[5px_5px_0_#f6a313]">
		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			plugins={[Autoplay(autoPlayOptions)]}
			opts={carouselOptions}
		>
			<Carousel.Content style={`max-height: ${600}px`}>
				{#each data.pictures as picture, i}
					<Carousel.Item class="pl-0 ">
						<img
							class="h-full w-full object-cover"
							src={!PUBLIC_BACKEND_URL.includes('https')
								? `${PUBLIC_BACKEND_URL}${picture.url}`
								: picture.url}
							alt="Bilder"
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>

		<div class="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center">
			<!-- Dot Navigation -->
			<div class="flex space-x-2">
				{#each Array.from({ length: count }, (_, i) => i + 1) as slide (slide)}
					<button
						type="button"
						aria-label="Go to slide {slide}"
						onclick={() => goToSlide(slide)}
						class={getDotClass(slide)}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
