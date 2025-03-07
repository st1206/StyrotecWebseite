<script lang="ts">
	import type { ApiReferenzenReferenzen } from '$lib/cmsTypes/contentTypes';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Accordion from '$lib/components/ui/accordion';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	let { referenzen }: { referenzen: any } = $props(); /* Todo: laden von ref in news-termine seite*/
	console.log(referenzen[0].Zeitpunkt);
</script>

<div class="w-full  ">
	<Carousel.Root opts={{ loop: true }}>
		<Carousel.Content style={`max-height: 600px`} >
			
			{#each referenzen as referenz}
				<Carousel.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					
					<div
						class="bg-cover rounded-lg"
						style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${referenz.Bilder[0].url}`
							: referenz.Bilder[0].url})"
					>
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-3xl uppercase font-boldFont">{referenz.Titel} </h1>
								<p class="text-xl">{referenz.Produkt}</p>
								<p>{referenz.Branche}</p>  
								<p>{referenz.Zeitpunkt.split("-").reverse().join(".")}</p>
								
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
			
            
		</Carousel.Content>
        <Carousel.Previous class="left-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary" />
		<Carousel.Next class="right-64 bg-opacity-70 border-primary hover:bg-primary border-2 bg-secondary/15" />
	</Carousel.Root>
</div>
