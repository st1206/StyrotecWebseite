<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
	let carouselHeight = 700;
	import { Input, Textarea } from 'svelte-5-ui-lib';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	import logo1 from '$lib/assets/images/homepage/logo1.jpeg';
	import logo2 from '$lib/assets/images/homepage/logo2.jpeg';
	import logo3 from '$lib/assets/images/homepage/logo3.jpeg';
	import logo4 from '$lib/assets/images/homepage/logo4.jpeg';
	import logo5 from '$lib/assets/images/homepage/logo5.jpeg';
	import logo6 from '$lib/assets/images/homepage/logo6.jpeg';
	import karte from '$lib/assets/images/homepage/Karte.png';
	
	import Marquee from '$lib/components/marquee.svelte';
	import MessenCard from '$lib/components/messenCard.svelte';
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="Homepage - Übersicht über Styrotec" />
</svelte:head>

<div>
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="relative left-0 top-0 w-[100%] shadow-[10px_10px_20px_rgba(0,0,0,0.75)]">
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
			<div
				class="bg-primary-foreground absolute -bottom-8 hidden h-[70px] w-[80%] [clip-path:polygon(0%_0%,100%_0%,96%_100%,0%_100%)] lg:block xl:top-[660px]"
			>
				<Marquee speed={0.5} hoverSpeed={0} class="my-1">
					<div class="text-secondary pt-3 text-2xl">
						<a href="/produkte/portalfraesmaschinen">{$_('nav.portalfraesmaschinen')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
						<a href="/produkte/spaenepressen">{$_('nav.spaenepressen')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
						<a href="/produkte/styroporbearbeitung">{$_('nav.styroporbearbeitung')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
						<a href="/produkte/gebrauchtmaschinen">{$_('nav.gebrauchtmaschinen')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
						<a href="/dienstleistungen/maschinenerhaltung">{$_('nav.maschinenerhaltung')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
						<a href="/dienstleistungen/maschinenvermarktung">{$_('nav.maschinenvermarktung')}</a>
					</div>
					<div class="text-secondary pt-3 text-2xl">
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

<div class="mt-[200px] flex flex-row flex-wrap">
	<div class="text-lg pl-32 py-16 h-[400px] w-[40%]">
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
		ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
		dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
		sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
		invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
		justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
		ipsum dolor sit amet.
	</div>
	<div
		class="bg-primary-foreground relative -top-[170px] h-[700px] w-[400px] [clip-path:polygon(60%_0%,100%_0%,40%_100%,80%_100%)]"
	></div>
	<img src={karte} alt="Karte" class="h-[400px]"> 
	<div class="h-[30px] w-full bg-primary-foreground relative -top-[170px]"></div>
</div>

<div>
	<div class="bg-secondary mx-[5%] mt-[100px]">
		<div class="flex flex-col flex-wrap justify-around gap-[5%] md:flex-row">
			<!-- portalfräs card-->
			<div
				class="mt-[5%] h-auto w-[90%] rounded-lg bg-[url($lib/assets/images/bild11.jpg)] bg-cover md:w-[45%]"
			>
				<div class="bg-primary-foreground/80 relative h-full w-full rounded-lg">
					<h1 class="text-secondary font-boldFont px-[10%] pb-[5%] pt-[10%] text-3xl">
						{$_('nav.portalfraesmaschinen')}
					</h1>
					<p
						class="text-secondary w-full px-4 pb-[20%] text-justify md:px-8 md:pb-[30%] lg:px-16 lg:pb-[20%]"
					>
						{$_('portalfraes.beschreibungs-text')}
					</p>

					<a
						href="/produkte/portalfraesmaschinen"
						class="bg-primary text-secondary font-boldFont absolute bottom-4 left-4 rounded-md p-2 text-xl hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
						>{$_('portalfraes.cta')}</a
					>
				</div>
			</div>

			<!-- Spänepressen card-->
			<div
				class="mt-[5%] h-auto w-[90%] rounded-lg bg-[url($lib/assets/images/homepage/MSP500_klein.jpg)] bg-cover md:w-[45%]"
			>
				<div class="bg-primary-foreground/80 relative h-full w-full rounded-lg">
					<h1 class="text-secondary font-boldFont px-[10%] pb-[5%] pt-[10%] text-3xl">
						{$_('nav.spaenepressen')}
					</h1>
					<p
						class="text-secondary w-full px-4 pb-[20%] text-justify md:px-8 md:pb-[30%] lg:px-16 lg:pb-[20%]"
					>
						TODO
					</p>

					<a
						href="/produkte/portalfraesmaschinen"
						class="bg-primary text-secondary font-boldFont absolute bottom-4 left-4 rounded-md p-2 text-xl hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
						>{$_('portalfraes.cta')}</a
					>
				</div>
			</div>

			<!-- Styropor card-->
			<div
				class="mt-[5%] h-auto w-[90%] rounded-lg bg-[url($lib/assets/images/homepage/styroporCard_klein.jpg)] bg-cover md:w-[45%]"
			>
				<div class="bg-primary-foreground/80 relative h-full w-full rounded-lg">
					<h1 class="text-secondary font-boldFont px-[10%] pb-[5%] pt-[10%] text-3xl">
						{$_('nav.styroporbearbeitung')}
					</h1>
					<p
						class="text-secondary w-full px-4 pb-[20%] text-justify md:px-8 md:pb-[30%] lg:px-16 lg:pb-[20%]"
					>
						TODO
					</p>

					<a
						href="/produkte/portalfraesmaschinen"
						class="bg-primary text-secondary font-boldFont absolute bottom-4 left-4 rounded-md p-2 text-xl hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
						>{$_('portalfraes.cta')}</a
					>
				</div>
			</div>

			<!-- Gebrauchtmaschinen card-->
			<div
				class="mt-[5%] h-auto w-[90%] rounded-lg bg-[url($lib/assets/images/homepage/gebraumaCard_klein.jpg)] bg-cover md:w-[45%]"
			>
				<div class="bg-primary-foreground/80 relative h-full w-full rounded-lg">
					<h1 class="text-secondary font-boldFont px-[10%] pb-[5%] pt-[10%] text-3xl">
						{$_('nav.gebrauchtmaschinen')}
					</h1>
					<p
						class="text-secondary w-full px-4 pb-[20%] text-justify md:px-8 md:pb-[30%] lg:px-16 lg:pb-[20%]"
					>
						TODO
					</p>

					<a
						href="/produkte/portalfraesmaschinen"
						class="bg-primary text-secondary font-boldFont absolute bottom-4 left-4 rounded-md p-2 text-xl hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
						>{$_('portalfraes.cta')}</a
					>
				</div>
			</div>
		</div>
	</div>
</div>
<div>

	<div class="mt-[5%] h-auto ml-[15%] w-[70%] bg-center rounded-lg bg-[url($lib/assets/images/homepage/weltkarte.png)] bg-cover">
				<div class="bg-primary-foreground/85 relative h-full w-full rounded-lg p-44 text-secondary">
					<h1 class="text-m xl:text-4xl font-boldFont mb-10">{$_(`homepage.weltweit-titel`)}</h1>
					<p class="hidden xl:block xl:text-2xl">
						{$_(`homepage.weltweit-text`)}
					</p>
				</div>
	</div>

	<div class="relative">
		<img src={karte} alt="Weltkarte" class="mt-[50px] w-[80%] opacity-55 xl:ml-[5%] xl:mt-32" />
		<div
			class="text-primary-foreground font-boldFont bg-primary-foreground/25 absolute top-[30%] w-[60%] p-2 xl:w-[40%]"
		>
			<div class="pl-[15%]">
				<h1 class="text-m xl:text-4xl">{$_(`homepage.weltweit-titel`)}</h1>
				<p class="hidden xl:block xl:text-2xl">
					{$_(`homepage.weltweit-text`)}
					
				</p>
			</div>
		</div>
	</div>

	<div class="bg-secondary-foreground flex h-[600px] justify-around xl:h-[1000px]">
		<div
			class="bg-secondary my-[5%] mt-[100px] h-[40%] w-[80%] shadow-[10px_10px_30px_rgba(0,0,0,0.75)] xl:mt-[300px] xl:h-[60%] xl:w-[60%]"
		>
			<div
				class="bg-primary-foreground relative left-0 top-10 mr-10 bg-opacity-80 shadow-[10px_10px_20px_rgba(0,0,0,0.25)]"
			>
				<h2 class="text-secondary ml-10 uppercase">Hier gibts info</h2>
			</div>
			<div class="relative top-20 mx-5 flex flex-col xl:flex-row">
				{#await data.messen}
					<p>waiting for data</p>
				{:then messen}
					{#each messen as messe}
						<div class="">
							<MessenCard {messe} />
						</div>
					{/each}
				{:catch}
					<p>Failed to load</p>
				{/await}
			</div>
		</div>
	</div>

	

	<div class="bg-primary-foreground">
		<div
			class=" w-full bg-[url($lib/assets/images/bild11.jpg)] bg-cover bg-center xl:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)]"
		>
			<div class=" h-[800px] w-full bg-gradient-to-r from-black via-black/25 to-black">
				<Accordion.Root
					type="single"
					class="text-secondary  absolute ml-[10%]  mt-[10%] w-[80%] object-cover xl:ml-64 xl:mt-32 xl:max-w-[70%] xl:text-3xl"
				>
					<Accordion.Item value="item-1">
						<Accordion.Trigger>Info nummer 1</Accordion.Trigger>
						<Accordion.Content class="xl:text-xl">
							<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
							et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
							Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
							sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
							clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem
							vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
							dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
							blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem
							ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
							ut laoreet dolore magna aliquam erat volutpat.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>Info nummer 2</Accordion.Trigger>
						<Accordion.Content class="xl:text-xl">
							<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
							et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
							Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
							At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
							sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
							erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
							clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem
							vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
							dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
							blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem
							ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
							ut laoreet dolore magna aliquam erat volutpat.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>Info nummer 3</Accordion.Trigger>
						<Accordion.Content>
							<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
							wassup
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>
	</div>
	<div>
		<div
			class="flex-col px-[30%] py-16 shadow-[10px_-10px_30px_rgba(0,0,0,0.75)] xl:flex xl:flex-row xl:flex-wrap xl:justify-between xl:gap-2 xl:px-96 xl:py-64"
		>
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

	<div
		class="from-background via-primary to-secondary-foreground relative z-0 h-[600px] w-full bg-gradient-to-bl"
	>
		<div
			class="bg-primary-foreground absolute mt-[160px] h-[300px] w-full shadow-[10px_10px_30px_rgba(0,0,0,0.75)]"
		>
			<div>
				<div
					class="text-secondary absolute left-[5%] top-10 flex flex-col xl:left-[30%] xl:flex-row xl:flex-wrap"
				>
					<h2 class="w-full">{$_(`kontaktformular.email`)}</h2>
					<Input class="text-primary-foreground xl:w-full" />
					<h2 class="w-full">{$_(`kontaktformular.nachricht`)}</h2>
					<Textarea class="text-primary-foreground h-[100px] w-[250px] xl:w-[400px]" />
				</div>
			</div>
		</div>
	</div>
</div>
