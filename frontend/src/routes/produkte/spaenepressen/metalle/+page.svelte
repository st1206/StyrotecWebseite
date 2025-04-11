<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
	import top from '$lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg';
	import action from '$lib/assets/images/pressen/pallets_klein.jpg';
	import MaschinenCarousel from '$lib/components/maschinenCarousel.svelte';
	let { data } = $props();
</script>

<div class="relative">
	<div
		class="absolute hidden h-[230px] w-[50%] bg-primary-foreground opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] lg:block"
	>
		<h1 class="hidden pl-10 pt-24 font-boldFont text-4xl text-secondary lg:block xl:text-5xl">
			Schlagwort.
		</h1>
	</div>
	<img src={top} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="absolute bottom-0 right-0 hidden h-[200px] w-[40%] bg-primary-foreground [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
	></div>
</div>

<div class="relative text-xl">
	<div class="h-[30px] w-full bg-primary-foreground"></div>
	<img
		src={action}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] right-0 hidden w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	/>
	<div
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] bg-gradient-to-bl from-primary-foreground/25 via-primary-foreground/15 to-secondary [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	></div>
	<div
		class="mx-4 ml-[30px] mt-8 pb-3 md:mr-[100px] lg:ml-[80px] lg:mr-[45%] lg:mt-[100px] xl:mr-[45%]"
	>
		<div>
			<h1 class="text-center font-boldFont text-5xl uppercase">
				{$_(`pressen.titel`)}
			</h1>
			<p class="p-4 text-justify text-sm sm:text-xl">{$_(`pressen.metalle-text`)}</p>
		</div>
	</div>
</div>

<div>
	<div class="xl:mt-[150px]">
		{#await data.metallpressens}
			<div class="bg-primary">skeleton build</div>
		{:then metallpressens}
			{#each metallpressens as presse}
				<div
					class="mx-12 my-[96px] rounded-2xl border border-primary-foreground/5 bg-primary-foreground py-[50px] xl:mx-[200px]"
				>
					<h1
						class="mb-4 text-center font-boldFont text-3xl uppercase text-secondary md:mb-12 md:text-5xl"
					>
						{presse.Titel}
					</h1>

					<div class="flex flex-col justify-around lg:flex-row">
						<Accordion.Root
							type="single"
							class="relative mx-4 object-cover text-xl text-secondary md:pt-16 md:text-2xl xl:w-[50%] xl:text-3xl"
						>
							<Accordion.Item value="item-1">
								<Accordion.Trigger class="w-[400px]">{$_(`pressen.parameter`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`pressen.durchsatz`)}</span>
											<span class="text-right">{presse.Durchsatz}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`pressen.leistung`)}</span>
											<span class="text-right">{presse.Motorleistung}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span class="w-auto">{$_(`pressen.format`)}</span>
											<span class="w-auto text-right">{presse.Brikettformat}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`pressen.druck`)}</span>
											<span class="text-right">{presse.Pressdruck}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Trigger>{$_(`pressen.eigenschaften`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl ">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span>{$_(`pressen.maße`)}</span>
											<span class="w-auto text-right">{presse.Mase}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span>{$_(`pressen.gewicht`)}</span>
											<span class="w-auto text-right">{presse.Gewicht}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>

						<div class="relative left-10 w-[80%] p-4 lg:left-0 lg:top-0 lg:w-[40%]">
							<MaschinenCarousel height={400} pictures={presse.Bilder} />
						</div>
					</div>
				</div>
			{/each}
		{:catch}
			<p>Error loading the page</p>
		{/await}
	</div>
</div>

<div
	class="w-full bg-primary-foreground py-8 text-secondary xl:mb-[100px] xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
>
	<h1 class="mb-16 text-center font-boldFont text-5xl uppercase">Details</h1>

	<Accordion.Root
		type="single"
		class="relative mx-4 ml-4 object-cover text-secondary xl:ml-[10%] xl:max-w-[80%] xl:text-3xl"
	>
		<Accordion.Item value="item-1">
			<Accordion.Trigger class=" ">Flexibilität in der Anwendung</Accordion.Trigger>
			<Accordion.Content class=" py-0  xl:text-xl">
				<div class="flex flex-col flex-wrap justify-around md:flex-row">
					<div
						class="m-4 flex w-[90%] flex-col content-center justify-center rounded-lg bg-secondary/5 py-12 md:w-[45%] lg:w-[30%]"
					>
						<p class="z-10 mb-2 text-center font-boldFont text-5xl">Maschinenseitig</p>
						<p class="mb-0 ml-4 font-boldFont text-2xl uppercase">Schlank.</p>
						<p class="ml-4">
							Spänepressen zu maschinenseitigen Beladung arbeiten mit über Späneförderer direkt aus
							der Maschine zugeführten Spänen und können automatisierte Anlagen ergänzen. Es kann
							auch manuell zugeladen werden.
						</p>
					</div>
					<div
						class="m-4 flex w-[90%] flex-col content-center justify-center rounded-lg bg-secondary/5 py-12 md:w-[45%] lg:w-[30%]"
					>
						<p class="mb-2 text-center font-boldFont text-5xl">Zentral</p>
						<p class="mb-0 ml-4 font-boldFont text-2xl uppercase">Stabil.</p>
						<p class="ml-4">
							Zentral positionierte Spänepressen eignenn sich für die manuelle Beladung mit
							Hebekoppgeräten. Mit dem entsprechenden Zubehör lässt sich die Beladung
							automatisieren.
						</p>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>{$_(`optionen.fraesspindeln`)}</Accordion.Trigger>
			<Accordion.Content class=" pt-4 xl:text-xl">
				<table class="text-md block w-screen bg-primary-foreground p-4">
					<thead class="bg-secondary/15">
						<tr>
							<th class="min-w-[100px] font-semibold lg:min-w-[240px]"></th>
							<th class="min-w-[70px] font-semibold lg:min-w-[400px]">ES 779</th>
							<th class="min-w-[70px] font-semibold lg:min-w-[400px]">ES 789</th>
							<th class="min-w-[70px] font-semibold lg:min-w-[400px]">ES 779</th>
						</tr>
					</thead>
					<tbody class="text-center">
						<tr>
							<td class="p-2 text-left">{$_(`fs10.leistung`)}</td>
							<td class="p-2">10 kW</td>
							<td class="p-2">15 kW</td>
							<td class="p-2">22 kW</td>
						</tr>
						<tr>
							<td class="p-2 text-left">{$_(`fs10.drehzahl`)}</td>
							<td class="p-2">24.000 min-1</td>
							<td class="p-2">24.000 min-1</td>
							<td class="p-2">24.000 min-1</td>
						</tr>
						<tr>
							<td class="p-2 text-left">{$_(`fs10.drehmoment`)}</td>
							<td class="p-2">10,9 Nm</td>
							<td class="p-2">15 Nm</td>
							<td class="p-2">18 Nm</td>
						</tr>
						<tr>
							<td class="p-2 text-left">{$_(`fs10.aufnahme`)}</td>
							<td class="p-2">HSK 63F</td>
							<td class="p-2">HSK 63F</td>
							<td class="p-2">HSK 63A</td>
						</tr>
					</tbody>
				</table>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>{$_(`optionen.schutzeinrichtungen`)}</Accordion.Trigger>
			<Accordion.Content class="pt-4 xl:text-xl">
				<div class="flex flex-col justify-around xl:flex-row">
					<div class="w-[400px]">
						<img src={top} alt="ST7" class="h-[300px] xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.4seitig`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.vollumhausung`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.arbeitsraum`)}</p>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-4">
			<Accordion.Trigger>{$_(`optionen.werkzeugwechsler`)}</Accordion.Trigger>
			<Accordion.Content class="pt-4 xl:text-xl">
				<div class="flex flex-col justify-around xl:flex-row">
					<div class="w-[400px]">
						<img src={top} alt="ST7" class="h-[300px] xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.pickup`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.schubladen`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.tellerwechsler`)}</p>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-5">
			<Accordion.Trigger>{$_(`optionen.messeinrichtungen`)}</Accordion.Trigger>
			<Accordion.Content class="pt-4 xl:text-xl">
				<div class="flex flex-col justify-around xl:flex-row">
					<div class="w-[400px]">
						<img src={top} alt="ST7" class="h-[300px] xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.tastsystem`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.laser`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.messtaster`)}</p>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-6">
			<Accordion.Trigger>{$_(`optionen.tischvarianten`)}</Accordion.Trigger>
			<Accordion.Content class="pt-4 xl:text-xl">
				<div class="flex flex-col justify-around xl:flex-row">
					<div class="w-[400px]">
						<img src={top} alt="ST7" class="h-[300px] xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.alutisch`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.vakuumtisch`)}</p>
					</div>
					<div class="w-[400px]">
						<img src={top} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
						<p class="text-center text-xl">{$_(`fs10.glatterTisch`)}</p>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
