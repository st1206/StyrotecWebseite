<script lang="ts">
	import head from '$lib/assets/images/bild11.jpg';
    import Button from '$lib/components/ui/button/button.svelte';
    import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	import KatCard from '$lib/components/katCard.svelte';
	import { Heading1Icon } from 'lucide-svelte';
	let { data } = $props();
</script>

<!-- Head -->
{#await data.kategorieBilder}
	<div>skeleton build</div>
{:then kategorie}
	<div class="relative z-10 left-0 top-0 w-[100%]">
		<Carousel height={600} pictures={kategorie.filter(item=> item.Kategorie ==="Maschinenerhaltung")[0].Bilder} />
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
				{$_(`maschinenerhaltung.titel`)}
			</h3>
			<h1 class="pl-2 text-right text-xl uppercase md:pl-6 md:text-2xl lg:pl-12 lg:text-4xl">
				{$_(`maschinenerhaltung.sub`)}
			</h1>
		</div>
		<p class="p-4 md:text-xl lg:text-2xl xl:mx-[10%]">{$_(`maschinenerhaltung.beschreibungs-text`)}</p>
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
		<!-- cnc - maschinen karte -->
		<KatCard
			titel={$_(`maschinenerhaltung.spindelservice`)}
			text={$_(`maschinenerhaltung.spindelservice-text`)}
			image={head}
			link="/dienstleistungen/maschinenerhaltung/spindelservice"
		/>

		<!-- cnc zubehör  Karte -->
		<KatCard
			titel={$_(`maschinenerhaltung.wartungen`)}
			text={$_(`maschinenerhaltung.wartungen-text`)}
			image={head}
			link="/dienstleistungen/maschinenerhaltung/wartungen"
		/>

		<!-- modellbaumaschinen Karte -->
		<KatCard
			titel={$_(`maschinenerhaltung.reparaturen`)}
			text={$_(`maschinenerhaltung.reparaturen-text`)}
			image={head}
			link="/dienstleistungen/maschinenerhaltung/reparaturen"
		/>

		<!-- holzbearbeitungsmaschinen -->
		<KatCard
			titel={$_(`maschinenerhaltung.maschinenumzüge`)}
			text={$_(`maschinenerhaltung.maschinenumzüge-text`)}
			image={head}
			link="/dienstleistungen/maschinenerhaltung/maschinenumzüge"
		/>	
	</div>
</div>




<div>
	<div class="bg-secondary text-primary-foreground text-xl">
		<Tabs tabStyle="full" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary" ulClass="space-x-0 p-1 gap-2">
			<TabItem open title={$_(`maschinenerhaltung.spindelservice`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.spindelservice`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`spindelservice.spindelschaden`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/spindelservice">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.wartungen`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.wartungen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.wartungen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/wartungen">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.reparaturen`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.reparaturen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.reparaturen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/reparaturen">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.maschinenumzüge`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.maschinenumzüge`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.maschinenumzüge-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/maschinenumzuege">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
        </Tabs>
    </div>
</div>
