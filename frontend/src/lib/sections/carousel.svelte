<script lang="ts">
	import type { ApiBilderBilder } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
    import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '$lib/components/ui/carousel';

    let { bilders }: { bilders: APIResponseCollection<ApiBilderBilder> }= $props();
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    
</script>




 {#each bilders.data as bild}
  
    <Carousel>
        <CarouselContent>
           
            {#each bild.Bilder as einzelbild}
                <CarouselItem class="object-cover object-center object-cover w-full  overflow-hidden "><img src={`${PUBLIC_BACKEND_URL}${einzelbild.url}`} alt="bildergallerie"></CarouselItem>                
            {/each}
         
        </CarouselContent>
        <CarouselPrevious class="left-10"/>
        <CarouselNext class="right-10"/>
    </Carousel>

{/each}

