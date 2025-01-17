<!-- <script lang="ts">
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    
    let api = $state<CarouselAPI>();
    let current = $state(0);
    const count = $derived(api ? api.scrollSnapList().length : 0);
    
    $effect(() => {
     if (api) {
      current = api.selectedScrollSnap() + 1;
      api.on("select", () => {
       current = api!.selectedScrollSnap() + 1;
      });
     }
    });
   </script>
    
   <Carousel.Root setApi={(emblaApi) => (api = emblaApi)}>
    <Carousel.Content>
     <Carousel.Item>...</Carousel.Item>
     <Carousel.Item>...</Carousel.Item>
     <Carousel.Item>...</Carousel.Item>
    </Carousel.Content>
   </Carousel.Root> -->