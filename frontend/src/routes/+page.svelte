<script lang="ts">
	import Carousel from '$lib/components/carousel.svelte';
	let { data } = $props();
	let carouselHeight = 800;
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
					<h2 class="text-secondary ml-10 uppercase">Hier gibts info</h2>
				</div>
				<div class="relative top-20 mx-5">
					<p>inforamationstext zu xyz lorem ipsum sit dolor cum anis</p>
				</div>
			</div>
		</div>

		<div>
			<div
				class="flex-col justify-between px-96 py-20 shadow-[10px_-10px_30px_rgba(0,0,0,0.75)] xl:flex xl:flex-row xl:flex-wrap"
			>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
				<div class="bg-primary-foreground my-3 h-[200px] w-[200px]">
					<img src="" alt="logo-Kategorie-x" />
				</div>
			</div>
		</div>

		<div
			class="z-0 from-background via-primary to-secondary-foreground relative h-[600px] w-full bg-gradient-to-bl"
		>
			<div
				class="bg-primary-foreground absolute mt-[160px] h-[300px] w-full shadow-[10px_10px_30px_rgba(0,0,0,0.75)]"
			>
				<div>
					<p class="text-secondary absolute left-[30%] top-32">
						Hier kommt direkt kontaktanfrage bzw. Weiterleitung dazu
					</p>
				</div>
			</div>
		</div>
	{:catch}
		SERVER ERROR...
	{/await}
</div>
