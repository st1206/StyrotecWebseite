<script lang="ts">
	import { Timeline, TimelineItem } from 'svelte-5-ui-lib';
	import { _ } from 'svelte-i18n';
	import * as Carousel from '$lib/components/ui/carousel';

	import headerImg from "$lib/assets/images/spindelservice/Header_2_bearbeitet.png";
</script>



<Carousel.Root class="mt-[64px] w-full">
	<Carousel.Content style={`max-height: 700px`}>
		<Carousel.Item class="pl-0">
			<div>
				<img class="h-full w-full object-cover" src={headerImg} alt="Bilder" />	
				
			</div>		
		</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>
<div class="bg-primary-foreground pb-10 xl:h-[300px] [clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]">
	<h1 class="text-3xl text-secondary p-4 xl:p-24">{$_(`spindelservice.spindelschaden`)}</h1>
</div>

<div>
	
	<div class="p-4 xl:w-[1000px] xl:ml-[500px] xl:my-[100px] flex xl:flex-row flex-col gap-4 xl:gap-32">
		<div>
			<h1 class="text-3xl p-4"> {$_(`spindelservice.wir-bieten`)}</h1>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-eins`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-zwei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-drei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-vier`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-fünf`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-sechs`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-sieben`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-acht`)}</p>
			<p class="text-xl">- {$_(`spindelservice.wir-bieten-neun`)}</p>
		</div>
		<div>
			<h1 class="text-3xl p-4"> {$_(`spindelservice.helfen`)}</h1>
			<p class="text-xl">- {$_(`spindelservice.helfen-eins`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-zwei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-drei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-vier`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-fünf`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-sechs`)}</p>

		</div>
	</div>
	<h1 class="text-4xl text-primary-foreground ml-[500px] font-boldFont">{$_(`spindelservice.vorgehensweise`)}</h1>
	<div class="mx-4 xl:mx-[500px] xl:my-[100px] xl:w-[900px] bg-primary-foreground ">
		

		<Timeline class="ml-10 bg-secondary "> 
			<TimelineItem title={$_(`spindelservice.eingangsprüfung`)} divClass="bg-primary  border-primary-foreground">
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.eingangsprüfung-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.demontage`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.demontage-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.angebotsfreibage`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.angebotsfreigabe-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.beschaffung`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.beschaffung-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.feinwuchten`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.feinwuchten-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.montage`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.montage-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.fettverteilung`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.fettverteilung-text`)}
				</p>
			</TimelineItem>
			<TimelineItem title={$_(`spindelservice.prüflauf`)} divClass="bg-primary  border-primary-foreground">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.prüflauf-text`)}
				</p>
			</TimelineItem>			
		</Timeline>
	</div>
</div>
