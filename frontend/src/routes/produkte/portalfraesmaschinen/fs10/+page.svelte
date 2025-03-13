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

<div class="relative ">
	<div
		class="bg-primary-foreground absolute hidden lg:block h-[230px] w-[50%] opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)]"
	>
		<h1 class="text-secondary hidden lg:block font-boldFont pl-10 pt-24 text-4xl xl:text-5xl">Schlagwort.</h1>
	</div>
	<img src={top} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="bg-primary-foreground absolute hidden lg:block bottom-0 right-0 h-[200px] w-[40%] [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)]"
	></div>
</div>

<div class="relative text-xl">
	<div class="bg-primary-foreground h-[30px] w-full"></div>
	<img
		src={arbeitsraum}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] hidden lg:block right-0 h-[300px] w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	/>
	<div
		class="from-primary-foreground/25 hidden lg:block via-primary-foreground/15 to-secondary absolute -top-[170px] right-0 h-[300px] w-[40%] bg-gradient-to-bl [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	></div>
	<div class="mx-4 pb-3 ml-[30px] lg:ml-[80px] md:mr-[300px] lg:mr-[600px] xl:mr-[800px] mt-8 lg:mt-[100px]">
		<div>
			<h1 class="font-boldFont pb-6 text-5xl uppercase">
				{$_(`fs10.übersicht-titel`)}
			</h1>
			<p>{$_(`fs10.übersicht-text`)}</p>
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
					class="border-primary-foreground/5 bg-primary-foreground mx-12 my-[96px] rounded-2xl border py-[50px] xl:mx-[200px]"
				>
					<h1 class="font-boldFont text-secondary mb-4 md:mb-16 text-center text-3xl md:text-5xl uppercase">
						FS 10 - {fs10.Titel}
					</h1>

					<div class="flex flex-col justify-around xl:flex-row">
						<Accordion.Root
							type="single"
							class="text-secondary relative mx-4 ml-4 object-cover xl:ml-[10%] xl:max-w-[45%] text-xl md:text-2xl xl:text-3xl"
						>
							<Accordion.Item value="item-1">
								<Accordion.Trigger class="w-screen"
									>{$_(`fs10.achsen`)}</Accordion.Trigger
								>
								<Accordion.Content class="pt-4 xl:text-xl mx-1 bg-primary-foreground/15">
									<table class="bg-secondary/15 block text-md p-4 w-full border border-secondary/25 ">
										<tbody >
											<tr class="w-[100%]">
												<td class="w-[50%] text-left">{$_(`cnc-Masch-Seite.xachse`)}</td>
												<td class="w-[45%] text-right">{fs10.xAchse}</td>
											</tr>
											<tr>
												<td class="text-left">{$_(`cnc-Masch-Seite.yachse`)}</td>
												<td class="text-right">{fs10.yAchse}</td>
											</tr>
											<tr>
												<td class="text-left">{$_(`cnc-Masch-Seite.zachse`)}</td>
												<td class="text-right">{fs10.zAchse}</td>
											</tr>
										</tbody>
									</table>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Trigger>{$_(`fs10.geschwindigkeit`)}</Accordion.Trigger>
								<Accordion.Content class="pt-4 xl:text-xl mx-1 bg-primary-foreground/15">
									<table class="bg-secondary/15 text-md block p-4 border border-secondary/25">
										<tbody class="text-left">
											<tr>
												<td class="w-[50%]">{$_(`cnc-Masch-Seite.vorschub-x`)}</td>
												<td class="w-[50%] text-right">{fs10.VorschubX}</td>
											</tr>
											<tr>
												<td>{$_(`cnc-Masch-Seite.vorschub-y`)}</td>
												<td class="w-[50%] text-right">{fs10.VorschubY}</td>
											</tr>
											<tr>
												<td>{$_(`cnc-Masch-Seite.vorschub-z`)}</td>
												<td class="w-[50%] text-right">{fs10.VorschubZ}</td>
											</tr>
										</tbody>
									</table>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-3">
								<Accordion.Trigger>{$_(`fs10.schwenk`)}</Accordion.Trigger>
								<Accordion.Content class="pt-4 xl:text-xl">
									<table class="bg-primary-foreground text-md block w-screen p-4">
										<tbody class="text-left">
											<tr>
												<td>{$_(`cnc-Masch-Seite.aachse`)}</td>
												<td class="w-[50%] text-right">{fs10.aAchse}</td>
											</tr>
											<tr>
												<td>{$_(`cnc-Masch-Seite.cachse`)}</td>
												<td class="w-[50%] text-right">{fs10.cAchse}</td>
											</tr>
										</tbody>
									</table>
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="item-4">
								<Accordion.Trigger>{$_(`fs10.steuerung`)}</Accordion.Trigger>
								<Accordion.Content class="pt-4 xl:text-xl">
									<table class="bg-primary-foreground text-md block w-screen p-4">
										<tbody class="text-left">
											<tr>
												<td class="w-[50%] text-left">{fs10.Steuerung}</td>
											</tr>
										</tbody>
									</table>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>

						<div class="relative left-10 xl:left-0 xl:top-0 w-[80%] xl:w-[45%] p-4">
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
		class="bg-primary-foreground text-secondary w-full py-8 xl:mb-[100px] xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<h1 class="uppercase font-boldFont text-5xl text-center mb-16">{$_(`fs10.optionen`)}</h1>

		<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 ml-4 object-cover xl:ml-[10%] xl:max-w-[80%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class=" ">{$_(`optionen.fraeskoepfe`)}</Accordion.Trigger>
				<Accordion.Content class=" py-0 pt-4 xl:text-xl">
					<div class="ml-12 flex flex-col justify-around md:flex-row xl:pl-[330px]">
						<div class="w-[400px]">
							<img src={st7} alt="ST7" class="h-[200px] :ml-4" />
							<p class="text-center text-xl xl:hidden">ST 7</p>
						</div>
						<div class="w-[400px]">
							<img src={st8} alt="ST 8" class="h-[200px] bg-center xl:ml-4" />
							<p class="text-center text-xl xl:hidden">ST 8</p>
						</div>
						<div class="w-[400px]">
							<img src={HS673} alt="HS673" class="h-[200px] bg-center xl:ml-4" />
							<p class="text-center text-xl xl:hidden">HS673</p>
						</div>
					</div>
					<table class="bg-primary-foreground text-md block w-screen p-4 shadow-md">
						<thead class="bg-secondary/15">
							<tr>
								<th class="min-w-[90px] font-semibold lg:min-w-[240px]"></th>
								<th class="min-w-[70px] font-semibold lg:min-w-[400px]">ST 7</th>
								<th class="min-w-[70px] font-semibold lg:min-w-[400px]">ST 8</th>
								<th class="min-w-[70px] font-semibold lg:min-w-[400px]">HS673</th>
							</tr>
						</thead>
						<tbody class="text-center">
							<tr>
								<td class="p-4 text-left">{$_(`cnc-Masch-Seite.aachse`)}</td>
								<td class="p-4">+/- 115°</td>
								<td class="p-4">+/- 115°</td>
								<td class="p-4">+/- 120°</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`cnc-Masch-Seite.cachse`)}</td>
								<td class="p-4">+/- 360°</td>
								<td class="p-4">+/- 360°</td>
								<td class="p-4">+/- 360°</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.direkteMesssysteme`)}</td>
								<td class="p-4"></td>
								<td class="p-4">○</td>
								<td class="p-4">●</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.spindelorientierung`)}</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.minimalmengenschmierung`)}</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.blasluft`)}</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
								<td class="p-4">○</td>
							</tr>
						</tbody>
					</table>
					<span>○ - optional, ● - standard </span>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>{$_(`optionen.fraesspindeln`)}</Accordion.Trigger>
				<Accordion.Content class=" pt-4 xl:text-xl">
					<table class="bg-primary-foreground text-md block w-screen p-4 shadow-md">
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
								<td class="p-4 text-left">{$_(`fs10.leistung`)}</td>
								<td class="p-4">10 kW</td>
								<td class="p-4">15 kW</td>
								<td class="p-4">22 kW</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.drehzahl`)}</td>
								<td class="p-4">24.000 min-1</td>
								<td class="p-4">24.000 min-1</td>
								<td class="p-4">24.000 min-1</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.drehmoment`)}</td>
								<td class="p-4">10,9 Nm</td>
								<td class="p-4">15 Nm</td>
								<td class="p-4">18 Nm</td>
							</tr>
							<tr>
								<td class="p-4 text-left">{$_(`fs10.aufnahme`)}</td>
								<td class="p-4">HSK 63F</td>
								<td class="p-4">HSK 63F</td>
								<td class="p-4">HSK 63A</td>
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
