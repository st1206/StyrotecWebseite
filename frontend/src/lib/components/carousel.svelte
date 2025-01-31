<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	const dev = import.meta.env.DEV;

	let {
		pictures,
		height,
		autoPlay = true
	}: { pictures: any; height: number; autoPlay?: boolean } = $props();
	const plugin = Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: autoPlay });
	console.log(pictures);
</script>

<Carousel.Root plugins={[plugin]}>
	<Carousel.Content style={`max-height: ${height}px`}>
		{#each pictures as picture}
			<Carousel.Item class="pl-0">
				<img
					class="h-full w-full object-cover"
					src={dev ? `${PUBLIC_BACKEND_URL}${picture.url}` : picture.url}
					alt="Bilder"
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<!-- <Carousel.Previous class="left-10" />
		<Carousel.Next class="right-10" /> -->
</Carousel.Root>
