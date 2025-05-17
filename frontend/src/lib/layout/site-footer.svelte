<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { pages } from '$lib/config/pages';
	import { menu } from '$lib/config/routes';
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';

	let { socialMediaChannels }: { socialMediaChannels: { name: string; externalLink: string }[] } =
		$props();

	const slugMap: Record<keyof typeof pages, string> = $derived.by(() => {
		const use = $locale === 'en-EN' ? 'enSlug' : 'deSlug';
		const prefix = $locale === 'en-EN' ? '/en/' : '/de/';

		return Object.fromEntries(
			Object.entries(pages).map(([k, p]: any) => [k, prefix + p[use]])
		) as Record<keyof typeof pages, string>;
	});

	function getLink<K extends keyof typeof pages>(key: K): string {
		return slugMap[key];
	}
</script>

<footer class="bg-primary-foreground text-white">
	<div class="mx-2 sm:container sm:mx-auto">
		<div class="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row print:hidden">
			<span class="font-boldFont text-center text-lg sm:text-start sm:text-xl md:text-2xl">
				Folge uns auf unseren Social-Media-Kanälen!
			</span>
			<div class="flex gap-4 px-4">
				{#if socialMediaChannels?.length}
					{#each socialMediaChannels as channel}
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<Button
										size="icon"
										href={channel.externalLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										{@const IconComponent = Icons[channel.name] ?? Icons.copyright}
										<IconComponent class="size-5 skew-x-[15deg]" />
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p class="capitalize">
										{channel.name}
									</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					{/each}
				{/if}
			</div>
		</div>
		<Separator class="hidden w-full bg-white/20 lg:block" orientation="horizontal" />
		<div class=" flex w-full items-center justify-center py-16 lg:justify-between">
			<div class="flex w-max flex-col gap-8">
				<img src={Icons.logoLight} alt="Logo" class="mx-auto h-20 w-max lg:mx-0 lg:h-28" />
				<div class="flex gap-6">
					<div class="flex flex-col gap-1">
						<span class="mx-auto font-sans font-medium lg:mx-0">Email</span>
						<span class="font-sans">info@styrotec.com</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="mx-auto items-center font-sans font-medium lg:mx-0">Telefonnummer</span>
						<span class="font-sans">+49 751 56050-20</span>
					</div>
				</div>
			</div>
			<div class="hidden font-sans lg:flex lg:gap-8 xl:gap-16">
				{#each menu as menuItems}
					<div>
						<h3 class="text-primary mb-4 font-semibold capitalize">{$_(`nav.${menuItems.key}`)}</h3>
						<ul class="space-y-2">
							{#each menuItems.menuRoutes as route}
								<li>
									<Button
										variant="link"
										href={getLink(route.key)}
										class="text-normal h-6 p-0 font-sans font-normal"
									>
										{$_(`nav.${route.key}`)}
									</Button>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
		<Separator class="w-full bg-white/20" orientation="horizontal" />
		<div
			class="flex flex-col items-center justify-between pb-4 pt-6 text-xs sm:flex-row sm:pt-4 sm:text-base print:justify-center"
		>
			<div class="flex items-center gap-2">
				<Icons.copyright class="size-4" />
				<h1 class="font-sans">2025 Styrotec GmbH & Co. KG</h1>
			</div>
			<div class="flex items-center print:hidden">
				<Button variant="link" href="/" class="text-normal font-sans font-normal">Impressum</Button>
				|
				<Button variant="link" href="/" class="text-normal font-sans font-normal">
					Datenschutz
				</Button>
			</div>
		</div>
	</div>
</footer>
<div class="bg-primary h-2 w-full"></div>
