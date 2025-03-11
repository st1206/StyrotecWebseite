<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	let { data } = $props();
</script>

<div>
	
    <img
		class="relative z-10 size-full object cover h-[600px]"
		src={portalfraes}
		alt="bild"
	/>
	<div class="hidden xl:block absolute top-[560px] w-full h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>
	
	
	
	
	

	<div>
		<div class="bg-secondary mx-[5%] my-[100px]">
			<h1 class="uppercase font-boldFont text-5xl text-center">TODO</h1>
			<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
				<!-- Kunststoff karte -->
				<KatCard titel={$_(`pressen.kunststoff`)} text="TODO" image={""} link="/produkte/spaenepressen/kunststoffe" />
				
				<!-- Metalle Karte -->
				<KatCard titel={$_(`pressen.metalle`)} text="TODO" image={""} link="/produkte/spaenepressen/metalle" />

				<!-- Styropor Karte -->
				<KatCard titel={$_(`pressen.styropor`)} text="TODO" image={""} link="/produkte/spaenepressen/styropor" />

			</div>
		</div>
	</div>
	
	
</div>
