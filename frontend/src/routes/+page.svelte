<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	import * as Carousel2 from '$lib/components/ui/carousel';
	import KatCard from '$lib/components/katCard.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	import halle from '$lib/assets/images/ueberUns/halle_klein.jpg';
	import portal from '$lib/assets/images/homepage/bild_innenraum.jpg';
	import pressen from '$lib/assets/images/homepage/MSP500_klein.jpg';
	import styropor from '$lib/assets/images/homepage/styroporCard_klein.jpg';
	import gebrauma from '$lib/assets/images/homepage/gebraumaCard_klein.jpg';
	import auto from '$lib/assets/images/branchen/auto_dunkel.png';
	import ads from '$lib/assets/images/branchen/ads_dunkel.png';
	import art from '$lib/assets/images/branchen/art_dunkel.png';
	import beton from '$lib/assets/images/branchen/beton_dunkel.png';
	import kunststoff from '$lib/assets/images/branchen/kunststoff_dunkel.png';
	import modell from '$lib/assets/images/branchen/modell_dunkel.png';
	import plane from '$lib/assets/images/branchen/plane_dunkel.png';
	import ship from '$lib/assets/images/branchen/ship_dunkel.png';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
	let carouselHeight = 700;

	let texts = ['fräsen mit leidenschaft', 'and more', 'Hier steht info']; // Deine Texte
	let index = $state(0);

	function nextText() {
		index = (index + 1) % texts.length;
	}

	setInterval(nextText, 5000);
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="Homepage - Übersicht über Styrotec" />
</svelte:head>

