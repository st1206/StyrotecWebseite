<script lang="ts">
	import { menu } from '$lib/config/routes';
	import { pages } from '$lib/config/pages';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { locale } from 'svelte-i18n';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
	import { cn } from '$lib/utils';
	import LanguageToggle from '$lib/components/language-toggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/assets/icons';

	let { open = $bindable() }: { open: boolean } = $props();

	// Locales + slug map for link resolution
	const slugMap: Record<keyof typeof pages, string> = $derived.by(() => {
		const use = $locale === 'en-EN' ? 'enSlug' : 'deSlug';
		const prefix = $locale === 'en-EN' ? '/en/' : '/de/';
		return Object.fromEntries(
			Object.entries(pages).map(([k, p]: any) => [k, prefix + p[use]])
		) as Record<keyof typeof pages, string>;
	});

	function getLink<K extends keyof typeof pages>(key: K, appendage?: string): string {
		const base = slugMap[key];
		if (!appendage) return base;
		return appendage.startsWith('/') ? `${base}${appendage}` : `${base}/${appendage}`;
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<div
	class={cn(
		open ? 'h-screen' : 'h-0',
		'bg-foreground w-screen px-2 transition-all duration-150 ease-in-out'
	)}
>
	<ScrollArea class="h-full w-full px-2">
		<div class="mt-6 flex w-full flex-col gap-2 px-4">
			<Button
				class="w-full"
				href="https://styrotec.shop/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="flex skew-x-[15deg] items-center gap-2">
					<Icons.store class="size-4" />
					Onlineshop
				</span>
			</Button>

			<LanguageToggle fullWidth={true} />
		</div>

		<Separator class="bg-secondary/20 my-8 w-full" />

		<div class="flex flex-col gap-8">
			{#each menu as menuItem, i}
				<div class="flex flex-col gap-4">
					<Accordion.Root type="multiple" value={['item-1']}>
						<Accordion.Item value="item-{i + 1}">
							<Accordion.Trigger>
								{$_(`nav.${menuItem.key}`) ?? menuItem.key}
							</Accordion.Trigger>
							<Accordion.Content class="py-8">
								{#if menuItem.key === 'industries'}
									<div class="grid grid-cols-2 gap-4">
										{#each menuItem.menuRoutes as route, j}
											<BlurFade once={true} delay={0.07 * j} duration={0.2}>
												<a
													href={getLink(menuItem.key, route.anchor)}
													onclick={(e) => {
														open = false;
													}}
												>
													<div
														class="bg-secondary/30 text-secondary hover:shadow-primary font-boldFont flex flex-col items-center gap-2 p-6 text-center text-lg transition"
													>
														{#if route.icon}
															<route.icon class="fill-secondary size-12" />
														{/if}
														{$_(`nav.${route.key}`)}
													</div>
												</a>
											</BlurFade>
										{/each}
									</div>
								{:else}
									<div class="flex flex-col gap-4">
										{#each menuItem.menuRoutes as route, j}
											<BlurFade once={true} delay={0.07 * j} duration={0.2}>
												<div class="flex flex-col gap-2">
													<a
														class="font-boldFont text-primary text-xl hover:underline"
														href={getLink(route.key)}
														onclick={(e) => {
															open = false;
														}}
													>
														{$_(`nav.${route.key}`)}
													</a>

													{#if route.routeChildren?.length}
														<ul class="flex flex-col gap-1 pl-2">
															{#each route.routeChildren as child}
																<BlurFade once={true} delay={0.07 * j} duration={0.2}>
																	<li>
																		<a
																			class="text-md text-secondary hover:underline"
																			href={getLink(child.key)}
																			onclick={(e) => {
																				open = false;
																			}}
																		>
																			{$_(`nav.${child.key}`)}
																		</a>
																	</li>
																</BlurFade>
															{/each}
														</ul>
													{/if}
												</div>
											</BlurFade>
										{/each}
									</div>
								{/if}
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</div>
			{/each}
		</div>

		<div class="h-[200px]"></div>
	</ScrollArea>
</div>
