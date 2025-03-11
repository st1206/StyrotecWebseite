<script lang="ts">
	import head from '$lib/assets/images/bild11.jpg';
    import Button from '$lib/components/ui/button/button.svelte';
    import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
</script>

<img src={head} alt="head" class="relative z-10 h-[600px] w-full object-cover">
<div class="hidden xl:block absolute top-[560px] w-full h-[100px] bg-primary [clip-path:polygon(0%_0%,100%_0%,81%_100%,0%_100%)]"></div>
<div class="bg-secondary flex flex-col gap-16 p-[5%] xl:gap-32">

	

	
		<h3 class="text-primary-foreground text-2xl uppercase xl:text-5xl text-center mt-[100px]">
			{$_(`maschinenerhaltung.maschinenerhaltung`)}
		</h3>
		<p class="text-xl xl:mx-[10%]">{$_('maschinenerhaltung.maschinenerhaltung-text')}</p>
	

	<div class="bg-secondary text-primary-foreground text-xl">
		<Tabs tabStyle="full" contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary" ulClass="space-x-0 p-1 gap-2">
			<TabItem open title={$_(`maschinenerhaltung.spindelservice`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.spindelservice`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`spindelservice.spindelschaden`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/spindelservice">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.wartungen`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.wartungen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.wartungen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/wartungen">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.reparaturen`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.reparaturen`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.reparaturen-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/reparaturen">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
            <TabItem title={$_(`maschinenerhaltung.maschinenumzüge`)} activeClass="w-[200px] p-5 bg-primary text-xl" inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl">
				<h3 class="p-3 text-xl font-bold">{$_(`maschinenerhaltung.maschinenumzüge`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`maschinenerhaltung.maschinenumzüge-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/dienstleistungen/maschinenerhaltung/maschinenumzuege">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] h-[250px] border-4 xl:right-[-20%] m-3"
							src={head}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
        </Tabs>
    </div>
</div>
