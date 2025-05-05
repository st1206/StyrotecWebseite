<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import * as Carousel from '$lib/components/ui/carousel';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let options = { loop: true };
	let {
		pictures,
		height,
		autoPlay = true
	}: { pictures: any; height: number; autoPlay?: boolean } = $props();
	const plugin = Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: autoPlay });

	// Store für aktiven Slide-Index
	/* let selectedIndex = writable(0);
  	let carouselApi: any; // Speichert die Embla-Instanz

	function scrollToind(index: number) {
    	if (carouselApi) {
      		carouselApi.scrollTo(index,true);
			console.log("hi");
      		selectedIndex.set(index); // Setzt den aktiven Index für die Dots
    	}
  	}

	  onMount(async () => {
    await tick(); // Warten, bis das DOM vollständig gerendert wurde

    // Überprüfen, ob carouselApi korrekt zugewiesen wurde
    if (carouselApi) {
      console.log("Embla API erfolgreich initialisiert :", carouselApi);
      carouselApi.on("select", () => {
        const selectedIndexValue = carouselApi.selectedScrollSnap();
        selectedIndex.set(selectedIndexValue); // Aktualisiert den aktiven Index
      });
    } else {
      // Wenn carouselApi noch nicht zugewiesen ist, setzen wir es verzögert
      setTimeout(() => {
        if (carouselApi) {
          console.log("Embla API nach Verzögerung erfolgreich initialisiert:", carouselApi);
          carouselApi.on("select", () => {
            const selectedIndexValue = carouselApi.selectedScrollSnap();
            selectedIndex.set(selectedIndexValue); // Aktualisiert den aktiven Index
          });
        } else {
          console.error("carouselApi konnte nicht initialisiert werden");
        }
      }, 100); // Verzögerung von 100ms
    }
  });*/
</script>

<Carousel.Root plugins={[plugin]} opts={options} class="pt-[66px]">
	<Carousel.Content style={`max-height: ${height}px`}>
		{#each pictures as picture, i}
			<Carousel.Item class="pl-0">
				<img
					class="h-full w-full object-cover"
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${picture.url}`
						: picture.url}
					alt="Bilder"
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>

	<div class="relative bottom-10 left-[85%] -mt-3 hidden w-[10%] gap-2 xl:flex">
		{#each pictures as _, index}
			<button
				aria-label="hello"
				class="bg-primary-foreground relative h-3 w-3 rounded-full transition duration-300 hover:bg-gray-500"
			></button>
		{/each}
	</div>
	<!-- onclick={() => scrollToind(index)}
	  class:selected={$selectedIndex === index} -->
</Carousel.Root>
