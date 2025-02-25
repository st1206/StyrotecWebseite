<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
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

	let { data } = $props();
    console.log(data);
</script>


<img src={top} alt="FS10 Titelbild" class="w-full object-cover h-[300px] xl:h-[600px]">

<div class=" my-[100px] text-xl">
	<div class="mx-4 mb-4 xl:mx-[400px] xl:my-[200px]">
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

	

	<div
		class="bg-primary-foreground text-secondary w-full py-8 xl:py-32 xl:mb-[200px] xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 object-cover ml-4 xl:ml-[10%] xl:max-w-[80%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class=" ">{$_(`optionen.fraeskoepfe`)}</Accordion.Trigger>
				<Accordion.Content class="border-2 py-0 pt-4 xl:text-xl">
					<div class="ml-12 flex flex-col justify-around xl:flex-row xl:pl-[250px]">
						<div class="w-[400px]">
							<img src={st7} alt="ST7" class="h-[300px] xl:ml-4" />
							<p class="text-center text-xl xl:hidden">ST 7</p>
						</div>
						<div class="w-[400px]">
							<img src={st8} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl xl:hidden">ST 8</p>
						</div>
						<div class="w-[400px]">
							<img src={HS673} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
							<p class="text-center text-xl xl:hidden">HS673</p>
						</div>
					</div>
					<table class="px-x block w-[90%]">
						<thead class="bg-primary">
							<tr>
								<th class="min-w-[100px] xl:min-w-[230px]"></th>
								<th class="min-w-[70px] xl:min-w-[430px]">ST 7</th>
								<th class="min-w-[70px] xl:min-w-[440px]">ST 8</th>
								<th class="min-w-[70px] xl:min-w-[440px]">HS673</th>
							</tr>
						</thead>
						<tbody class="text-center">
							<tr class="bg-secondary text-primary-foreground">
								<td class="pl-2 text-left">{$_(`cnc-Masch-Seite.aachse`)}</td>
								<td>+/- 115°</td>
								<td>+/- 115°</td>
								<td>+/- 120°</td>
							</tr>
							<tr class="">
								<td class="pl-2 text-left">{$_(`cnc-Masch-Seite.cachse`)}</td>
								<td>+/- 360°</td>
								<td>+/- 360°</td>
								<td>+/- 360°</td>
							</tr>
							<tr class="bg-secondary text-primary-foreground">
								<td class="pl-2 text-left">{$_(`fs10.direkteMesssysteme`)}</td>
								<td></td>
								<td>○</td>
								<td>●</td>
							</tr>
							<tr class="">
								<td class="pl-2 text-left">{$_(`fs10.spindelorientierung`)}</td>
								<td>○</td>
								<td>○</td>
								<td>○</td>
							</tr>
							<tr class="bg-secondary text-primary-foreground">
								<td class="pl-2 text-left">{$_(`fs10.minimalmengenschmierung`)}</td>
								<td>○</td>
								<td>○</td>
								<td>○</td>
							</tr>
							<tr class="">
								<td class="pl-2 text-left">{$_(`fs10.blasluft`)}</td>
								<td>○</td>
								<td>○</td>
								<td>○</td>
							</tr>
						</tbody>
					</table>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>{$_(`optionen.fraesspindeln`)}</Accordion.Trigger>
				<Accordion.Content class="border-2 pt-4 xl:text-xl">
					<table class="block w-[90%]">
						<thead class="bg-primary">
							<tr>
								<th class="min-w-[100px] xl:min-w-[240px]"></th>
								<th class="min-w-[70px] xl:min-w-[430px]">ES 779</th>
								<th class="min-w-[70px] xl:min-w-[440px]">ES 789</th>
								<th class="min-w-[70px] xl:min-w-[440px]">ES 779</th>
							</tr>
						</thead>
						<tbody class="text-center">
							<tr class="bg-secondary text-primary-foreground">
								<td class="pl-2 text-left">{$_(`fs10.leistung`)}</td>
								<td>10 kW</td>
								<td>15 kW</td>
								<td>22 kW</td>
							</tr>
							<tr class="bg-secondary/25">
								<td class="pl-2 text-left">{$_(`fs10.drehzahl`)}</td>
								<td>24.000 min-1</td>
								<td>24.000 min-1</td>
								<td>24.000 min-1</td>
							</tr>
							<tr class="bg-secondary text-primary-foreground">
								<td class="pl-2 text-left">{$_(`fs10.drehmoment`)}</td>
								<td>10,9 Nm</td>
								<td>15 Nm</td>
								<td>18 Nm</td>
							</tr>
							<tr class="bg-secondary/25">
								<td class="pl-2 text-left">{$_(`fs10.aufnahme`)}</td>
								<td>HSK 63F</td>
								<td>HSK 63F</td>
								<td>HSK 63A</td>
							</tr>
						</tbody>
					</table>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>{$_(`optionen.schutzeinrichtungen`)}</Accordion.Trigger>
				<Accordion.Content class=" border-2 pt-4 xl:text-xl">
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
				<Accordion.Content class=" border-2 pt-4 xl:text-xl">
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
				<Accordion.Content class=" border-2 pt-4 xl:text-xl">
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
				<Accordion.Content class=" border-2 pt-4 xl:text-xl">
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

    <div class="xl:mt-[50px]">
		{#await data.fs10s}
			<div class="bg-primary ">skeleton build</div>
		{:then fs10s}
            {#each fs10s as fs10}
            <div class="py-[100px]">    
                <h1 class="text-5xl font-boldFont uppercase text-center mb-16">FS 10 - {fs10.Titel}</h1>
                <div class ="flex flex-col xl:flex-row justify-around mx-[15%]">
                    <table class="w-[80%] xl:w-[35%]">
                        <tbody>
                            <tr class="bg-primary-foreground/5">
                                <td>{$_(`cnc-Masch-Seite.xachse`)}</td>
                                <td class="text-right">{fs10.xAchse}</td>
                            </tr>
                            <tr> 
                                <td>{$_(`cnc-Masch-Seite.yachse`)}</td>
                                <td class="text-right w-[50%]">{fs10.yAchse}</td>
                            </tr>
                            <tr class="bg-primary-foreground/5"> 
                                <td>{$_(`cnc-Masch-Seite.zachse`)}</td>
                                <td class="text-right w-[50%]">{fs10.zAchse}</td>
                            </tr>
                            <tr> 
                                <td>{$_(`cnc-Masch-Seite.vorschub-x`)}</td>
                                <td class="text-right w-[50%]">{fs10.VorschubX}</td>
                            </tr>
							<tr class="bg-primary-foreground/5"> 
                                <td>{$_(`cnc-Masch-Seite.vorschub-y`)}</td>
                                <td class="text-right w-[50%]">{fs10.VorschubY}</td>
                            </tr>
                            <tr> 
                                <td>{$_(`cnc-Masch-Seite.vorschub-z`)}</td>
                                <td class="text-right w-[50%]">{fs10.VorschubZ}</td>
                            </tr>
                            <tr class="bg-primary-foreground/5"> 
                                <td>{$_(`cnc-Masch-Seite.aachse`)}</td>
                                <td class="text-right w-[50%]">{fs10.aAchse}</td>
                            </tr>
                            <tr>  
                                <td>{$_(`cnc-Masch-Seite.cachse`)}</td>
                                <td class="text-right w-[50%]">{fs10.cAchse}</td>
                            </tr>
                            <tr class="bg-primary-foreground/5"> 
                                <td>{$_(`cnc-Masch-Seite.steuerung`)}</td>
                                <td class="text-right w-[50%]">{fs10.Steuerung}</td>
                            </tr>
                            <tr> 
                                <td>{$_(`cnc-Masch-Seite.abmessung`)}</td>
                                <td class="text-right w-[50%]">{fs10.AbmessungUmhausung}</td>
                            </tr>
                        </tbody>
                    </table>
					
                    <div class="relative left-0 top-0 w-[80%] xl:w-[35%]">
                        <MaschinenCarousel
                            height={600}
                            pictures={fs10.Bilder}
                        />
                    </div>
                </div>
            </div>
            {/each}
        {:catch}
        <p>Error loading the page</p>
		{/await}       
	</div>

	<p class="mx-4 mb-4 xl:mx-[400px] xl:my-[100px]">Unsere Portalfräsmaschinen stehen für <span class="text-primary">Präzision, Effizienz und Qualität.</span> Lassen Sie sich persönlich beraten und entdecken Sie, welche Lösung am besten zu Ihren Anforderungen passt. Wir freuen uns auf Ihre Anfrage!</p>
</div>
