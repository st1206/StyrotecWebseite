<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { pages } from '$lib/config/pages';
	import { menu } from '$lib/config/routes';
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';

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
	<div class="sm:container">
		<div class="flex items-end justify-between gap-4 py-8">
			<span class="font-boldFont text-lg md:text-2xl">
				Folge uns auf unseren Social-Media-Kanälen!
			</span>
			<div class="flex gap-4 pl-4">
				<Button
					size="icon"
					href="https://www.instagram.com/styrotec/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icons.copyright class="skew-x-[15deg]" />
				</Button>
				<Button
					size="icon"
					href="https://www.linkedin.com/company/styrotec-gmbh-co-kg/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icons.copyright class="skew-x-[15deg]" />
				</Button>
				<Button
					size="icon"
					href="https://www.xing.com/companies/styrotecgmbh&cokg"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icons.copyright class="skew-x-[15deg]" />
				</Button>
			</div>
		</div>
		<Separator class="hidden w-full bg-white/20 lg:block" orientation="horizontal" />
		<div class=" flex w-full items-center justify-center py-16 lg:justify-between">
			<div class="flex w-max flex-col gap-8">
				<img src={Icons.logoLight} alt="Logo" class="mx-auto h-20 w-max lg:mx-0" />
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
		<div class="flex justify-between py-4 text-xs sm:text-base">
			<div class="flex items-center gap-2">
				<Icons.copyright class="size-4" />
				<h1 class="font-sans">2025 StyroTec GmbH & Co. KG</h1>
			</div>
			<div class="flex items-center">
				<Button
					variant="link"
					href="https://www.styrotec.de/impressum/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-normal font-sans font-normal"
				>
					Impressum
				</Button>
				|
				<Button
					variant="link"
					href="https://www.styrotec.de/datenschutz/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-normal font-sans font-normal"
				>
					Datenschutz
				</Button>
			</div>
		</div>
	</div>
</footer>
<div class="bg-primary h-2 w-full"></div>
