<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	import * as Carousel2 from '$lib/components/ui/carousel';
	import { Button } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	let { data } = $props();
	let carouselHeight = 700;
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	import logo1 from '$lib/assets/images/homepage/logo1.jpeg';
	import logo2 from '$lib/assets/images/homepage/logo2.jpeg';
	import logo3 from '$lib/assets/images/homepage/logo3.jpeg';
	import logo4 from '$lib/assets/images/homepage/logo4.jpeg';
	import logo5 from '$lib/assets/images/homepage/logo5.jpeg';
	import logo6 from '$lib/assets/images/homepage/logo6.jpeg';
	import karte from '$lib/assets/images/homepage/Karte.png';
	import portal from '$lib/assets/images/homepage/bild11.jpg'
	import pressen from '$lib/assets/images/homepage/MSP500_klein.jpg'
	import styropor from '$lib/assets/images/homepage/styroporCard_klein.jpg'
	import gebrauma from '$lib/assets/images/homepage/gebraumaCard_klein.jpg'
	
	

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
				class="bg-secondary  absolute hidden h-[70px] w-[80%]  lg:block xl:top-[660px] rounded-l-none rounded-r-lg"
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




<div class=" flex flex-row flex-wrap bg-primary-foreground text-secondary gap-12 p-4 lg:p-12 lg:pt-24">
	
	
	<div class="text-lg pl-4 lg:pl-8   w-[90%] lg:w-[50%]">
		<h1 class="text-3xl uppercase font-boldFont pb-2">{$_('homepage.einführung-titel')}</h1>
		{$_('homepage.einführung-text')} <br>
		● {$_('homepage.einführung-punkt1')} <br>
		● {$_('homepage.einführung-punkt2')} <br>
		● {$_('homepage.einführung-punkt3')} <br>
		{$_('homepage.einführung-ende')}
	</div>
	
	<img src={karte} alt="Karte" class="hidden lg:block w-[40%] "> 
	
</div>

<!-- Produkte -->
<div>
	<div class="bg-secondary mx-[5%] mt-[100px]">
		<h1 class="uppercase font-boldFont text-5xl text-center">Unsere Produktgruppen</h1>
		<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
			<!-- portalfräs card-->
			<KatCard titel={$_('nav.portalfraesmaschinen')} text={$_('portalfraes.beschreibungs-text')} image={portal} link={"/produkte/portalfraesmaschinen"}/>
			
			<!-- Spänepressen card-->
			<KatCard titel={$_('nav.spaenepressen')} text="TODO" image={pressen} link={"/produkte/spaenepressen"}/>
	
			<!-- Styropor card-->
			<KatCard titel={$_('nav.styroporbearbeitung')} text="TODO" image={styropor} link={"/produkte/styroporbearbeitung"} />
			
			<!-- Gebrauchtmaschinen card-->
			<KatCard titel={$_('nav.gebrauchtmaschinen')} text="TODO" image={gebrauma} link={"/produkte/gebrauchtmaschinen"}/>
			
		</div>
	</div>
</div>

<!-- Weltweit -->
<div class="mt-64 mb-12">
	<div class="h-auto  w-full bg-center  bg-[url($lib/assets/images/homepage/weltkarte.png)] bg-cover">
				<div class="bg-primary-foreground/85 relative h-full w-full  p-16 md:p-16 lg:p-32 xl:p-44 text-secondary">
					<h1 class="text-m text-xl md:text-2xl xl:text-4xl font-boldFont mb-10">{$_(`homepage.weltweit-titel`)}</h1>
					<p class="text-lg xl:text-2xl">
						{$_(`homepage.weltweit-text`)}
					</p>
				</div>
	</div>
</div>

<!-- über Uns / News -->
<div>
	<div class="bg-secondary">
		<div
			class=" w-full bg-[url($lib/assets/images/bild11.jpg)] bg-cover bg-center xl:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)]"
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
					<div class="bg-cover rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center ">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-16 lg:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-xl md:text-3xl uppercase font-boldFont">Maschinenerhaltung </h1>
								<p class="text-xl">TODO</p>
								
							</div>
						</div>
					</div>
				</Carousel2.Item>	
				<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					<div class="bg-cover rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-16 lg:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-xl md:text-3xl uppercase font-boldFont">Maschinenvermarktung </h1>
								<p class="text-xl">TODO</p>
								
								
							</div>
						</div>
					</div>
				</Carousel2.Item>
				<Carousel2.Item class="ml-[10%] mr-[10%] basis-1/2 ">
					<div class="bg-cover rounded-lg bg-[url($lib/assets/images/homepage/NorbertRolf_klein.jpg)] bg-center">
						<div
							class="bg-primary-foreground/75 text-secondary relative h-full w-full rounded-lg p-4 md:p-16 lg:p-32"
						>
							<div class="h-[300px] w-[300px] ">
								<h1 class="text-xl md:text-3xl uppercase font-boldFont">Maschinenmodernisierung </h1>
								<p class="text-xl">TODO</p>
								
								
							</div>
						</div>
					</div>
				</Carousel2.Item>
			</Carousel2.Content>
			<Carousel2.Previous class="left-64 bg-opacity-70 border-primary-foreground text-primary-foreground hover:bg-primary border-2 bg-secondary" />
			<Carousel2.Next class="right-64 bg-opacity-70 border-primary hover:bg-primary border-2 bg-secondary/15" />
		</Carousel2.Root>
	</div>
</div>

<div>
	<div>
		<div
			class="flex-col md:px-[30%] py-16 shadow-[10px_-10px_30px_rgba(0,0,0,0.75)] xl:flex xl:flex-row xl:flex-wrap xl:justify-between xl:gap-2 xl:px-96 xl:py-64"
		>
			<h1 class=" mb-32 text-center uppercase text-5xl font-boldFont ">...All das in verschiedensten Bereichen</h1>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 1
				</h3>
				<img src={logo1} alt="logo-Kategorie-x" />
			</div>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 2
				</h3>
				<img src={logo2} alt="logo-Kategorie-x" />
			</div>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 3
				</h3>
				<img src={logo3} alt="logo-Kategorie-x" />
			</div>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 4
				</h3>
				<img src={logo4} alt="logo-Kategorie-x" />
			</div>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 5
				</h3>
				<img src={logo5} alt="logo-Kategorie-x" />
			</div>
			<div
				class="border-primary-foreground bg-primary-foreground my-3 w-[70%] border-2 xl:w-[300px]"
			>
				<h3
					class="bg-primary-foreground text-secondary absolute mt-[70px] bg-opacity-80 px-4 text-xl xl:mt-[230px] xl:text-4xl"
				>
					Kategorie nr 6
				</h3>
				<img src={logo6} alt="logo-Kategorie-x" />
			</div>
		</div>
	</div>

	
</div>
