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


</script>

<!-- 
    TODO: Promise auflösen: FS10 dann links rechts struktur aufbauen 
-->
<div class=" my-[100px] flex flex-wrap xl:flex-col text-xl">
    <div class="mx-[400px]">
        <h1 class="text-4xl font-boldFont pb-6 uppercase">
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
    
    <div class="h-[100px] bg-secondary">
        <!-- FS10 x...z darstellen -->
    </div>




    <div
		class="bg-primary-foreground text-secondary  w-full  py-8  xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 xl:ml-[10%] object-cover xl:max-w-[80%] xl:text-3xl"
		>
			<Accordion.Item  value="item-1">
				<Accordion.Trigger class=" ">{$_(`optionen.fraeskoepfe`)}</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl py-0 pt-4 border-2">
                    <div class="ml-12 flex flex-col xl:flex-row justify-around xl:pl-[250px] ">   
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
                                <th class="xl:min-w-[230px] min-w-[100px]"></th>
                                <th class="xl:min-w-[430px] min-w-[70px]">ST 7</th>
                                <th class="xl:min-w-[440px] min-w-[70px]">ST 8</th>
                                <th class="xl:min-w-[440px] min-w-[70px]">HS673</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.aAchse`)}</td>
                                <td>+/- 115°</td>
                                <td>+/- 115°</td>
                                <td>+/- 120°</td>
                               
                            </tr>
                            <tr class="">
                                <td class="text-left pl-2">{$_(`fs10.cAchse`)}</td>
                                <td>+/- 360°</td>
                                <td>+/- 360°</td>
                                <td>+/- 360°</td>
                                
                            </tr>
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.direkteMesssysteme`)}</td>
                                <td></td>
                                <td>○</td>
                                <td>●</td>
                                
                            </tr>
                            <tr class="">
                                <td class="text-left pl-2">{$_(`fs10.spindelorientierung`)}</td>
                                <td>○</td>
                                <td>○</td>
                                <td>○</td>
                               
                            </tr>
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.minimalmengenschmierung`)}</td>
                                <td>○</td>
                                <td>○</td>
                                <td>○</td>
                               
                            </tr>
                            <tr class="">
                                <td class="text-left pl-2">{$_(`fs10.blasluft`)}</td>
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
				<Accordion.Content class="xl:text-xl pt-4 border-2">
					<table class="block w-[90%]"> 
                        <thead class="bg-primary">
                            <tr>
                                <th class="xl:min-w-[240px] min-w-[100px]"></th>
                                <th class="xl:min-w-[430px] min-w-[70px]">ES 779</th>
                                <th class="xl:min-w-[440px] min-w-[70px]">ES 789</th>
                                <th class="xl:min-w-[440px] min-w-[70px]">ES 779</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.leistung`)}</td>
                                <td>10 kW</td>
                                <td>15 kW</td>
                                <td>22 kW</td>
                               
                            </tr>
                            <tr class="bg-secondary/25">
                                <td class="text-left pl-2">{$_(`fs10.drehzahl`)}</td>
                                <td>24.000 min-1</td>
                                <td>24.000 min-1</td>
                                <td>24.000 min-1</td>
                                
                            </tr>
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.drehmoment`)}</td>
                                <td>10,9 Nm</td>
                                <td>15 Nm</td>
                                <td>18 Nm</td>
                                
                            </tr>
                            <tr class="bg-secondary/25">
                                <td class="text-left pl-2">{$_(`fs10.aufnahme`)}</td>
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
				<Accordion.Content class=" xl:text-xl pt-4 border-2">
					<div class="flex flex-col xl:flex-row justify-around ">   
                        <div class="w-[400px]">
                            <img src={vierSeitig} alt="ST7" class="h-[300px] xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.4seitig`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={vollumhausung} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.vollumhausung`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={arbeitsraum} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.arbeitsraum`)}</p>
                        </div>
                    </div> 
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="item-4">
				<Accordion.Trigger>{$_(`optionen.werkzeugwechsler`)}</Accordion.Trigger>
				<Accordion.Content class=" xl:text-xl pt-4 border-2">
					<div class="flex flex-col xl:flex-row justify-around ">   
                        <div class="w-[400px]">
                            <img src={wzwpickup} alt="ST7" class="h-[300px] xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.pickup`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={wzwschubladen} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.schubladen`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={tellerwechsler} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.tellerwechsler`)}</p>
                        </div>
                    </div> 
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="item-5">
				<Accordion.Trigger>{$_(`optionen.messeinrichtungen`)}</Accordion.Trigger>
				<Accordion.Content class=" xl:text-xl pt-4 border-2">
					<div class="flex flex-col xl:flex-row justify-around ">   
                        <div class="w-[400px]">
                            <img src={tastsystem} alt="ST7" class="h-[300px] xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.tastsystem`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={laser} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.laser`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={messtaster} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.messtaster`)}</p>
                        </div>
                    </div> 
				</Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="item-6">
				<Accordion.Trigger>{$_(`optionen.tischvarianten`)}</Accordion.Trigger>
				<Accordion.Content class=" xl:text-xl pt-4 border-2">
					<div class="flex flex-col xl:flex-row justify-around ">   
                        <div class="w-[400px]">
                            <img src={alu} alt="ST7" class="h-[300px] xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.alutisch`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={vakuum} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.vakuumtisch`)}</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={glatt} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl ">{$_(`fs10.glatterTisch`)}</p>
                        </div>
                    </div> 
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>