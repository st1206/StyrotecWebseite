<script lang="ts">
	import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { CarouselAPI, CarouselOptions } from '$lib/components/ui/carousel/context';
	import { innerWidth } from 'svelte/reactivity/window';

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
	<div class="relative -mx-8 mt-20 lg:mx-auto lg:mt-32 lg:w-full lg:shadow-[5px_5px_0_#f6a313]">
		<div
			class="from-primary/90 via-primary/20 absolute inset-0 z-10 bg-gradient-to-r to-transparent"
		></div>

		<!-- Text content -->
		<div class="absolute inset-y-0 z-20 flex items-center pl-2 sm:container">
			<h1 class="font-boldFont text-4xl text-white drop-shadow-md lg:text-5xl">
				Fräsen mit <br /> Leidenschaft
			</h1>
		</div>

		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			plugins={[Autoplay(autoPlayOptions)]}
			opts={carouselOptions}
		>
			<Carousel.Content style={`height: ${(innerWidth?.current ?? 0) > 1440 ? 600 : 500}px`}>
				{#each data.pictures as picture, i}
					<Carousel.Item class="pl-0">
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

		<div class="absolute bottom-5 right-10 z-40 flex flex-col items-center">
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
<div
	class="bg-primary h-[15px] w-full [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)] lg:hidden"
></div>
