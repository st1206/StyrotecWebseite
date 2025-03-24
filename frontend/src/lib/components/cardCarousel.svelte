<script lang="ts">
	import type { ApiReferenzenReferenzen } from '$lib/cmsTypes/contentTypes';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Accordion from '$lib/components/ui/accordion';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let { referenzen }: { referenzen: any } = $props(); /* Todo: laden von ref in news-termine seite*/
	console.log(referenzen[0].Zeitpunkt);
</script>


	<Carousel.Root opts={{ loop: true }}>
		<Carousel.Content >
			
			{#each referenzen as referenz}
				<Carousel.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					
					<div
						class="bg-cover rounded-lg w-[100%] h-[250px] md:h-[400px] lg:h-[500px]"
						style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${referenz.Bilder[0].url}`
							: referenz.Bilder[0].url})"
					>
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg pt-16 px-12 md:pt-24 md:px-24"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-boldFont">{referenz.Titel} </h1>
								<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{referenz.Produkt}</p>
								<p>{referenz.Branche}</p>  
								<p>{referenz.Zeitpunkt.split("-").reverse().join(".")}</p>
								
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
			
            
		</Carousel.Content>
        <Carousel.Previous class="left-10 md:left-16 lg:left-32 xl:left-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary" />
		<Carousel.Next class="right-10 md:right-16 lg:right-32 xl:right-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary" />
	</Carousel.Root>

