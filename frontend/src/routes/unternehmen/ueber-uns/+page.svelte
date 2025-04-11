<script lang="ts">
	import vid from '$lib/assets/videos/Imagefilm.mp4';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { _ } from 'svelte-i18n';

	let { data } = $props();
</script>

<div class="mt-[66px] bg-primary-foreground">
	<div class="[clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]">
		<video
			autoplay
			loop
			muted
			class="md:lg-[500px] h-[400px] w-full object-cover lg:h-[700px] xl:h-[800px]"
		>
			<source src={vid} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div>
</div>

<!-- Team -->
<div class="h-auto w-full bg-primary-foreground" id="team">
	<div class="pt-4 xl:pt-24">
		<h2 class="text-center font-boldFont text-4xl uppercase text-secondary xl:text-5xl">
			{$_('ueber-uns.team-titel')}
		</h2>
		<p class="px-[5%] pt-6 text-justify text-xl text-secondary lg:px-32 lg:pt-12 xl:px-[20%]">
			{$_('ueber-uns.team-text')}
		</p>
	</div>
	{#await data.mitarbeiter}
		<p>Waiting for Data</p>
	{:then mitarbeiter}
		<div class="flex flex-col flex-wrap gap-2 p-[5%] md:flex-row lg:gap-10 lg:px-32">
			{#each mitarbeiter as arbeiter}
				<div
					class="h-[350px] w-[90%] rounded-lg bg-secondary bg-cover bg-center md:w-[47%] xl:h-[380px]"
					style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${arbeiter.Bilder.url}`
						: arbeiter.Bilder.url})"
				>
					<div
						class="relative top-52 m-4 rounded-lg bg-primary-foreground bg-opacity-70 p-2 text-xl text-secondary md:top-52 xl:top-64 xl:text-3xl"
					>
						{arbeiter.Name} <br />
						{arbeiter.Position}
					</div>
				</div>
			{/each}
		</div>
	{:catch}
		<p>server Error</p>
	{/await}
</div>

<!-- philosophie -->
<div class="p-[5%]" id="werte">
	<h1
		class="ml-3 pb-4 text-center font-boldFont text-xl uppercase md:pb-6 md:text-2xl lg:pb-8 lg:text-4xl xl:pb-12 xl:text-5xl"
	>
		{$_('ueber-uns.werte-titel')}
	</h1>
	<div class="flex flex-col flex-wrap justify-around gap-2 md:flex-row lg:gap-8">
		<div
			class="w-[95%] rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-8 lg:p-12 xl:p-16"
		>
			<h2
				class="pb-4 font-boldFont text-xl uppercase text-primary md:text-2xl lg:text-3xl xl:text-5xl"
			>
				{$_('ueber-uns.wert1')}
			</h2>
			<p class="text-justify">{$_('ueber-uns.wert1-text')}</p>
		</div>

		<div
			class="w-[95%] rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-8 lg:p-12 xl:p-16"
		>
			<h2
				class="pb-4 font-boldFont text-xl uppercase text-primary md:text-2xl lg:text-3xl xl:text-5xl"
			>
				{$_('ueber-uns.wert2')}
			</h2>
			<p class="text-justify">{$_('ueber-uns.wert2-text')}</p>
		</div>

		<div
			class="w-[95%] rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-8 lg:p-12 xl:p-16"
		>
			<h2
				class="pb-4 font-boldFont text-xl uppercase text-primary md:text-2xl lg:text-3xl xl:text-5xl"
			>
				{$_('ueber-uns.wert3')}
			</h2>
			<p class="text-justify">{$_('ueber-uns.wert3-text')}</p>
		</div>
	</div>
</div>

<!-- Historie -->
<div class="bg-primary-foreground p-6 md:p-12 lg:p-32 xl:px-64" id="historie">
	<div
		class="jsutify-center flex h-auto w-full items-center rounded-lg bg-secondary p-4 md:p-8 lg:p-12 xl:p-16"
	>
		<div class="mx-auto grid w-full grid-cols-9">
			<h2
				class="col-span-9 pb-4 text-center font-boldFont text-5xl uppercase text-primary-foreground md:pb-8 lg:pb-12 xl:pb-16"
			>
				Styrotec Historie
			</h2>
			<!-- 1. Punkt / links -->
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.gründung-titel')}
					</h2>
					<p>{$_('ueber-uns.gründung')}</p>
				</div>
			</div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2002</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full"></div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 2. Punkt / rechts -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2003</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.portfolio-titel')}
					</h2>
					<p>{$_('ueber-uns.portfolio')}</p>
				</div>
			</div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 3. Punkt / links -->
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.erste-titel')}
					</h2>
					<p>{$_('ueber-uns.erste')}</p>
				</div>
			</div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2004</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full"></div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 4. Punkt / rechts -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2005</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.gebrauma-titel')}
					</h2>
					<p>{$_('ueber-uns.gebrauma')}</p>
				</div>
			</div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 5. Punkt / links -->
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.portal-titel')}
					</h2>
					<p>{$_('ueber-uns.portal')}</p>
				</div>
			</div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2007</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full"></div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 6. Punkt / rechts -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2009</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.übernahme-titel')}
					</h2>
					<p>{$_('ueber-uns.übernahme')}</p>
				</div>
			</div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 7. Punkt / links -->
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.umzug-titel')}
					</h2>
					<p>{$_('ueber-uns.umzug')}</p>
				</div>
			</div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2015</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full"></div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 8. Punkt / rechts -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2021</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.umzug-2-titel')}
					</h2>
					<p>{$_('ueber-uns.umzug-2')}</p>
				</div>
			</div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 9. Punkt / links -->
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="text-md font-boldFont uppercase md:text-xl lg:text-2xl xl:text-3xl">
						{$_('ueber-uns.portfolio2-titel')}
					</h2>
					<p>{$_('ueber-uns.portfolio2')}</p>
				</div>
			</div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2022</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full"></div>
			<!-- Abstand -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="xl:[100px] h-[30px] w-1 bg-primary md:h-[50px] lg:h-[70px]"></div>
			</div>
			<div class="col-span-4 h-full w-full"></div>

			<!-- 10. Punkt / rechts -->
			<div class="col-span-4 h-full w-full"></div>
			<div class="col-span-1 flex h-full w-full items-center justify-center">
				<div class="h-full w-1 bg-primary"></div>
				<div class="absolute z-10 h-12 w-12 rounded-full bg-primary text-center">
					<p class="pt-3 font-boldFont">2023</p>
				</div>
			</div>
			<div class="col-span-4 h-full w-full">
				<div class="h-full w-full rounded-lg bg-primary-foreground p-2 text-secondary md:p-4">
					<h2 class="font-boldFont text-xl uppercase md:text-2xl lg:text-3xl xl:text-3xl">
						{$_('ueber-uns.tobias-titel')}
					</h2>
					<p>{$_('ueber-uns.tobias')}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Nachhaltigkeit -->
<div class="p-[5%] xl:p-[5%]" id="nachhaltigkeit">
	<div class="px-[10%]">
		<h2
			class="pb-2 text-center font-boldFont text-xl uppercase md:pb-4 md:text-2xl lg:pb-6 lg:text-3xl xl:pb-8 xl:text-5xl"
		>
			{$_('ueber-uns.nachhaltigkeit-titel')}
		</h2>
		<p class="md:text-md pb-3 text-center text-sm lg:text-lg xl:text-xl">
			{$_('ueber-uns.nachhaltigkeit-text1')}
		</p>
		<p class="md:text-md pb-3 text-center text-sm lg:text-lg xl:text-xl">
			{$_('ueber-uns.nachhaltigkeit-text2')}
		</p>
		<p class="md:text-md text-center text-sm lg:text-lg xl:text-xl">
			{$_('ueber-uns.nachhaltigkeit-text3')}
		</p>
	</div>

	<div
		class=" flex flex-col flex-wrap justify-around gap-2 pt-8 md:flex-row md:gap-4 md:pt-10 lg:gap-6 lg:pt-14 xl:gap-8 xl:pt-20"
	>
		<div
			class="relative rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-6 lg:p-8 xl:p-12"
		>
			<h3
				class="pb-4 font-boldFont text-xl uppercase text-primary md:pb-6 md:text-2xl lg:pb-8 lg:text-3xl xl:pb-10 xl:text-5xl"
			>
				{$_('ueber-uns.wiederverwendung')}
			</h3>
			<p class=" pb-8 text-justify md:pb-10 lg:pb-12 xl:pb-16">
				{$_('ueber-uns.wiederverwendung-text')}
			</p>
			<Button
				href="/produkte/gebrauchtmaschinen"
				class="absolute bottom-4 right-4 bg-primary text-secondary md:bottom-6 md:right-6 lg:bottom-8 lg:right-8  xl:bottom-10 xl:right-10"
			>
				{$_('portalfraes.cta')}
			</Button>
		</div>
		<div
			class="relative rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-6 lg:p-8 xl:p-12"
		>
			<h3
				class="pb-4 font-boldFont text-xl uppercase text-primary md:pb-6 md:text-2xl lg:pb-8 lg:text-3xl xl:pb-10 xl:text-5xl"
			>
				{$_('ueber-uns.abfall')}
			</h3>
			<p class=" pb-8 text-justify md:pb-10 lg:pb-12 xl:pb-16">{$_('ueber-uns.abfall-text')}</p>
			<Button
				href="/produkte/spaenepressen"
				class="absolute bottom-4 right-4 bg-primary text-secondary md:bottom-6 md:right-6 lg:bottom-8 lg:right-8  xl:bottom-10 xl:right-10"
			>
				{$_('portalfraes.cta')}
			</Button>
		</div>
		<div
			class="relative rounded-lg bg-primary-foreground p-4 text-secondary md:w-[48%] md:p-6 lg:p-8 xl:p-12"
		>
			<h3
				class="pb-4 font-boldFont text-xl uppercase text-primary md:pb-6 md:text-2xl lg:pb-8 lg:text-3xl xl:pb-10 xl:text-5xl"
			>
				{$_('ueber-uns.wiederverwertung')}
			</h3>
			<p class=" pb-8 text-justify md:pb-10 lg:pb-12 xl:pb-16">
				{$_('ueber-uns.wiederverwertung-text')}
			</p>
			<Button
				href="/dienstleistungen/maschinenmodernisierung"
				class="absolute bottom-4 right-4 bg-primary text-secondary md:bottom-6 md:right-6 lg:bottom-8 lg:right-8  xl:bottom-10 xl:right-10"
			>
				{$_('portalfraes.cta')}
			</Button>
		</div>
	</div>
</div>
