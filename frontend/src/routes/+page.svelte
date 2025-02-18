<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
	let carouselHeight = 700;
	import { Input, Textarea } from 'svelte-5-ui-lib';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	import logo1 from '$lib/assets/images/logo1.jpeg';
	import logo2 from '$lib/assets/images/logo2.jpeg';
	import logo3 from '$lib/assets/images/logo3.jpeg';
	import logo4 from '$lib/assets/images/logo4.jpeg';
	import logo5 from '$lib/assets/images/logo5.jpeg';
	import logo6 from '$lib/assets/images/logo6.jpeg';
	import hintergrund from '$lib/assets/images/bild11.jpg';
	import Marquee from '$lib/components/marquee.svelte';


</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div>
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="relative left-0 top-0 w-[100%] shadow-[10px_10px_20px_rgba(0,0,0,0.75)] ">
			{console.log(homepageData)}
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
			
			
			
		</div>
		<div class="absolute  top-[660px]  h-[70px] w-[80%] bg-secondary [clip-path:polygon(0%_0%,100%_0%,96%_100%,0%_100%)]">
				<Marquee speed={0.5} hoverSpeed={0} class="my-1">
					<div> <img src={logo1} alt="logo" class="h-[60px]"></div>
					<div> <img src={logo2} alt="logo" class="h-[60px]"></div>
					<div> <img src={logo3} alt="logo" class="h-[60px]"></div>
					<div> <img src={logo4} alt="logo" class="h-[60px]"></div>
					<div> <img src={logo5} alt="logo" class="h-[60px]"></div>
					<div> <img src={logo6} alt="logo" class="h-[60px]"></div>
				</Marquee>
			</div>

		<div class="bg-secondary-foreground flex h-[600px] justify-around xl:h-[1000px]">
			<div
				class="bg-secondary my-[5%] h-[40%] w-[80%] shadow-[10px_10px_30px_rgba(0,0,0,0.75)] xl:mt-[300px] xl:h-[40%] xl:w-[40%]"
			>
				<div
					class="bg-primary-foreground relative left-0 top-10 mr-10 bg-opacity-80 shadow-[10px_10px_20px_rgba(0,0,0,0.25)]"
				>
					<h2 class="text-secondary ml-10 uppercase">Hier gibts info</h2>
				</div>
				<div class="relative top-20 mx-5">
					<p>inforamationstext hello zu xyz lorem ipsum sit dolor cum anis</p>
				</div>
			</div>
		</div>
		<div class="bg-primary-foreground">
			<div
				class="h-[800px] w-full bg-[url($lib/assets/images/bild11.jpg)] bg-center bg-cover xl:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)]"
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
								et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
								est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
								voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
								no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
								sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
								erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
								clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem
								vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
								dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
								blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
								tincidunt ut laoreet dolore magna aliquam erat volutpat.
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2">
							<Accordion.Trigger>Info nummer 2</Accordion.Trigger>
							<Accordion.Content class="xl:text-xl">
								<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
								invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
								et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
								est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
								sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
								voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
								no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
								sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
								erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
								clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem
								vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
								dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
								blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
								tincidunt ut laoreet dolore magna aliquam erat volutpat.
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
						class="text-secondary absolute left-[30%] top-10 flex flex-col xl:flex-row xl:flex-wrap"
					>
						<h2 class="w-full">{$_(`kontaktformular.email`)}</h2>
						<Input class="text-primary-foreground w-full" />
						<h2 class="w-full">{$_(`kontaktformular.nachricht`)}</h2>
						<Textarea class="text-primary-foreground h-[100px] w-[400px]" />
					</div>
				</div>
			</div>
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
