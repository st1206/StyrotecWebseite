<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	const dev = import.meta.env.DEV;
	let { pictures, height }: { pictures: any; height: number; autoPlay?: boolean } = $props();
</script>

<Carousel.Root>
	<Carousel.Content style={`max-height: ${height}px`}>
		{#each pictures as picture}
			<Carousel.Item class="pl-0">
				<img
					class="h-full w-full object-cover"
					src={dev ? `${picture.url}` : picture.url}
					alt="bildergallerie"
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="left-10 top-80 bg-opacity-70 border-black border-2" />
	<Carousel.Next class="right-10 top-80 bg-opacity-70 border-black border-2" />
</Carousel.Root>
