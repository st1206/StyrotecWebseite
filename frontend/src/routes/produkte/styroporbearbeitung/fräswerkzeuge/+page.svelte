<script lang="ts">
	import bigPic from '$lib/assets/images/Styroporfraesen.jpg';
	import * as Accordion from '$lib/components/ui/accordion';
	import SK from '$lib/assets/images/fraeswerkzeug/SK.png';
	import HSK50 from '$lib/assets/images/fraeswerkzeug/HSK50C-klein.png';
	import HSK63A from '$lib/assets/images/fraeswerkzeug/HSK63A-klein.png';
	import HSK63F from '$lib/assets/images/fraeswerkzeug/HSK63F-klein.png';
	import schaft from '$lib/assets/images/fraeswerkzeug/NT40R0 frei-2.png';
	import kugel from '$lib/assets/images/fraeswerkzeug/NT40R20 frei-2.png';
	import ecken from '$lib/assets/images/fraeswerkzeug/NT40R10-2.png';
	import auslauf from '$lib/assets/images/fraeswerkzeug/NT40AS45_2.png';
	import raspel from '$lib/assets/images/fraeswerkzeug/WTR40R20 frei-2.png';
	import wechsler from '$lib/assets/images/fraeswerkzeug/S_IMG_9908 frei-2.png';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_(`styroporfraesen.allgemein-Titel`)}</title>
	<meta name="description" content="" />
</svelte:head>

<div class="relative">
	<div
		class="absolute hidden h-[230px] w-[50%] bg-primary-foreground opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] lg:block"
	>
		<h1 class="hidden pl-10 pt-24 font-boldFont text-4xl text-secondary lg:block xl:text-5xl">
			Schlagwort.
		</h1>
	</div>
	<img src={bigPic} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="absolute bottom-0 right-0 hidden h-[200px] w-[40%] bg-primary-foreground [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
	></div>
</div>

<div class="relative text-xl">
	<div class="h-[30px] w-full bg-primary-foreground"></div>
	<img
		src={bigPic}
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
				{$_(`styroporfraesen.allgemein-Titel`)}
			</h1>
			<p class="text-justify">{$_(`styroporfraesen.allgemein-Text`)}</p>
		</div>
	</div>
</div>

<img
	src={wechsler}
	alt="HSK-50"
	class="absolute left-10 top-[2150px] -mb-[300px] hidden w-[110px] overflow-hidden bg-center lg:block xl:w-[200px]"
/>

