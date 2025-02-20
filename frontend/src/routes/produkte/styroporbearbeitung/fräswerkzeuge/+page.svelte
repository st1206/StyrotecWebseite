<script lang="ts">
	import bigPic from '$lib/assets/images/Styroporfraesen.jpg';
	import { _ } from 'svelte-i18n';
	import * as Carousel from '$lib/components/ui/carousel';
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
	
	import { Table, TableHead, TableBody } from 'svelte-5-ui-lib';
  	const headItems = ["L / ⌀", "15", "25", "30", "35", "40", "45", "50", "60"];
 	const bodyItems = [
		['100', "●", "●", "●","●","●","●","●","●"],
		['150', "●", "●", "●","●","●","●","●","●"],
		['200', "●", "●", "●","●","●","●","●","●"],
		['250', "", "●", "●","●","●","●","●","●"],
		['300', "", "●", "●","●","●","●","●","●"],
		['350', "", "", "●","●","●","●","●","●"],
		['400', "", "", "●","●","●","●","●","●"],
		['450', "", "", "","","●","●","●","●"],
		['500', "", "", "","","●","●","●","●"],
		['550', "", "", "","","","","","○"],
		['600', "", "", "","","","","","○"],
	];
</script>

<svelte:head>
	<title>{$_(`styroporfraesen.allgemein-Titel`)}</title>
	<meta name="description" content="" />
</svelte:head>

<Carousel.Root class="mt-[60px] w-full">
	<Carousel.Content style={`max-height: 700px`}>
		<Carousel.Item class="pl-0">
			<img class="h-full w-full object-cover" src={bigPic} alt="Bilder" />
		</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>

<img
				src={wechsler}
				alt="HSK-50"
				class="absolute hidden xl:block left-10 top-[2150px] -mb-[300px]  w-[110px]  overflow-hidden bg-center  xl:w-[200px] "
			/>

<div class=" my-[100px] flex flex-wrap xl:flex-col">
	<div class="mx-4 pb-10 xl:mx-[20%]">
		<h1 class="mb-4 pb-3 text-4xl">{$_(`styroporfraesen.allgemein-Titel`)}</h1>
		<p class="overflow-hidden text-xl">{$_(`styroporfraesen.allgemein-Text`)}</p>
	</div>

	<div
		class="bg-primary-foreground text-secondary flex flex-col py-8 xl:flex-row xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<div class="xl:ml-[350px] xl:w-[600px]">
			<h1 class="text-primary mx-4 mb-4 text-4xl xl:mx-[20%]">
				{$_(`styroporfraesen.konfiguration-Titel`)}
			</h1>
			<p class="mx-4 text-xl xl:mx-[20%]">{$_(`styroporfraesen.konfiguration-Text`)}</p>
		</div>
		<Accordion.Root
			type="single"
			class="text-secondary relative mx-4 w-[450px] object-cover   xl:max-w-[70%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>{$_(`styroporfraesen.schaftausführung`)}</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={schaft} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>{$_(`styroporfraesen.kugelausführung`)}</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={kugel} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>{$_(`styroporfraesen.eckenradiusausführung`)}</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={ecken} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger>{$_(`styroporfraesen.Auslaufschräge`)}</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={auslauf} alt="HSK-50" class="h-[300px] bg-center xl:ml-4" />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<div class="mx-4 my-8 pb-10 xl:mx-[35%] xl:mt-32">
		<h1 class="pb-3 text-4xl">{$_(`styroporfraesen.wechselkopf`)}</h1>
		<div class="flex flex-col gap-12 xl:flex-row text-center">
			<p class="h-[200px] w-[200px] text-xl">
				{$_(`styroporfraesen.gefräst`)} <br />
				<img src={kugel} alt="HSK-50" class="h-[200px] bg-center" />
			</p>
			<p class="h-[200px] w-[200px] text-xl">
				{$_(`styroporfraesen.raspel`)} <img src={raspel} alt="HSK-50" class="h-[200px] bg-center" />
			</p>
		</div>
	</div>

	<div class="mx-4 my-8 pb-10 xl:mt-32 xl:mx-[25%]">
		<h1 class=" text-4xl  ">{$_(`styroporfraesen.tabelle-überschrift`)}</h1>
		<p class=" text-xl">
			{$_(`styroporfraesen.tabelle-text`)} 
		</p>
	</div>
	<!-- TODO: Tabelle mobil anpassen-->
	<div class="max-w-[500px]">
		<Table striped class="max-w-[400px] bg-secondary border-2 border-primary-foreground ">
			<TableHead {headItems} class="p-1 bg-primary w-[full]"/>
			<TableBody {bodyItems} />
	  	</Table>
	</div>
	<div
		class=" bg-primary-foreground text-secondary w-full py-8 xl:py-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
	>
		<h1 class="text-primary mx-4 mb-4 text-4xl xl:mx-[20%]">
			{$_(`styroporfraesen.werkzeugaufnahme`)}
		</h1>
		<p class="mx-4 text-xl xl:mx-[20%]">{$_(`styroporfraesen.werkzeugaufnahme-Text`)}</p>
		<Accordion.Root
			type="single"
			class="text-secondary  relative mx-4 object-cover xl:mx-[20%] xl:mt-8 xl:max-w-[70%] xl:text-3xl"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>HSK 50</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={HSK50} alt="HSK-50" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>HSK 63A</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={HSK63A} alt="HSK-63A" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>HSK 63F</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<img src={HSK63F} alt="HSK-63F" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger>SK 30 - SK 50</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">
					<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
					<img src={SK} alt="SK Aufnahmen" class="h-[300px] bg-center xl:ml-[40%]" />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<div class="mx-4 mt-[100px] pb-10 xl:mx-[20%]">
			<h1 class="text-primary pb-3 text-4xl">{$_(`styroporfraesen.besonderheiten`)}</h1>
			<p class="text-xl">{$_(`styroporfraesen.besonderheit-text`)}</p>
		</div>
	</div>

	<div class="mx-4 my-4 xl:mx-[20%] xl:my-32">
		<h1 class="pb-3 text-4xl">{$_('styroporfraesen.bemerkung-titel')}</h1>
		<p class="text-xl">{$_('styroporfraesen.bemerkung-text')}</p>
	</div>
</div>
