<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let {
		pictures,
		height,
		autoPlay = true
	}: { pictures: any; height: number; autoPlay?: boolean } = $props();
	const plugin = Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: autoPlay });
</script>

	<Carousel.Root plugins={[plugin]}>
		<Carousel.Content style={`max-height: ${height}px`}>
			{#each pictures as picture}
				<Carousel.Item class="pl-0">
					<img
						class="h-full w-full object-cover"
						src={`${PUBLIC_BACKEND_URL}${picture.url}`}
						alt="bildergallerie"
					/>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<!-- <Carousel.Previous class="left-10" />
		<Carousel.Next class="right-10" /> -->
	</Carousel.Root>

