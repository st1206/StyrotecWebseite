<script lang="ts">
	import { _ } from 'svelte-i18n';
	import * as Carousel from '$lib/components/ui/carousel';
	import headerImg from '$lib/assets/images/spindelservice/Header_2_bearbeitet.png';
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
<div
	class="bg-primary-foreground pb-10 [clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)] xl:h-[300px]"
>
	<h1 class="p-4 text-3xl text-secondary xl:p-24">{$_(`spindelservice.spindelschaden`)}</h1>
</div>

<div>
	<div
		class="flex flex-col gap-4 p-4 xl:my-[100px] xl:ml-[500px] xl:w-[1000px] xl:flex-row xl:gap-32"
	>
		<div>
			<h1 class="p-4 text-3xl">{$_(`spindelservice.wir-bieten`)}</h1>
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
			<h1 class="p-4 text-3xl">{$_(`spindelservice.helfen`)}</h1>
			<p class="text-xl">- {$_(`spindelservice.helfen-eins`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-zwei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-drei`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-vier`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-fünf`)}</p>
			<p class="text-xl">- {$_(`spindelservice.helfen-sechs`)}</p>
		</div>
	</div>
	<h1 class="ml-4 font-boldFont text-4xl text-primary-foreground xl:ml-[500px]">
		{$_(`spindelservice.vorgehensweise`)}
	</h1>
	<div class="mx-4 bg-primary-foreground xl:mx-[500px] xl:my-[100px] xl:w-[900px]">
		<div class="ml-10 bg-secondary">
			<div
				title={$_(`spindelservice.eingangsprüfung`)}
				class="border-primary-foreground bg-primary"
			>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.eingangsprüfung-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.demontage`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.demontage-text`)}
				</p>
			</div>
			<div
				title={$_(`spindelservice.angebotsfreibage`)}
				class="order-primary-foreground bg-primary"
			>
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.angebotsfreigabe-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.beschaffung`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.beschaffung-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.feinwuchten`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.feinwuchten-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.montage`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.montage-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.fettverteilung`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.fettverteilung-text`)}
				</p>
			</div>
			<div title={$_(`spindelservice.prüflauf`)} class="border-primary-foreground bg-primary">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					{$_(`spindelservice.prüflauf-text`)}
				</p>
			</div>
		</div>
	</div>
</div>
