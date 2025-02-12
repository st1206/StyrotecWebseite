<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
	let carouselHeight = 800;
	import { Input, Textarea } from 'svelte-5-ui-lib';
	import { _ } from 'svelte-i18n';
	import logo1 from '$lib/assets/images/logo1.jpeg';
	import logo2 from '$lib/assets/images/logo2.jpeg';
	import logo3 from '$lib/assets/images/logo3.jpeg';
	import logo4 from '$lib/assets/images/logo4.jpeg';
	import logo5 from '$lib/assets/images/logo5.jpeg';
	import logo6 from '$lib/assets/images/logo6.jpeg';

	
</script>

<svelte:head>
	<title>Styrotec Homepage</title>
	<meta name="Styrotec Homepage" content="" />
</svelte:head>

<div>
	{#await data.homepageData}
		<div>skeleton build</div>
	{:then homepageData}
		<div class="relative left-0 top-0 w-[100%] shadow-[10px_10px_20px_rgba(0,0,0,0.75)]">
			{console.log(homepageData)}
			<Carousel height={carouselHeight} autoPlay={true} pictures={homepageData.carousel} />
		</div>

		<div class="bg-secondary-foreground flex h-[1200px] justify-around">
			<div class="bg-secondary mt-[400px] h-[40%] w-[40%] shadow-[10px_10px_30px_rgba(0,0,0,0.75)]">
				<div
					class="bg-primary-foreground relative left-0 top-10 mr-10 bg-opacity-80 shadow-[10px_10px_20px_rgba(0,0,0,0.25)]"
				>
					<h2 class="text-secondary ml-10 uppercase  ">Hier gibts info</h2>
				</div>
				<div class="relative top-20 mx-5">
					<p>inforamationstext hello zu xyz lorem ipsum sit dolor cum anis</p>
					
				</div>
			</div>
		</div>
		
		<div>
			<div
				class="flex-col px-[30%] xl:justify-between xl:px-96 py-20 shadow-[10px_-10px_30px_rgba(0,0,0,0.75)] xl:flex xl:gap-2 xl:flex-row xl:flex-wrap"
			>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 1</h3>	
					<img src={logo1} alt="logo-Kategorie-x" />
				</div>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 2</h3>	
					<img src={logo2} alt="logo-Kategorie-x" />
				</div>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 3</h3>	
					<img src={logo3} alt="logo-Kategorie-x" />
				</div>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 4</h3>	
					<img src={logo4} alt="logo-Kategorie-x" />
				</div>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 5</h3>	
					<img src={logo5} alt="logo-Kategorie-x" />
				</div>
				<div class="border-2 border-primary-foreground bg-primary-foreground my-3 xl:w-[300px] w-[70%]">
					<h3 class="text-4xl absolute mt-[230px] px-4 bg-primary-foreground text-secondary bg-opacity-80">Kategorie nr 6</h3>	
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
					<div class="flex flex-col xl:flex-row xl:flex-wrap text-secondary absolute left-[30%] top-10">
						<h2 class="w-full">{$_(`kontaktformular.email`)} </h2>
						<Input
   							class="w-full text-primary-foreground"
						/>
						<h2 class="w-full">{$_(`kontaktformular.nachricht`)} </h2>
						<Textarea
   							class="text-primary-foreground w-[400px] h-[100px]" 
							
						/>
					</div>
				</div>
			</div>
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
