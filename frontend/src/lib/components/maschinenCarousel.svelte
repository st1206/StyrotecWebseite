<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';

	const dev = import.meta.env.DEV;
	let { pictures, height }: { pictures: any; height: number; autoPlay?: boolean } = $props();
</script>

<div class="relative">
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
		{#if pictures.length > 1}
			<Carousel.Previous class="  left-2 border-2 border-black bg-opacity-70" />
			<Carousel.Next class=" right-2  border-2 border-black bg-opacity-70" />
		{/if}
	</Carousel.Root>
</div>
