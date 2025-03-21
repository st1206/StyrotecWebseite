<script>
    import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
	import temp from '$lib/assets/images/portalfraesmaschinen/temperatur.jpg'
	import process from '$lib/assets/images/portalfraesmaschinen/processing.jpg'
    import top from '$lib/assets/images/portalfraesmaschinen/3d.jpg';
    import arbeitsraum from '$lib/assets/images/portalfraesmaschinen/Arbeitsraumabdeckung.jpg';
	import klar from '$lib/assets/images/portalfraesmaschinen/material_klar.jpg';
	import rot from '$lib/assets/images/portalfraesmaschinen/material_rot.jpg';
	import schwarz from '$lib/assets/images/portalfraesmaschinen/material_schwarz.jpg';
	import weis from '$lib/assets/images/portalfraesmaschinen/material_weis.jpg';
	import zschieber from '$lib/assets/images/portalfraesmaschinen/zschieber.jpg';
	import zuführ from '$lib/assets/images/portalfraesmaschinen/zuführsystem.jpg';

</script>    




<div class="relative">
	<div
		class="bg-primary-foreground absolute hidden lg:block h-[230px] w-[50%] opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)]"
	>
		<h1 class="text-secondary hidden lg:block font-boldFont pl-10 pt-24 text-4xl xl:text-5xl">Schlagwort.</h1>
	</div>
	<img src={top} alt="Hybrid Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="bg-primary-foreground absolute hidden lg:block bottom-0 right-0 h-[200px] w-[40%] [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)]"
	></div>
</div>

<div class="relative text-xl md:pb-14">
	<div class="bg-primary-foreground h-[30px] w-full"></div>
	<img
		src={arbeitsraum}
		alt="FS20 Titelbild"
		class="absolute -top-[170px] hidden lg:block right-0 h-[300px] w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	/>
	<div
		class="from-primary-foreground/25 hidden lg:block via-primary-foreground/15 to-secondary absolute -top-[170px] right-0 h-[300px] w-[40%] bg-gradient-to-bl [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	></div>
	<div class="mx-4 pb-3  lg:ml-[80px] md:mr-[100px] lg:mr-[600px] xl:mr-[800px] mt-8 lg:mt-[100px]">
		<div>
			<h1 class="font-boldFont pb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase">
				{$_(`hybrid.übersicht-titel`)}
			</h1>
			<p>{$_(`hybrid.übersicht-text`)}</p>
            <p>{$_('hybrid.übersicht-text2')} </p> <br>
		</div>
	</div>
</div>

<div class="px-4 md:px-12 lg:px-[20%] xl:px-[30%] bg-primary-foreground text-secondary w-full py-8 xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]">
	<h2 class="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 md:mb-4 lg:mb-8">{$_('hybrid.vorteile-titel')}</h2>
	<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.vorteile-text')}</p>
</div>



<div class="p-4 md:p-20 xl:px-32">
	<h2 class="mb-1 md:mb-4 xl:mb-12 font-boldFont text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center ">{$_('hybrid.anbringung-titel')}</h2>
	<div class="flex flex-col md:flex-row gap-8 lg:gap-12">
		<div class="md:w-[50%]">
			<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.anbringung-text')}</p>
			<img src={zschieber} alt="z-Schieber" class="w-[50%] ml-[20%] my-4" />
		</div>
		<div class="md:w-[50%]">
			<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.z-schieber')}</p>
			<img src={zuführ} alt="Zuführsystem" class="w-[50%] ml-[20%] my-4" />
		</div>
	</div>
</div>