<div class=" my-[100px] flex flex-wrap xl:flex-col">
	<div
		class="flex w-full flex-col bg-primary-foreground py-8 text-secondary xl:flex-row xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<div class="mx-4 mb-4 md:mx-[10%] xl:ml-[10%] xl:w-[40%]">
			<h1 class="mx-4 mb-4 text-4xl text-primary xl:mx-[20%]">
				{$_(`styroporfraesen.konfiguration-Titel`)}
			</h1>
			<p class="mx-4 text-justify text-xl xl:mx-[10%]">
				{$_(`styroporfraesen.konfiguration-Text`)}
			</p>
		</div>

		<Accordion.Root
			type="single"
			class="relative ml-4 w-[80%] object-cover text-secondary md:ml-[10%] xl:ml-0 xl:w-[30%]  xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="m-1 border-secondary/15 bg-secondary/5 p-4"
					>{$_(`styroporfraesen.schaftausführung`)}</Accordion.Trigger
				>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={schaft} alt="HSK-50" class="h-[300px] xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger class="m-1 border-secondary/15 bg-secondary/5 p-4"
					>{$_(`styroporfraesen.kugelausführung`)}</Accordion.Trigger
				>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={kugel} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger class="m-1 border-secondary/15 bg-secondary/5 p-4"
					>{$_(`styroporfraesen.eckenradiusausführung`)}</Accordion.Trigger
				>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={ecken} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger class="m-1 border-secondary/15 bg-secondary/5 p-4"
					>{$_(`styroporfraesen.Auslaufschräge`)}</Accordion.Trigger
				>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={auslauf} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<div class="mx-4 my-8 pb-10 md:mx-[25%] xl:mt-32">
		<h1 class="xl:bp-16 pb-3 text-center font-boldFont text-4xl md:pb-6 lg:pb-12">
			{$_(`styroporfraesen.wechselkopf`)}
		</h1>
		<div class="flex flex-col justify-around gap-12 sm:flex-row">
			<p class="h-auto w-[200px] text-xl">
				{$_(`styroporfraesen.gefräst`)} <br />
				<img src={kugel} alt="HSK-50" class="h-[200px] bg-center" />
			</p>
			<p class="h-[200px] w-[200px] text-xl">
				{$_(`styroporfraesen.raspel`)} <img src={raspel} alt="HSK-50" class="h-[200px] bg-center" />
			</p>
		</div>
	</div>

	<div class="mx-4 my-8 pb-10 md:mx-[10%] lg:mx-[25%] xl:mt-32">
		<h1 class=" font-boldFont text-4xl">{$_(`styroporfraesen.tabelle-überschrift`)}</h1>
		<p class=" text-xl">
			{$_(`styroporfraesen.tabelle-text`)}
		</p>
	</div>

	<table class="mb-10 ml-[10%] lg:mx-[25%]">
		<thead class="bg-primary-foreground text-secondary">
			<tr>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">L / ⌀</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">15</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">25</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">30</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">35</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">40</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">45</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">50</th>
				<th class="w-[40px] md:w-[70px] lg:w-[80px]">60</th>
			</tr>
		</thead>
		<tbody class="text-center">
			<tr class="bg-primary-foreground/5 p-4">
				<td>100</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/10 p-4">
				<td>150</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/5 p-4">
				<td>200</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/10 p-4">
				<td>250</td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/5 p-4">
				<td>300</td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/10 p-4">
				<td>350</td>
				<td></td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/5 p-4">
				<td>400</td>
				<td></td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/10 p-4">
				<td>450</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/5 p-4">
				<td>500</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
				<td>●</td>
			</tr>
			<tr class="bg-primary-foreground/10 p-4">
				<td>550</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>○</td>
			</tr>
			<tr class="bg-primary-foreground/5 p-4">
				<td>600</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td>○</td>
			</tr>
		</tbody>
	</table>

	<div class="mx-4 mt-[100px] pb-10 md:mx-[10%] lg:mx-[25%]">
		<h1 class="pb-3 font-boldFont text-4xl text-primary-foreground">
			{$_(`styroporfraesen.besonderheiten`)}
		</h1>
		<p class="text-justify text-xl">{$_(`styroporfraesen.besonderheit-text`)}</p>
	</div>

	<div
		class=" flex w-full flex-col bg-primary-foreground py-8 text-secondary xl:flex-row xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<div class="mx-4 mb-4 md:mx-[10%] xl:ml-[10%] xl:w-[40%]">
			<h1 class="mx-4 mb-4 text-4xl text-primary xl:mx-[20%]">
				{$_(`styroporfraesen.werkzeugaufnahme`)}
			</h1>
			<p class="mx-4 text-justify text-xl xl:mx-[10%]">
				{$_(`styroporfraesen.werkzeugaufnahme-Text`)}
			</p>
		</div>

		<Accordion.Root
			type="single"
			class="relative ml-4 w-[80%] object-cover text-secondary md:ml-[10%] xl:ml-0 xl:w-[30%]  xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>HSK 50</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={HSK50} alt="HSK-50" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>HSK 63A</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={HSK63A} alt="HSK-63A" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>HSK 63F</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<img src={HSK63F} alt="HSK-63F" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger>SK 30 - SK 50</Accordion.Trigger>
				<Accordion.Content class="ml-[50px] xl:text-xl">
					<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
					<img src={SK} alt="SK Aufnahmen" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<div class="mx-4 my-4 xl:mx-[20%] xl:my-32">
		<h1 class="pb-3 font-boldFont text-2xl">{$_('styroporfraesen.bemerkung-titel')}</h1>
		<p class="text-justify font-boldItalicFont">{$_('styroporfraesen.bemerkung-text')}</p>
	</div>
</div>
