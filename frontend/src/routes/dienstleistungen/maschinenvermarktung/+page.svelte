<script lang="ts">
	import head from '$lib/assets/images/homepage/bild11.jpg';
    import Button from '$lib/components/ui/button/button.svelte';
    import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	import { Heading1Icon } from 'lucide-svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Maschinenvermarktung - Übersicht</title>
	<meta
		name="description"
		content=""
	/>
</svelte:head>


<!-- Head -->
{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie.filter(item=> item.Kategorie ==="Maschinenvermarktung")[0].Bilder} />
	</div>
{/await}
<div class="relative -top-[50px] w-full h-[100px] md:h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>

<!-- überschrift, top text + Image -->
<div class="bg-secondary flex flex-col py-[30px] lg:flex-row">
	<div class="w-[90%] md:w-[60%]">
		<div class="relative mb-4 md:-left-[5%] xl:-left-[20%]">
			<h3
				class="text-primary-foreground font-boldFont pl-2 text-right text-xl uppercase md:pl-6 md:text-3xl lg:pl-12 lg:text-5xl"
			>
				{$_(`maschinenvermarktung.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`maschinenvermarktung.sub`)}
			</h1>
		</div>
		<p class="p-4 md:text-xl lg:text-2xl xl:mx-[10%]">{$_(`maschinenvermarktung.beschreibungs-text`)}</p>
	</div>
	<img
		src={head}
		alt="action bild"
		class="hidden h-[400px] w-[30%] rounded-lg object-cover lg:block"
	/>
</div>

<!-- Weiterleitungs -cards  zu Kategorien-->
<div class="bg-secondary mx-[5%] my-[100px]">
	<h1 class="font-boldFont text-center text-5xl uppercase">TODO</h1>
	<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
		
		<!-- Bewertung karte -->
		<KatCard
			titel={$_(`maschinenvermarktung.bewertung`)}
			text={$_(`maschinenvermarktung.bewertung-text`)}
			image={head}
			link="/dienstleistungen/maschinenvermarktung/bewertung"
		/>

		<!-- Vermittlung  Karte -->
		<KatCard
			titel={$_(`maschinenvermarktung.vermittlung`)}
			text={$_(`maschinenvermarktung.vermittlung-text`)}
			image={head}
			link="/dienstleistungen/maschinenvermarktung/vermittlung"
		/>

		<!-- Ankauf Karte -->
		<KatCard
			titel={$_(`maschinenvermarktung.ankauf`)}
			text={$_(`maschinenvermarktung.ankauf-text`)}
			image={head}
			link="/dienstleistungen/maschinenvermarktung/ankauf"
		/>
	</div>
</div>