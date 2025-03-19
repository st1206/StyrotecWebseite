<script lang="ts">
	import auto1 from '$lib/assets/images/branchen/auto_top.jpg';
	import auto2 from '$lib/assets/images/branchen/auto_bot.jpg';
	import beton1 from '$lib/assets/images/branchen/beton_top.jpg';
	import beton2 from '$lib/assets/images/branchen/beton_bot.jpg';
	import kunst1 from '$lib/assets/images/branchen/Kunst_top.jpg';
	import kunst2 from '$lib/assets/images/branchen/Kunst_bot.jpg';
	import luft1 from '$lib/assets/images/branchen/luft_top.jpg';
	import luft2 from '$lib/assets/images/branchen/luft_bot.jpg';
	import schiff1 from '$lib/assets/images/branchen/Schiffsbau_top.jpg';
	import schiff2 from '$lib/assets/images/branchen/Schiffsbau_bot.jpg';
	import * as Accordion from '$lib/components/ui/accordion';
	import { _ } from 'svelte-i18n';
	import { Button } from 'svelte-5-ui-lib';
</script>


<div class="bg-primary-foreground flex flex-col gap-8 px-16 md:gap-16 md:px-24 lg:gap-32">
    <!-- Automobil -->
	<div class="relative mt-[125px]">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.auto-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.auto-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="automobil"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={auto1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl bg-secondary/35">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={auto2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Schiff -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.schiff-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.schiff-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="schiffsbau"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={schiff1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl bg-primary/15">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={schiff2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Modellbau -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.modell-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.modell-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="modellbau"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={schiff1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={schiff2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Kunststoffindustrie -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.kunststoff-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.kunststoff-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="kunststoffindustrie"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={schiff1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={schiff2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Betonindustrie -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.beton-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.beton-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="betonindustrie"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={beton1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={beton2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Werbetechnik -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.werbe-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.werbe-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="werbetechnik"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={schiff1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={schiff2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Aerospace -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.luft-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.luft-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="aerospace"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={luft1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={luft2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>

    <!-- Kunst -->
    <div class="relative ">
		<!-- dunkel Filter -->
		<div class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]">
			<!-- Heading im Bild -->
			<h1
				class="font-boldFont text-secondary relative left-4 top-4 w-[400px] text-3xl uppercase md:left-16 md:top-16 md:text-5xl lg:left-24 lg:top-32 lg:text-7xl"
			>
				{$_('branchen.kunst-titel')}
			</h1>
			<p
				class="text-secondary/65 relative left-4 top-2 md:left-16 md:top-16 lg:left-24 lg:top-32 lg:text-xl"
			>
				{$_('branchen.kunst-sub')}
			</p>
		</div>
		<!-- Link an richtige Stelle der Seite -->
		<div class="absolute -top-[130px]" id="kunst"></div>
		<!-- obere Hälfte Bild-->
		<img
			src={kunst1}
			alt="FS10 Titelbild"
			class="h-[150px] w-full rounded-t-3xl object-cover object-bottom md:h-[250px] lg:h-[380px]"
		/>
		<!-- dropdown in der Mitte -->
		<Accordion.Root
			type="single"
			class="text-secondary relative -top-12 bg-opacity-0 md:-top-20 md:py-2"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger class="font-boldFont w-[40%] md:text-2xl">
					{$_('branchen.lösung')}</Accordion.Trigger
				>
				<Accordion.Content class="pt-4 xl:text-xl  ">
					<div class="flex flex-row justify-around">
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.links')}</h2>
							<div class="flex flex-row flex-wrap justify-between gap-2 md:justify-normal">
								<Button class="bg-primary "><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
							</div>
						</div>
						<div class="bg-secondary/25 h-auto w-[1px]"></div>
						<div class="h-auto w-[48%] py-1">
							<h2 class="pb-2 text-center text-2xl">{$_('branchen.rechts')}</h2>
							<div class="flex flex-row flex-wrap justify-around gap-2">
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 1</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 2</a></Button>
								<Button class="bg-primary"><a href="/" class="hover:underline">Link 3</a></Button>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<!-- dunkel Filter + Bild unten -->
		<div class="relative -top-[50px] md:-top-[90px]">
			<div
				class="bg-primary-foreground/50 absolute h-[150px] w-full md:h-[250px] lg:h-[380px]"
			></div>
			<img
				src={kunst2}
				alt="FS10 Titelbild"
				class="h-[150px] w-full rounded-b-3xl object-cover object-top md:h-[250px] lg:h-[380px]"
			/>
		</div>
	</div>
</div>
