<script lang="ts">
	import type { ApiPicturePicture } from '$lib/cmsTypes/contentTypes';
    import type { APIResponseCollection } from '$lib/cmsTypes/types';
    import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '$lib/components/ui/carousel';

    let { pictures }: { pictures: APIResponseCollection<ApiPicturePicture>} = $props();
</script>

{#await pictures}
 <div>loading pictures...</div>
{:then pictures}
    {#each pictures.data as picture}
    <Carousel>
        <CarouselContent>
            <div>{pictures.data}</div>
        <CarouselItem>{picture.Bilder}</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
    {/each}
 {/await}