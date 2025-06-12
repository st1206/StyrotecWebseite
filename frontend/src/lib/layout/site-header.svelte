<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import Button from '$lib/components/ui/button/button.svelte';
	import { pages } from '$lib/config/pages';
	import { menu } from '$lib/config/routes';
	import { clickOutside, cn } from '$lib/utils';
	import { locale } from 'svelte-i18n';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import LanguageToggle from '$lib/components/language-toggle.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import MobileNav from './mobile-nav.svelte';
	import AnimatedHamburger from '$lib/components/animatedHamburger.svelte';
	import SearchPanel from '$lib/components/search-panel.svelte';

	type MenuState = {
		hovered: boolean;
		open: boolean;
	};

	// default open state for menu id 3
	let itemStateMap = $state(
		new SvelteMap<number, MenuState>([[99, { hovered: false, open: false }]])
	);

	function closeAll(): void {
		for (const [k, state] of itemStateMap.entries()) {
			itemStateMap.set(k, { hovered: false, open: false });
		}
	}

	function handleMouseEnter(itemId: number): void {
		closeAll();
		itemStateMap.set(itemId, { hovered: true, open: true });
	}

	function handleMouseLeave(itemId: number): void {
		const current = itemStateMap.get(itemId) ?? { hovered: false, open: false };
		itemStateMap.set(itemId, { hovered: false, open: current.open });
	}

	function isAnyItemOpen(): boolean {
		return Array.from(itemStateMap.values()).some((state) => state.open);
	}

	function onlyThisItemActive(itemId: number): boolean {
		const thisItem = itemStateMap.get(itemId);
		if (!thisItem || (!thisItem.hovered && !thisItem.open)) {
			return false;
		}

		for (const [k, st] of itemStateMap.entries()) {
			if (k !== itemId && (st.hovered || st.open)) {
				return false;
			}
		}
		return true;
	}

	const slugMap: Record<keyof typeof pages, string> = $derived.by(() => {
		const use = $locale === 'en-EN' ? 'enSlug' : 'deSlug';
		const prefix = $locale === 'en-EN' ? '/en/' : '/de/';

		return Object.fromEntries(
			Object.entries(pages).map(([k, p]: any) => [k, prefix + p[use]])
		) as Record<keyof typeof pages, string>;
	});

	function getLink<K extends keyof typeof pages>(key: K, appendage?: string | null): string {
		const base = slugMap[key];
		if (!appendage) {
			return base;
		}
		return appendage.startsWith('/') ? `${base}${appendage}` : `${base}/${appendage}`;
	}

	let isNavPanelOpen = $state(false);

	function handleSearchPanelOpen() {
		isNavPanelOpen = false;
		itemStateMap.set(99, { hovered: true, open: true });
	}
</script>

<div class="bg-foreground absolute top-0 h-20 w-full"></div>

<nav
	use:clickOutside={closeAll}
	onmouseleave={closeAll}
	class={cn(
		isAnyItemOpen()
			? itemStateMap.get(99)?.open
				? 'supports-[backdrop-filter]:bg-foreground/100 h-screen'
				: itemStateMap.get(3)?.open
					? 'supports-[backdrop-filter]:bg-foreground/100 h-[580px]'
					: 'supports-[backdrop-filter]:bg-foreground/100 h-[450px]'
			: 'supports-[backdrop-filter]:bg-foreground/90 h-20',
		isNavPanelOpen ? 'supports-[backdrop-filter]:bg-foreground/100' : '',
		'fixed top-0 z-40 w-full px-4 py-2 shadow-lg backdrop-blur transition-all duration-200 ease-in-out md:px-0 print:static'
	)}
