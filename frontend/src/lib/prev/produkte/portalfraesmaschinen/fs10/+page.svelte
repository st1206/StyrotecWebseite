<script lang="ts">
	import vierSeitig from '$lib/assets/images/portalfraesmaschinen/4-seitige_Umhausung.png';
	import vollumhausung from '$lib/assets/images/portalfraesmaschinen/Umhausung.png';
	import arbeitsraum from '$lib/assets/images/portalfraesmaschinen/Arbeitsraumabdeckung.jpg';
	import st7 from '$lib/assets/images/portalfraesmaschinen/ST7_klein.png';
	import st8 from '$lib/assets/images/portalfraesmaschinen/ST8_klein.png';
	import HS673 from '$lib/assets/images/portalfraesmaschinen/HS673_klein.png';
	import wzwpickup from '$lib/assets/images/portalfraesmaschinen/Pick-up_Magazin.png';
	import wzwschubladen from '$lib/assets/images/portalfraesmaschinen/WZW_Pick-up_klein.png';
	import tellerwechsler from '$lib/assets/images/portalfraesmaschinen/WZW_Tellerwechsler_klein.png';
	import tastsystem from '$lib/assets/images/portalfraesmaschinen/TT140.png';
	import laser from '$lib/assets/images/portalfraesmaschinen/LC50.png';
	import messtaster from '$lib/assets/images/portalfraesmaschinen/csm_TS460_frei_klein.png';
	import alu from '$lib/assets/images/portalfraesmaschinen/alu.jpg';
	import vakuum from '$lib/assets/images/portalfraesmaschinen/gitter.jpg';
	import glatt from '$lib/assets/images/portalfraesmaschinen/tisch-glatt.jpg';
	import top from '$lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg';
	import MaschinenCarousel from '$lib/components/maschinenCarousel.svelte';

	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
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
		src={arbeitsraum}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	/>
	<div
		class="absolute -top-[170px] right-0 hidden h-[300px] w-[40%] bg-gradient-to-bl from-primary-foreground/25 via-primary-foreground/15 to-secondary [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:block lg:h-[700px]"
	></div>
	<div
		class="mx-4 ml-[30px] mt-8 pb-3 md:mr-[100px] lg:ml-[80px] lg:mr-[45%] lg:mt-[100px] xl:mr-[45%]"
	>
		<div>
			<h1 class="pb-6 font-boldFont text-2xl uppercase md:text-3xl lg:text-4xl xl:text-5xl">
				{$_(`fs10.übersicht-titel`)}
			</h1>
			<p class="text-justify">{$_(`fs10.übersicht-text`)}</p>
			<ul class="py-2">
				<li>● {$_(`fs10.übersicht-punkt1`)}</li>
				<li>● {$_(`fs10.übersicht-punkt2`)}</li>
				<li>● {$_(`fs10.übersicht-punkt3`)}</li>
			</ul>
			<p>{$_(`fs10.übersicht-ende`)}</p>
		</div>
	</div>
</div>