<div class="bg-primary-foreground">
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="relative left-0 top-0 w-[100%]">
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
		</div>

		<div
			class=" flex flex-row flex-wrap gap-12 bg-secondary p-4 text-primary-foreground lg:p-12 lg:pt-24"
		>
			<div class="w-[90%] pl-4 text-lg lg:w-[50%] lg:pl-8">
				<h1 class="pb-2 font-boldFont text-2xl uppercase md:text-3xl lg:text-4xl xl:text-5xl">
					{$_('homepage.einführung-titel')}
				</h1>
				<p class="text-justify">{$_('homepage.einführung-text')}</p>
				● {$_('homepage.einführung-punkt1')} <br />
				● {$_('homepage.einführung-punkt2')} <br />
				● {$_('homepage.einführung-punkt3')} <br />
				{$_('homepage.einführung-ende')}
			</div>

			<div
				style="background-image: url({halle})"
				class="ml-[5%] h-[200px] w-[90%] rounded-lg hover:scale-105 lg:ml-0 lg:h-[400px] lg:w-[40%]"
			>
				<a href="/unternehmen/ueber-uns">
					<div
						class="h-[200px] w-[100%] rounded-lg bg-primary-foreground/45 hover:bg-primary-foreground/65 lg:h-[400px]"
					>
						<h2
							class="p-16 text-center font-boldFont text-2xl uppercase text-secondary md:text-3xl lg:p-32 lg:text-4xl xl:text-5xl"
						>
							Lernen sie mehr über uns !
						</h2>
					</div>
				</a>
			</div>
		</div>

		<!-- Produkte -->
		<div>
			<div class="mx-[5%] mt-[100px] bg-secondary">
				<h1 class="text-center font-boldFont text-5xl uppercase">Unsere Produktgruppen</h1>
				<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
					<!-- portalfräs card-->
					<KatCard
						titel={$_('nav.portalfraesmaschinen')}
						text={$_('portalfraes.beschreibungs-text')}
						image={portal}
						link={'/produkte/portalfraesmaschinen'}
					/>

					<!-- Spänepressen card-->
					<KatCard
						titel={$_('nav.spaenepressen')}
						text={$_(`pressen.beschreibungs-text`)}
						image={pressen}
						link={'/produkte/spaenepressen'}
					/>

					<!-- Styropor card-->
					<KatCard
						titel={$_('nav.styroporbearbeitung')}
						text={$_(`styroporbearbeitung.beschreibungs-text`)}
						image={styropor}
						link={'/produkte/styroporbearbeitung'}
					/>

					<!-- Gebrauchtmaschinen card-->
					<KatCard
						titel={$_('nav.gebrauchtmaschinen')}
						text={$_(`gebrauMa.beschreibungs-text`)}
						image={gebrauma}
						link={'/produkte/gebrauchtmaschinen'}
					/>
				</div>
			</div>
		</div>

		<!-- Weltweit -->
		<div class="mb-12 mt-64">
			<div
				class="h-auto w-full bg-[url($lib/assets/images/homepage/weltkarte.png)] bg-cover bg-center"
			>
				<div
					class="relative h-full w-full bg-primary-foreground/85 p-16 text-secondary md:p-16 lg:p-32 xl:p-44"
				>
					<h1 class="text-m mb-10 font-boldFont text-xl md:text-2xl xl:text-4xl">
						{$_(`homepage.weltweit-titel`)}
					</h1>
					<p class="text-justify text-sm md:text-lg xl:text-2xl">
						{$_(`homepage.weltweit-text`)}
					</p>
				</div>
			</div>
		</div>

		<!-- über Uns / News -->
		<div>
			<div class="bg-secondary">
				<div
					class=" w-full bg-[url($lib/assets/images/homepage/bild_innenraum.jpg)] bg-cover bg-center xl:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)]"
				>
					<div class=" h-[800px] w-full bg-gradient-to-r from-black via-black/25 to-black">
						<h1 class=" pt-32 text-center font-boldFont text-5xl uppercase text-secondary">
							Styrotec - Wissenswertes
						</h1>
						<Accordion.Root
							type="single"
							class="absolute  ml-[10%] mt-[10%]  w-[80%] object-cover text-secondary xl:ml-64 xl:mt-32 xl:max-w-[70%] xl:text-3xl"
						>
							<Accordion.Item value="item-1">
								<Accordion.Trigger>{$_('homepage.unternehmen-news-titel')}</Accordion.Trigger>
								<Accordion.Content class="xl:text-xl">
									<!-- TODO: Inhalt zu news etc. -->

									<Button
										class="border-2 border-secondary text-xl text-secondary md:text-2xl lg:text-3xl"
										href="/unternehmen/news-termine"
									>
										News & Termine
									</Button>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Trigger>{$_('homepage.unternehmen-überUns-titel')}</Accordion.Trigger>
								<Accordion.Content class="xl:text-xl">
									<!-- TODO: Über uns Inhalt. -->
									<Button
										class="border-2 border-secondary text-xl text-secondary md:text-2xl lg:text-3xl"
										href="/unternehmen/news-termine">Über Uns</Button
									>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-3">
								<Accordion.Trigger>{$_('homepage.unternehmen-karriere-titel')}</Accordion.Trigger>
								<Accordion.Content>
									<!-- TODO: Karriere -->
									<Button
										class="border-2 border-secondary text-xl text-secondary md:text-2xl lg:text-3xl"
										href="/unternehmen/news-termine">Karriere</Button
									>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</div>
				</div>
			</div>
		</div>

		<!-- Dienstleistungen -->
		<div class="my-32">
			<!-- TODO: Texte überschriften und Bilder anpassen -->
			<h1 class="mb-32 px-4 text-center font-boldFont text-5xl uppercase md:px-32 lg:px-64">
				Wir bieten nicht nur Produkte, sondern auch den Service und Logistik darum...
			</h1>
			<div class="w-full">
				<Carousel2.Root opts={{ loop: true }}>
					<Carousel2.Content style={`max-height: 600px`}>
						<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
							<div
								class="h-[250px] w-[100%] rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-cover bg-center md:h-[400px] lg:h-[500px]"
							>
								<div
									class="relative h-full w-full rounded-lg bg-primary-foreground/75 p-4 text-secondary md:p-12 lg:p-20 xl:p-32"
								>
									<div class="h-[300px] w-[300px]">
										<h1 class="font-boldFont text-lg uppercase md:text-3xl lg:text-4xl xl:text-5xl">
											{$_('homepage.erhaltung')}
										</h1>
										<p class="md:text-md text-sm lg:text-lg xl:text-xl">
											{$_('homepage.erhaltung-text')}
										</p>
									</div>
								</div>
							</div>
						</Carousel2.Item>
						<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
							<div
								class="h-[250px] w-[100%] rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-cover bg-center md:h-[400px] lg:h-[500px]"
							>
								<div
									class="relative h-full w-full rounded-lg bg-primary-foreground/75 p-4 text-secondary md:p-12 lg:p-20 xl:p-32"
								>
									<div class="h-[300px] w-[300px]">
										<h1 class="font-boldFont text-xl uppercase md:text-3xl">
											{$_('homepage.vermarktung')}
										</h1>
										<p class="text-xl">{$_('homepage.vermarktung-text')}</p>
									</div>
								</div>
							</div>
						</Carousel2.Item>
						<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
							<div
								class="h-[250px] w-[100%] rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-cover bg-center md:h-[400px] lg:h-[500px]"
							>
								<div
									class="relative h-full w-full rounded-lg bg-primary-foreground/75 p-4 text-secondary md:p-12 lg:p-20 xl:p-32"
								>
									<div class="h-[300px] w-[300px]">
										<h1 class="font-boldFont text-xl uppercase md:text-3xl">
											{$_('homepage.modernisierung')}
										</h1>
										<p class="text-xl">{$_('homepage.modernisierung-text')}</p>
									</div>
								</div>
							</div>
						</Carousel2.Item>
					</Carousel2.Content>
					<Carousel2.Previous
						class="left-10 border-2 border-primary-foreground bg-secondary bg-opacity-70 text-primary-foreground hover:bg-primary md:left-16 lg:left-32 xl:left-64"
					/>
					<Carousel2.Next
						class="right-10 border-2 border-primary-foreground bg-secondary/15 bg-opacity-70 text-primary-foreground hover:bg-primary md:right-16 lg:right-32 xl:right-64"
					/>
				</Carousel2.Root>
			</div>
		</div>

		<div class="px-[15%] py-[5%]">
			<div class="flex flex-col flex-wrap justify-evenly gap-2 sm:flex-row">
				<!-- Automobil -->
				<a href="/branchen/#automobil" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.auto-titel')}
						</h2>
						<img
							src={auto}
							alt="Automotive-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Schiffsbau -->
				<a href="/branchen/#schiffsbau" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.schiff-titel')}
						</h2>
						<img
							src={ship}
							alt="Maritime-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Aerospace-->
				<a href="/branchen/#aerospace" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.luft-titel')}
						</h2>
						<img
							src={plane}
							alt="Aerospace-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Modellbau -->
				<a href="/branchen/#modellbau" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.modell-titel')}
						</h2>
						<img
							src={modell}
							alt="Modellbau-Icon"
							class="relative w-full transition-transform duration-300 hover:scale-110 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Kunststoffindustrie -->
				<a href="/branchen/#kunststoffindustrie" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.kunststoff-titel')}
						</h2>
						<img
							src={kunststoff}
							alt="Kunststoff-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Betonindustrie -->
				<a href="/branchen/#betonindustrie" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.beton-titel')}
						</h2>
						<img
							src={beton}
							alt="Concrete-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Werbetechnik -->
				<a href="/branchen/#werbetechnik" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.werbe-titel')}
						</h2>
						<img
							src={ads}
							alt="Advertisement-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
				<!-- Kunst -->
				<a href="/branchen/#kunst" class="group w-[80%] sm:w-[25%]">
					<div>
						<h2
							class="text-center font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-5xl"
						>
							{$_('branchen.kunst-titel')}
						</h2>
						<img
							src={art}
							alt="Kunst-Icon"
							class="relative w-full transition-transform duration-300 group-hover:scale-125 sm:ml-[25%] sm:w-[60%]"
						/>
					</div>
				</a>
			</div>
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