>
	<div class="flex h-16 items-center justify-between gap-2 md:container">
		<!-- Logo -->
		<a class="w-24" href="/">
			<img src={Icons.logoLight} alt="Logo" />
		</a>

		<div class="navBreak:flex hidden print:hidden">
			{#each menu as item, i}
				<Button
					href={getLink(item.key)}
					variant="ghost"
					class={cn(
						i < menu.length - 1 ? 'border-r-2 border-white/20' : '',
						onlyThisItemActive(item.id) ? 'bg-primary' : '',
						'font-boldFont text-secondary hover:bg-primary h-full -skew-x-[15deg] cursor-pointer uppercase transition duration-300 hover:text-white'
					)}
					onmouseenter={() => handleMouseEnter(item.id)}
					onmouseleave={() => handleMouseLeave(item.id)}
				>
					<span class="text-md mx-4 skew-x-[15deg] xl:mx-8 xl:text-lg">
						{$_(`nav.${item.key}`)}
					</span>
				</Button>
			{/each}
		</div>

		<div class="navBreak:flex hidden gap-6 print:hidden">
			<div class="flex gap-2">
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<LanguageToggle />
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Sprache auswählen</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Button onclick={handleSearchPanelOpen} variant="secondary" size="icon">
								<span class="flex skew-x-[15deg] items-center gap-2">
									<Icons.search class="size-4" />
								</span>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Website durchsuchen...</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger class="inline-flex">
						<Button href="https://styrotec.shop/" target="_blank" rel="noopener noreferrer">
							<span class="flex skew-x-[15deg] items-center gap-2">
								<Icons.store class="size-4" />
								Onlineshop
							</span>
						</Button>F
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Zum Onlineshop</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
		<!-- navBreak:hidden -->

		<div class="absolute left-0 top-[79px] -z-10 print:hidden">
			<MobileNav bind:open={isNavPanelOpen} />
		</div>
		<div class="navBreak:hidden flex items-center gap-1 print:hidden">
			<Button
				onclick={handleSearchPanelOpen}
				variant="ghost"
				size="icon"
				class="hover:bg-transparent"
			>
				<Icons.search class="text-secondary size-6" />
			</Button>
			<AnimatedHamburger bind:itemStateMap bind:open={isNavPanelOpen} />
		</div>
	</div>

	{#if isAnyItemOpen()}
		<div
			class="sm:container print:hidden"
			in:fly={{ y: -30, duration: 300 }}
			out:fly={{ y: -30, duration: 200 }}
		>
			{#if itemStateMap.get(99)?.open}
				<!-- search panel -->
				<SearchPanel bind:itemStateMap />
			{:else}
				<div class="mt-16 flex justify-around">
					<!-- regular nav panel -->
					{#each menu as menuItem}
						{#if itemStateMap.get(menuItem.id)?.open && menuItem.menuRoutes.length}
							{#if menuItem.key === 'industries'}
								<div class="flex flex-wrap justify-center gap-6">
									{#each menuItem.menuRoutes as route, i}
										<a
											class="w-1/5"
											href={getLink(menuItem.key, route.anchor)}
											onclick={(e) => closeAll()}
										>
											<BlurFade delay={0.03 * i} duration={0.3}>
												<div
													class="text-secondary hover:shadow-primary font-boldFont bg-secondary/30 flex h-full w-full cursor-pointer
															flex-col items-center justify-center gap-4 p-8 text-xl transition duration-300 ease-in-out xl:text-2xl"
												>
													{#if route.icon}
														<route.icon class="text-secondary fill-secondary md:h-20 md:w-20" />
													{/if}
													<span>{$_(`nav.${route.key}`)}</span>
												</div>
											</BlurFade>
										</a>
									{/each}
								</div>
							{:else}
								{#each menuItem.menuRoutes as route, i}
									<BlurFade delay={0.03 * i} duration={0.3}>
										<div class="flex flex-col gap-6">
											<a
												class="font-boldFont text-primary text-2xl hover:underline xl:text-3xl"
												href={getLink(route.key, route.anchor)}
												onclick={(e) => closeAll()}
											>
												{$_(`nav.${route.key}`)}
											</a>

											{#if route.routeChildren?.length}
												<ul class="flex flex-col gap-1">
													{#each route.routeChildren as routeChild}
														<li>
															<a
																class="text-md text-white hover:underline xl:text-lg"
																href={routeChild.anchor
																	? getLink(route.key, routeChild.anchor)
																	: getLink(routeChild.key)}
																onclick={(e) => closeAll()}
															>
																{$_(`nav.${routeChild.key}`)}
															</a>
														</li>
													{/each}
												</ul>
											{/if}
										</div>
									</BlurFade>
								{/each}
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</nav>

<!-- blurry background -->
{#if isAnyItemOpen()}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed left-0 top-20 z-30 h-full w-full backdrop-blur-sm"
	></div>
{/if}
