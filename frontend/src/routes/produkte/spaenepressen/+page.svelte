<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import portalfraes from '$lib/assets/images/gebrauchtmaschinen/gebrauma.jpg';
	import { _ } from 'svelte-i18n';
	import Carousel from '$lib/components/carousel.svelte';
	import { Tabs, TabItem } from 'svelte-5-ui-lib';
	let { data } = $props();
</script>

<div>
    <img
		class="size-full object cover h-[600px]"
		src={portalfraes}
		alt="bild"
	/>
	<div class="bg-secondary text-primary-foreground text-xl p-[5%]">
		<Tabs
			style="underline"
			contentClass="bg-primary-foreground text-secondary text-2xl rounded-0 border-secondary"
			ulClass="space-x-0 p-1 gap-2"
		>
			<TabItem
				open
				title={$_(`pressen.kunststoff`)}
				activeClass="w-[200px] p-5 bg-primary text-xl"
				inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl"
			>
				<h3 class="p-3 text-xl font-bold">{$_(`pressen.kunststoff`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`pressen.kunststoff-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/spaenepressen/kunststoffe">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] m-3 h-[250px] border-4 xl:right-[-20%]"
							src={portalfraes}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
			<TabItem
				title={$_(`pressen.metalle`)}
				activeClass="w-[200px] p-5 bg-primary text-xl"
				inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl"
			>
				<h3 class="p-3 text-xl font-bold">{$_(`pressen.metalle`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`pressen.metalle-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/spaenepressen/metallee">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] m-3 h-[250px] border-4 xl:right-[-20%]"
							src={portalfraes}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
			<TabItem
				title={$_(`pressen.styropor`)}
				activeClass="w-[200px] p-5 bg-primary text-xl"
				inactiveClass="w-[200px] p-5 bg-primary-foreground text-secondary text-xl"
			>
				<h3 class="p-3 text-xl font-bold">{$_(`pressen.styropor`)}</h3>
				<div class="flex flex-col xl:flex-row">
					<div class="w-full p-3 xl:w-[50%]">
						{$_(`pressen.styropor-text`)} <br />
						<Button class="relative -bottom-5 left-[3%]  xl:right-[90px]"
							><a href="/produkte/spaenepressen/styropore">{$_(`portalfraes.cta`)}</a></Button
						>
					</div>
					<div class=" xl:w-[50%]">
						<img
							class="border-secondary-foreground relative bottom-[10%] m-3 h-[250px] border-4 xl:right-[-20%]"
							src={portalfraes}
							alt="bild"
						/>
					</div>
				</div>
			</TabItem>
		</Tabs>
	</div>
</div>
