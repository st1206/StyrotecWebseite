<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	import * as Carousel2 from '$lib/components/ui/carousel';
	import { Button } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	let { data } = $props();
	let carouselHeight = 700;
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';

	import halle from '$lib/assets/images/ueberUns/halle_klein.jpg'
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
	

	import { fly } from "svelte/transition";

  	let texts = ["fräsen mit leidenschaft", "and more", "Hier steht info"]; // Deine Texte
  	let index = $state(0);

  	function nextText() {
   		index = (index + 1) % texts.length;
 	}

  	setInterval(nextText, 5000);
	
	import Marquee from '$lib/components/marquee.svelte';
	import MessenCard from '$lib/components/messenCard.svelte';
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="Homepage - Übersicht über Styrotec" />
</svelte:head>




<div class="bg-primary-foreground">
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="relative left-0 top-0 w-[100%] ">
			
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
			
			<div
				class="bg-secondary  absolute hidden h-[70px] w-[80%]  lg:block xl:top-[726px] rounded-l-none rounded-r-lg"
			>
				<Marquee speed={0.5} hoverSpeed={0} class="my-1">
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/produkte/portalfraesmaschinen">{$_('nav.portalfraesmaschinen')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/produkte/spaenepressen">{$_('nav.spaenepressen')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/produkte/styroporbearbeitung">{$_('nav.styroporbearbeitung')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/produkte/gebrauchtmaschinen">{$_('nav.gebrauchtmaschinen')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/dienstleistungen/maschinenerhaltung">{$_('nav.maschinenerhaltung')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/dienstleistungen/maschinenvermarktung">{$_('nav.maschinenvermarktung')}</a>
					</div>
					<div class="text-primary-foreground pt-3 text-lg font-boldFont">
						<a href="/dienstleistungen/maschinenmodernisierung"
							>{$_('nav.maschinenmodernisierung')}</a
						>
					</div>
				</Marquee>
			</div>
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
<div class="absolute h-auto w-auto p-4 bg-primary-foreground/85 top-[300px] left-[20%]  z-60 text-xl md:text-2xl lg:text-5xl text-center text-secondary font-boldFont rounded-lg">
	{#each texts as text, i (text)}
    {#if i === index}
      <p in:fly="{{ x: 200, duration: 500 }}" out:fly="{{ x: -200, duration: 500 }}">
        {text}
      </p>
    {/if}
  {/each}</div>




<div class=" flex flex-row flex-wrap bg-secondary text-primary-foreground gap-12 p-4 lg:p-12 lg:pt-24">
	
	
	<div class="text-lg pl-4 lg:pl-8   w-[90%] lg:w-[50%]">
		<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase font-boldFont pb-2">{$_('homepage.einführung-titel')}</h1>
		<p class="text-justify">{$_('homepage.einführung-text')}</p>
		● {$_('homepage.einführung-punkt1')} <br>
		● {$_('homepage.einführung-punkt2')} <br>
		● {$_('homepage.einführung-punkt3')} <br>
		{$_('homepage.einführung-ende')}
	</div>
	
		<div style="background-image: url({halle})" class="lg:w-[40%] w-[90%] h-[200px] lg:h-[400px] ml-[5%] lg:ml-0 rounded-lg hover:scale-105">
			<a href="/unternehmen/ueber-uns">
				<div class="bg-primary-foreground/45 hover:bg-primary-foreground/65 w-[100%] h-[200px] lg:h-[400px] rounded-lg">
					<h2 class="text-center text-secondary uppercase font-boldFont p-16 lg:p-32 text-2xl md:text-3xl lg:text-4xl xl:text-5xl"> Lernen sie mehr über uns !</h2>
				</div>
			</a>
		</div>
	
</div>

<!-- Produkte -->
<div>
	<div class="bg-secondary mx-[5%] mt-[100px]">
		<h1 class="uppercase font-boldFont text-5xl text-center">Unsere Produktgruppen</h1>
		<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
			<!-- portalfräs card-->
			<KatCard titel={$_('nav.portalfraesmaschinen')} text={$_('portalfraes.beschreibungs-text')} image={portal} link={"/produkte/portalfraesmaschinen"}/>
			
			<!-- Spänepressen card-->
			<KatCard titel={$_('nav.spaenepressen')} text={$_(`pressen.beschreibungs-text`)} image={pressen} link={"/produkte/spaenepressen"}/>
	
			<!-- Styropor card-->
			<KatCard titel={$_('nav.styroporbearbeitung')} text={$_(`styroporbearbeitung.beschreibungs-text`)} image={styropor} link={"/produkte/styroporbearbeitung"} />
			
			<!-- Gebrauchtmaschinen card-->
			<KatCard titel={$_('nav.gebrauchtmaschinen')} text={$_(`gebrauMa.beschreibungs-text`)} image={gebrauma} link={"/produkte/gebrauchtmaschinen"}/>
			
		</div>
	</div>
</div>

<!-- Weltweit -->
<div class="mt-64 mb-12">
	<div class="h-auto  w-full bg-center  bg-[url($lib/assets/images/homepage/weltkarte.png)] bg-cover">
				<div class="bg-primary-foreground/85 relative h-full w-full  p-16 md:p-16 lg:p-32 xl:p-44 text-secondary">
					<h1 class="text-m text-xl md:text-2xl xl:text-4xl font-boldFont mb-10">{$_(`homepage.weltweit-titel`)}</h1>
					<p class="text-sm md:text-lg xl:text-2xl text-justify">
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
				<h1 class=" pt-32 text-center text-5xl uppercase font-boldFont text-secondary">Styrotec - Wissenswertes</h1>
				<Accordion.Root
					type="single"
					class="text-secondary  absolute ml-[10%]  mt-[10%] w-[80%] object-cover xl:ml-64 xl:mt-32 xl:max-w-[70%] xl:text-3xl"
				>
					<Accordion.Item value="item-1">
						<Accordion.Trigger>{$_('homepage.unternehmen-news-titel')}</Accordion.Trigger>
						<Accordion.Content class="xl:text-xl">
							<!-- TODO: Inhalt zu news etc. -->
							 
							<Button class="text-xl md:text-2xl lg:text-3xl text-secondary border-2 border-secondary" href="/unternehmen/news-termine">News & Termine</Button>
							
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>{$_('homepage.unternehmen-überUns-titel')}</Accordion.Trigger>
						<Accordion.Content class="xl:text-xl">
							<!-- TODO: Über uns Inhalt. -->
							<Button class="text-xl md:text-2xl lg:text-3xl text-secondary border-2 border-secondary" href="/unternehmen/news-termine">Über Uns</Button>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>{$_('homepage.unternehmen-karriere-titel')}</Accordion.Trigger>
						<Accordion.Content>
							<!-- TODO: Karriere -->
							<Button class="text-xl md:text-2xl lg:text-3xl text-secondary border-2 border-secondary" href="/unternehmen/news-termine">Karriere</Button>
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
	<h1 class="px-4 md:px-32 lg:px-64 mb-32 text-center uppercase text-5xl font-boldFont">Wir bieten nicht nur Produkte, sondern auch den Service und Logistik darum...</h1>
	<div class="w-full  ">
		<Carousel2.Root opts={{ loop: true }}>
			<Carousel2.Content style={`max-height: 600px`} >
				<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					<div class="bg-cover rounded-lg w-[100%] h-[250px] md:h-[400px] lg:h-[500px] bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center ">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-12 lg:p-20 xl:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-lg md:text-3xl lg:text-4xl xl:text-5xl uppercase font-boldFont">{$_('homepage.erhaltung')}</h1>
								<p class="text-sm md:text-md lg:text-lg xl:text-xl">{$_('homepage.erhaltung-text')}</p>
								
							</div>
						</div>
					</div>
				</Carousel2.Item>	
				<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					<div class="bg-cover rounded-lg w-[100%] h-[250px] md:h-[400px] lg:h-[500px] bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-12 lg:p-20 xl:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-xl md:text-3xl uppercase font-boldFont">{$_('homepage.vermarktung')}</h1>
								<p class="text-xl">{$_('homepage.vermarktung-text')}</p>
								
								
							</div>
						</div>
					</div>
				</Carousel2.Item>
				<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					<div class="bg-cover rounded-lg w-[100%] h-[250px] md:h-[400px] lg:h-[500px] bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-12 lg:p-20 xl:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-xl md:text-3xl uppercase font-boldFont">{$_('homepage.modernisierung')} </h1>
								<p class="text-xl">{$_('homepage.modernisierung-text')}</p>
								
								
							</div>
						</div>
					</div>
				</Carousel2.Item>
			</Carousel2.Content>
			<Carousel2.Previous class="left-10 md:left-16 lg:left-32 xl:left-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary" />
			<Carousel2.Next class="right-10 md:right-16 lg:right-32 xl:right-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary/15" />
		</Carousel2.Root>
	</div>
</div>

<div class="px-[15%] py-[5%]">
	<div class="flex flex-col sm:flex-row flex-wrap justify-evenly gap-2">
		<!-- Automobil -->
		<a href="/branchen/#automobil" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.auto-titel')} </h2>
				<img src={auto} alt="Automotive-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300 " />
			</div>
		</a>
		<!-- Schiffsbau -->
		<a href="/branchen/#schiffsbau" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.schiff-titel')} </h2>
				<img src={ship} alt="Maritime-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>
		<!-- Aerospace-->
		<a href="/branchen/#aerospace" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.luft-titel')} </h2>
				<img src={plane} alt="Aerospace-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>
		<!-- Modellbau -->
		<a href="/branchen/#modellbau" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.modell-titel')} </h2>
				<img src={modell} alt="Modellbau-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] hover:scale-110 transition-transform duration-300" />
			</div>
		</a>
		<!-- Kunststoffindustrie -->
		<a href="/branchen/#kunststoffindustrie" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.kunststoff-titel')} </h2>
				<img src={kunststoff} alt="Kunststoff-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>
		<!-- Betonindustrie -->
		<a href="/branchen/#betonindustrie" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.beton-titel')} </h2>
				<img src={beton} alt="Concrete-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>
		<!-- Werbetechnik -->
		<a href="/branchen/#werbetechnik" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.werbe-titel')} </h2>
				<img src={ads} alt="Advertisement-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>
		<!-- Kunst -->
		<a href="/branchen/#kunst" class="w-[80%] sm:w-[25%] group">
			<div >
				<h2 class="font-boldFont text-center uppercase text-xl md:text-2xl lg:text-3xl xl:text-5xl">{$_('branchen.kunst-titel')} </h2>
				<img src={art} alt="Kunst-Icon" class="relative w-full sm:w-[60%] sm:ml-[25%] group-hover:scale-125 transition-transform duration-300" />
			</div>
		</a>		
	</div>
</div>
