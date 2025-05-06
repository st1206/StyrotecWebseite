<script lang="ts">
	import { menu } from '$lib/config/routes';
	import { SvelteMap } from 'svelte/reactivity';
	import MobileNav from './mobile-nav.svelte';
	import { Icons } from '$lib/assets/icons';
	import LanguageToggle from '$lib/components/language-toggle.svelte';
	import { clickOutside } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import { Button } from '$lib/components/ui/button';

	let isOpenMap = new SvelteMap();
</script>

<nav
	class="fixed z-50 flex w-full items-center justify-between gap-2 bg-primary-foreground p-3 shadow-[10px_10px_15px_rgba(0,0,0,0.45)]"
>
	<!-- logo -->
	<a class="ml-2 w-24" href="/"><img src={Icons.logo} alt="Logo" /></a>

	<div class="flex gap-2">
		<!-- searchbar -->^

		<!-- menu -->
		<div class="relative hidden lg:flex">
			{#each menu as item}
				<button
					use:clickOutside={() => isOpenMap.set(item.id, false)}
					class="text-md z-20 mx-4 w-[150px] rounded-lg bg-primary-foreground font-boldFont text-xl uppercase text-secondary hover:text-primary xl:w-[200px] xl:text-xl"
					onclick={() => {
						const isCurrentlyOpen = isOpenMap.get(item.id) ?? false;
						isOpenMap.forEach((_, key) => isOpenMap.set(key, false));
						isOpenMap.set(item.id, !isCurrentlyOpen);
					}}
				>
					{$_(`nav.${item.key}`)}
				</button>

				{#if isOpenMap.get(item.id)}
					{#if item.megaMenu}
						<!-- Mega Menü ab hier-->
						<div
							class="fixed left-0 top-[60px] flex h-full w-full justify-around gap-8 bg-primary-foreground bg-opacity-90 p-2 pt-10 backdrop-blur-sm"
						>
							<button
								class="fixed right-6 bg-secondary px-2 hover:bg-primary"
								onclick={() => isOpenMap.set(item.id, false)}
							>
								✕
							</button>
							{#each item.megaMenu as column}
								<!-- nur für Branchen wegen Bilder -->
								{#if column.key == 'branchen'}
									<div class="flex w-[70%] flex-row flex-wrap justify-between gap-10 py-[100px]">
										{#each column.items as item}
											<a href={item.link} class="h-auto w-[20%] text-2xl text-primary">
												<h2 class="text-center">{$_(`nav.${item.key}`) ?? item.key}</h2>
												<img src={item.ImageUrl} alt="logo" class=" rounded-lg" />
											</a>
										{/each}
									</div>
								{:else}
									<!-- Rest ohne Bilder -->
									<div class="mega-menu-column mt-36">
										<h4>
											<a
												class="text-3xl font-bold text-primary hover:underline"
												onclick={() =>
													isOpenMap.forEach((value, key) => {
														isOpenMap.set(key, false);
													})}
												href={column.link}
											>
												{$_(`nav.${column.key}`) ?? column.key}
											</a>
										</h4>
										<ul>
											{#each column.items as subitem}
												<li>
													<a
														class="text-2xl text-secondary hover:text-secondary hover:underline"
														onclick={() =>
															isOpenMap.forEach((value, key) => {
																isOpenMap.set(key, false);
															})}
														href={subitem.link}
													>
														{$_(`nav.${subitem.key}`) ?? subitem.key}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
	<Button
		size="sm"
		class="bg-primary text-xl text-secondary"
		href="https://styrotec.shop/"
		target="_blank"
	>
		Onlineshop
	</Button>
	<div class="flex gap-4">
		<!-- language toggle -->
		<LanguageToggle />
		<div>&#128270</div>
		<!-- mobile menu -->
		<div class="lg:hidden">
			<MobileNav />
		</div>
	</div>
</nav>

<style>
	.mega-menu-column {
		min-width: 150px;
		padding-left: 3%;
	}

	.mega-menu-column h4 {
		color: #f6edde;
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.mega-menu-column ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.mega-menu-column ul li {
		margin-bottom: 0.5rem;
	}
</style>
