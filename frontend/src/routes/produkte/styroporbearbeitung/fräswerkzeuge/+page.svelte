<script lang="ts">
	import bigPic from '$lib/assets/images/Styroporfraesen.jpg';
	import { _ } from 'svelte-i18n';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<Carousel.Root>
	<Carousel.Content style={`max-height: 700px`}>
		<Carousel.Item class="pl-0">
			<img class="h-full w-full object-cover" src={bigPic} alt="Bilder" />
		</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>
<div class=" my-[100px] flex flex-wrap  xl:flex-col">
	<div>
		<div class="pb-10">
			<h1 class="pb-3 text-3xl">{$_(`styroporfraesen.allgemein-Titel`)}</h1>
			<p class="text-xl">{$_(`styroporfraesen.allgemein-Text`)}</p>
		</div>

		<div class=" w-full bg-primary-foreground text-secondary pt-32 pb-32 xl:[clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]">
			<h1 class="pb-3 text-3xl">{$_(`styroporfraesen.konfiguration-Titel`)}</h1>
			<p class="text-xl">{$_(`styroporfraesen.konfiguration-Text`)}</p>
			<Accordion.Root
				type="single"
				class="text-secondary  relative ml-[10%] w-[80%] object-cover xl:ml-64 xl:mt-8 xl:max-w-[70%] xl:text-3xl"
			>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>{$_(`styroporfraesen.schaftausführung`)}</Accordion.Trigger>
					<Accordion.Content class="xl:text-xl">
						
                         hier bild 1 
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>{$_(`styroporfraesen.kugelausführung`)}</Accordion.Trigger>
					<Accordion.Content class="xl:text-xl">
						
                         hier bild 2
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-3">
					<Accordion.Trigger>{$_(`styroporfraesen.eckenradiusausführung`)}</Accordion.Trigger>
					<Accordion.Content>
						
						hier bild 3
					</Accordion.Content>
				</Accordion.Item>
                <Accordion.Item value="item-4">
					<Accordion.Trigger>{$_(`styroporfraesen.Auslaufschräge`)}</Accordion.Trigger>
					<Accordion.Content>
						<!-- TODO: Info über eine sache raussuchen um hier einzufüllen zb. branchen produktkategorien etc. -->
						hier bild 4
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>

		<div class="pb-10">
			<h1 class="pb-3 text-3xl">{$_(`styroporfraesen.wechselkopf`)}</h1>
            <div class="flex xl:flex-row flex-col gap-10">    
                <p class="text-xl">{$_(`styroporfraesen.gefräst`)} <br> hier noch bild einfügen</p>
                <p class="text-xl">{$_(`styroporfraesen.raspel`)} <br> hier anderes bild einfügen </p>
            </div>
		</div>

		<div class="pb-10">
			<h1 class="pb-3 text-3xl">{$_(`styroporfraesen.werkzeugaufnahme`)}</h1>
			<p class="text-xl">{$_(`styroporfraesen.werkzeugaufnahme-Text`)}</p>
		</div>

		<div class="pb-10">
			<h1 class="pb-3 text-3xl">{$_(`styroporfraesen.besonderheiten`)}</h1>
			<p class="text-xl">{$_(`styroporfraesen.besonderheit-text`)}</p>
		</div>

		<div>
			<h1 class="pb-3 text-3xl">{$_('styroporfraesen.bemerkung-titel')}</h1>
			<p class="text-xl">{$_('styroporfraesen.bemerkung-text')}</p>
		</div>
	</div>
</div>
