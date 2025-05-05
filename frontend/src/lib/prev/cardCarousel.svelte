<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let { referenzen }: { referenzen: any } = $props(); /* Todo: laden von ref in news-termine seite*/
</script>

<Carousel.Root opts={{ loop: true }}>
	<Carousel.Content>
		{#each referenzen as referenz, i}
			<Carousel.Item class="ml-[10%] mr-[10%] basis-1/2 ">
				<div
					class="h-[250px] w-[100%] rounded-lg bg-cover md:h-[400px] lg:h-[500px]"
					style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${referenz.Bilder[0].url}`
						: referenz.Bilder[0].url})"
				>
					<div
						class="relative h-full w-full rounded-lg bg-primary-foreground/75 px-12 pt-16 text-secondary md:px-24 md:pt-24"
					>
						<div class="h-[300px] w-[300px]">
							<h1 class="font-boldFont text-3xl uppercase md:text-4xl lg:text-5xl xl:text-6xl">
								{referenz.Titel}
							</h1>
							<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{referenz.Produkt}</p>
							<p>{referenz.Branche}</p>
							<p>{referenz.Zeitpunkt.split('-').reverse().join('.')}</p>
						</div>
					</div>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous
		class="left-10 border-2 border-primary-foreground bg-secondary bg-opacity-70 text-primary-foreground hover:bg-primary md:left-16 lg:left-32 xl:left-64"
	/>
	<Carousel.Next
		class="right-10 border-2 border-primary-foreground bg-secondary bg-opacity-70 text-primary-foreground hover:bg-primary md:right-16 lg:right-32 xl:right-64"
	/>
</Carousel.Root>