<div class="p-4 md:p-20 xl:pl-44">
	<div class="flex flex-col md:flex-row gap-8 lg:gap-12">
		<div class="md:w-[50%]">
			<h2 class="mb-1 md:mb-4 xl:mb-12 font-boldFont text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{$_('hybrid.varianten')}</h2>
			<div class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.punkt1')}</div>
			<div class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.punkt2')}</div>
			<div class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.punkt3')}</div>
			<div class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.punkt4')}</div>
		</div>
		<div class="md:w-[50%]">
			<table>
				<thead class="bg-primary-foreground text-secondary">
					<tr >
						<th class="w-auto p-2 font-boldFont text-xl md:text-2xl lg:text-3xl xl:text-4xl">{$_('hybrid.parameter')}</th>
						<th class="w-auto"></th>
					</tr>
				</thead>
				<tbody class="text-left text-lg md:text-lg lg:text-xl xl:text-2xl">
					<tr class=" bg-primary-foreground/5">
						<td class="px-2">{$_('hybrid.kapa')}</td>
						<td class="px-2">12-200 kg/h</td>
					</tr>
					<tr class="p-4 bg-primary-foreground/5">
						<td class="px-2">{$_('hybrid.temp')}</td>
						<td class="px-2">260°C, 400°C</td>
					</tr>
					<tr class="p-4 bg-primary-foreground/5">
						<td class="px-2">{$_('hybrid.düsen')}</td>
						<td class="px-2">4-25 mm</td>
					</tr>
					<tr class="p-4 bg-primary-foreground/5">
						<td class="px-2">{$_('hybrid.weg')}</td>
						<td class="px-2">{$_('hybrid.weg-text')}</td>
					</tr>
					<tr class="p-4 bg-primary-foreground/5">
						<td class="px-2">{$_('hybrid.geschwindigkeit')}</td>
						<td class="px-2">{$_('hybrid.geschwindigkeit-text')}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="bg-primary-foreground text-secondary w-full py-8 xl:mb-[100px] xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]">
	<h2 class="uppercase text-center font-boldFont text-2xl md:text-3xl lg:text-4xl xl:text-5xl pb-4 lg:pb-12">{$_('hybrid.material')}</h2>
	<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 ml-4 object-cover xl:ml-[10%] xl:max-w-[80%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class=" ">{$_(`hybrid.grund`)}</Accordion.Trigger>
				<Accordion.Content class=" py-0  xl:text-xl">
					<div class="flex flex-col justify-around md:flex-row flex-wrap">
						<div class="w-[90%] md:w-[45%] lg:w-[20%] content-center bg-secondary/5 rounded-lg flex flex-col justify-center py-12 m-4">
							<p class="z-10 text-center text-5xl font-boldFont mb-2 ">Klar</p>
							
							<img src={klar} alt="ST7" class="h-[350px] w-auto object-cover " />
							<p class="ml-4 uppercase font-boldFont text-2xl mb-0">Schlank.</p>
							<p class="ml-4">einseitig abgestützter Kompakt Kopf</p>
						</div>
						<div class="w-[90%] md:w-[45%] lg:w-[20%] content-center bg-secondary/5 rounded-lg flex flex-col justify-center py-12 m-4">
							<p class="text-center text-5xl font-boldFont mb-2">Rot</p>
							<img src={rot} alt="ST 8" class="h-[350px] w-auto object-cover" />
							<p class="ml-4 uppercase font-boldFont text-2xl mb-0">Stabil.</p>
							<p class="ml-4">beidseitig abgestützter Kompakt Kopf</p>
						</div>
						<div class="w-[90%] md:w-[45%] lg:w-[20%] content-center bg-secondary/5 rounded-lg flex flex-col justify-center py-12 m-4">
							<p class="text-center text-5xl font-boldFont mb-2">Schwarz</p>
							<img src={schwarz} alt="HS673" class="h-[350px] w-auto object-cover" />
							<p class="ml-4 uppercase font-boldFont text-2xl mb-0">Schlank.</p>
							<p class="ml-4">einseitig abgestützter Kompakt Kopf</p>
						</div>
						<div class="w-[90%] md:w-[45%] lg:w-[20%] content-center bg-secondary/5 rounded-lg flex flex-col justify-center py-12 m-4">
							<p class="text-center text-5xl font-boldFont mb-2">Weis</p>
							<img src={weis} alt="HS673" class="h-[350px] w-auto object-cover" />
							<p class="ml-4 uppercase font-boldFont text-2xl mb-0">Schlank.</p>
							<p class="ml-4">einseitig abgestützter Kompakt Kopf</p>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	<h2>{$_('hybrid.material')}</h2>
	<div>{$_('hybrid.grund')}</div>
	<div>{$_('hybrid.verstärkte')}</div>
	<div>{$_('hybrid.fortschrittlich')}</div>
</div>


<div class="px-4 md:px-12 lg:px-[10%] xl:px-[20%]  w-full py-8 md:py-16 xl:py-24">
	<h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-boldFont mb-2 md:mb-4 lg:mb-8">{$_('hybrid.prozess')}</h2>
	<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.prozess-text1')}</p>
	<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.prozess-text2')}</p>
	<p class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.prozess-text3')}</p>
	<div class="flex flex-row gap-4 mt-[20px]">
		<img src={temp} alt="HS673" class="w-[45%]  object-cover" />
		<img src={process} alt="HS673" class="w-[45%]   object-cover" />
	</div>
</div>



<div class="px-4 md:px-12 lg:px-[10%] xl:px-[20%]  w-full py-8 xl:py-12 ">
	<h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-boldFont mb-2 md:mb-4 lg:mb-8">{$_('hybrid.fräsprozess')}</h2>
	<div class="text-lg md:text-xl lg:text-2xl xl:text-3xl">{$_('hybrid.fräsprozess-text')}</div>
</div>



