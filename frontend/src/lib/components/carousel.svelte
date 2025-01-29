<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';

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
				<img class="h-full w-full object-cover" src={picture.url} alt="nonnoooo" />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<!-- <Carousel.Previous class="left-10" />
		<Carousel.Next class="right-10" /> -->
</Carousel.Root>