<div>
	<div class="xl:mt-[150px]">
		{#await data.fs10s}
			<div class="bg-primary">skeleton build</div>
		{:then fs10s}
			{#each fs10s as fs10}
				<div
					class="mx-12 my-[96px] rounded-2xl border border-primary-foreground/5 bg-primary-foreground py-[50px] xl:mx-[200px]"
				>
					<h1
						class="mb-4 text-center font-boldFont text-3xl uppercase text-secondary md:mb-16 md:text-5xl"
					>
						FS 10 - {fs10.Titel}
					</h1>

					<div class="flex flex-col justify-around lg:flex-row">
						<Accordion.Root
							type="single"
							class="relative mx-4 object-cover text-xl text-secondary md:text-2xl xl:w-[50%] xl:text-3xl"
						>
							<Accordion.Item value="item-1">
								<Accordion.Trigger class="w-[400px]">{$_(`fs10.achsen`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`cnc-Masch-Seite.xachse`)}</span>
											<span class="text-right">{fs10.xAchse}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`cnc-Masch-Seite.yachse`)}</span>
											<span class="text-right">{fs10.yAchse}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span class="text-left">{$_(`cnc-Masch-Seite.zachse`)}</span>
											<span class="text-right">{fs10.zAchse}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Trigger>{$_(`fs10.geschwindigkeit`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl ">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span class="w-auto">{$_(`cnc-Masch-Seite.vorschub-x`)}</span>
											<span class="w-auto text-right">{fs10.VorschubX}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span>{$_(`cnc-Masch-Seite.vorschub-y`)}</span>
											<span class="w-auto text-right">{fs10.VorschubY}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span>{$_(`cnc-Masch-Seite.vorschub-z`)}</span>
											<span class="w-auto text-right">{fs10.VorschubZ}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-3">
								<Accordion.Trigger>{$_(`fs10.schwenk`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span class="w-[50%]">{$_(`cnc-Masch-Seite.aachse`)}</span>
											<span class="w-[50%] text-right">{fs10.aAchse}</span>
										</div>
										<div class="flex flex-row justify-between">
											<span>{$_(`cnc-Masch-Seite.cachse`)}</span>
											<span class="w-[50%] text-right">{fs10.cAchse}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-4">
								<Accordion.Trigger>{$_(`fs10.steuerung`)}</Accordion.Trigger>
								<Accordion.Content class="mx-1 bg-primary-foreground/15 pt-4 xl:text-xl">
									<div class="bg-secondary/5 p-2 md:p-4">
										<div class="flex flex-row justify-between">
											<span class="w-auto text-left">{fs10.Steuerung}</span>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>

						<div class="relative left-10 w-[80%] p-4 lg:left-0 lg:top-0 lg:w-[40%]">
							<MaschinenCarousel height={400} pictures={fs10.Bilder} />
						</div>
					</div>
				</div>
			{/each}
		{:catch}
			<p>Error loading the page</p>
		{/await}
	</div>

	<div
		class="w-full bg-primary-foreground py-8 text-secondary xl:mb-[100px] xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<h1 class="mb-16 text-center font-boldFont text-5xl uppercase">{$_(`fs10.optionen`)}</h1>

		<Accordion.Root
			type="single"
			class="relative mx-4 ml-4 object-cover text-secondary xl:ml-[10%] xl:max-w-[80%] xl:text-3xl"
			value={'item-1'}
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class=" ">{$_(`optionen.fraeskoepfe`)}</Accordion.Trigger>
				<Accordion.Content class=" py-0  xl:text-xl">
					<div class="flex flex-col flex-wrap justify-around md:flex-row">
						<div
							class="m-4 flex w-[90%] flex-col content-center justify-center rounded-lg bg-secondary/5 py-12 md:w-[45%] lg:w-[30%]"
						>
							<p class="z-10 mb-2 text-center font-boldFont text-5xl">ST 7 - Fräskopf</p>

							<img src={st7} alt="ST7" class="h-[350px] w-auto object-contain" />
							<p class="mb-0 ml-4 font-boldFont text-2xl uppercase">Schlank.</p>
							<p class="ml-4">einseitig abgestützter Kompakt Kopf</p>
						</div>
						<div
							class="m-4 flex w-[90%] flex-col content-center justify-center rounded-lg bg-secondary/5 py-12 md:w-[45%] lg:w-[30%]"
						>
							<p class="mb-2 text-center font-boldFont text-5xl">ST 8 - Fräskopf</p>
							<img src={st8} alt="ST 8" class="h-[350px] w-auto object-contain" />
							<p class="mb-0 ml-4 font-boldFont text-2xl uppercase">Stabil.</p>
							<p class="ml-4">beidseitig abgestützter Kompakt Kopf</p>
						</div>
						<div
							class="m-4 flex w-[90%] flex-col content-center justify-center rounded-lg bg-secondary/5 py-12 md:w-[45%] lg:w-[30%]"
						>
							<p class="mb-2 text-center font-boldFont text-5xl">HS673 - Fräskopf</p>
							<img src={HS673} alt="HS673" class="h-[350px] w-auto object-contain" />
							<p class="mb-0 ml-4 font-boldFont text-2xl uppercase">Schlank.</p>
							<p class="ml-4">einseitig abgestützter Kompakt Kopf</p>
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
							<img src={vierSeitig} alt="ST7" class="h-[300px] xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.4seitig`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={vollumhausung} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.vollumhausung`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={arbeitsraum} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
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
							<img src={wzwpickup} alt="ST7" class="h-[300px] xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.pickup`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={wzwschubladen} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.schubladen`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={tellerwechsler} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
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
							<img src={tastsystem} alt="ST7" class="h-[300px] xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.tastsystem`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={laser} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.laser`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={messtaster} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
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
							<img src={alu} alt="ST7" class="h-[300px] xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.alutisch`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={vakuum} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.vakuumtisch`)}</p>
						</div>
						<div class="w-[400px]">
							<img src={glatt} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl">{$_(`fs10.glatterTisch`)}</p>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<p class="mx-4 mb-4 xl:mx-[400px] xl:mb-[100px]">
		Unsere Portalfräsmaschinen stehen für <span class="text-primary"
			>Präzision, Effizienz und Qualität.</span
		> Lassen Sie sich persönlich beraten und entdecken Sie, welche Lösung am besten zu Ihren Anforderungen
		passt. Wir freuen uns auf Ihre Anfrage!
	</p>
</div>
