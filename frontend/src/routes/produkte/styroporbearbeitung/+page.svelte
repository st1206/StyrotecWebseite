<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import gebrauma from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	let { data } = $props();
</script>

{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie[0].Bilder} />
	</div>
{/await}
<div class="hidden xl:block absolute top-[560px] w-full h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>
<div class="bg-secondary flex flex-col gap-16 p-[5%] xl:gap-32">
	<div
		class=" bg-primary-foreground border-2 border-solid p-4 shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:mx-[10%] xl:p-24"
	>
		<h3 class="text-secondary text-2xl uppercase xl:text-5xl">
			{$_(`styroporbearbeitung.titel`)}
		</h3>
	</div>

	<div class="bg-secondary text-primary-foreground text-xl">
		<Tabs tabStyle="full" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary" ulClass="space-x-0 p-1 gap-2">
			<TabItem open title={$_(`styroporbearbeitung.fräswerkzeuge`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`styroporbearbeitung.fräswerkzeuge`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`styroporbearbeitung.fräswerkzeuge-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/styroporbearbeitung/fräswerkzeuge">{$_(`styroporbearbeitung.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={gebrauma}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
         </Tabs>
    </div>
</div>