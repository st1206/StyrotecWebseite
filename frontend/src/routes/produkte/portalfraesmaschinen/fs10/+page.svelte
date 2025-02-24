<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Carousel from '$lib/components/ui/carousel';
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
    import Messtaster from '$lib/assets/images/portalfraesmaschinen/csm_TS460_frei_klein.png';
    


</script>

<!-- 
    TODO: Promise auflösen: FS10 dann links rechts struktur aufbauen 
-->
<div class=" my-[100px] flex flex-wrap xl:flex-col">
    <div class="h-[1000px] bg-secondary">
        <!-- FS10 x...z darstellen -->
    </div>

    <div
		class="bg-primary-foreground text-secondary w-full  py-8  xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 xl:ml-[10%] object-cover xl:max-w-[80%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>{$_(`optionen.fraeskoepfe`)}</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
                    <div class="flex flex-col xl:flex-row justify-between">   
                        <div class="w-[400px]">
                            <img src={st7} alt="ST7" class="h-[300px] xl:ml-4" />
                            <p class="text-center text-xl">ST 7</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={st8} alt="ST 8" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl">ST 8</p>
                        </div>
                        <div class="w-[400px]">
                            <img src={HS673} alt="HS673" class="h-[300px] bg-center xl:ml-4" />
                            <p class="text-center text-xl">HS673</p>
                        </div>
                    </div> 
                    <table class="my-10 ml-[10%] block w-[70%] xl:ml-[15%]">
                        <thead class="bg-primary">
                            <tr>
                                <th class="min-w-[500px] xl:w-[100px]"></th>
                                <th class="min-w-[150px] xl:w-[100px]">ST 7</th>
                                <th class="min-w-[150px] xl:w-[100px]">ST 8</th>
                                <th class="min-w-[150px] xl:w-[100px]">HS673</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr class="bg-secondary text-primary-foreground">
                                <td class="text-left pl-2">{$_(`fs10.aAchse`)}</td>
                                <td>+/- 115°</td>
                                <td>+/- 115°</td>
                                <td>+/- 120°</td>
                               
                            </tr>
                            <tr class="bg-secondary/25">
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
                            <tr class="bg-secondary/25">
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
                            <tr class="bg-secondary/25">
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
				<Accordion.Trigger>{$_(`styroporfraesen.kugelausführung`)}</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>{$_(`styroporfraesen.eckenradiusausführung`)}</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>