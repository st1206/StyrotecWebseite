<script lang="ts">
	import { Button, megamenu, Search } from 'svelte-5-ui-lib';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { uiHelpers } from 'svelte-5-ui-lib';
	import { menu } from '$lib/config/routes';
	import { Dropdown, DropdownUl, DropdownLi } from 'svelte-5-ui-lib';
	import { SvelteMap } from 'svelte/reactivity';
	import MobileNav from './mobile-nav.svelte';
	import { page } from '$app/state';
	import { Icons } from '$lib/assets/icons';
	import LanguageToggle from '$lib/components/language-toggle.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/utils';

	let activeUrl = $state(page.url.pathname);
	$effect(() => {
		activeUrl = page.url.pathname;
	});
	let dropdownA = uiHelpers();
	let dropdownAStatus = $state(false);
	let closeDropdownA = dropdownA.close;
	$effect(() => {
		dropdownAStatus = dropdownA.isOpen;
	});

	let isOpenMap = $state(new SvelteMap());
</script>

<nav
	class="bg-primary-foreground fixed z-50 flex w-full justify-around gap-2 p-3 shadow-[10px_10px_15px_rgba(0,0,0,0.45)]"
>
	<!-- logo -->
	<a class="ml-2 w-24" href="/"><img src={Icons.logo} alt="Logo" /></a>

	<div class="flex gap-2">
		<!-- searchbar -->
		<div class="mr-10 hidden md:block">
			<form>
				<Search
					class="h-[40px] w-[300px] pl-12 [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]"
				></Search>
			</form>
		</div>

		<!-- menu -->
		<div class="relative hidden xl:flex">
			{#each menu as item}
				<div
					class="bg-secondary absolute -left-5 -top-2.5 h-[62px] w-[240px] [clip-path:polygon(19%_0%,100%_0%,81%_100%,0%_100%)]"
				></div>
				<div
					class="bg-secondary absolute -top-2.5 left-[180px] h-[62px] w-[240px] [clip-path:polygon(19%_0%,100%_0%,81%_100%,0%_100%)]"
				></div>
				<div
					class="bg-secondary absolute -top-2.5 left-[380px] h-[62px] w-[240px] [clip-path:polygon(19%_0%,100%_0%,81%_100%,0%_100%)]"
				></div>
				<div
					class="bg-secondary absolute -top-2.5 left-[580px] h-[62px] w-[240px] [clip-path:polygon(19%_0%,100%_0%,81%_100%,0%_100%)]"
				></div>

				<!--hover:bg-primary-foreground hover:text-secondary bg-secondary z-20 w-[200px] text-xl [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)] -->
				<button
					use:clickOutside={() => isOpenMap.set(item.id, false)}
					class="hover:bg-primary-foreground hover:text-secondary bg-secondary z-20 w-[200px] text-xl [clip-path:polygon(15%_0%,100%_0%,85%_100%,0%_100%)]"
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
							
							class="bg-primary-foreground fixed left-0 top-[60px] flex h-full w-full justify-around gap-8 bg-opacity-90 p-2 pt-10 backdrop-blur-sm"
						>
							<button
								class="hover:bg-primary bg-secondary fixed right-6 px-2"
								onclick={() => isOpenMap.set(item.id, false)}
							>
								✕
							</button>
							{#each item.megaMenu as column}
								<!-- nur für Branchen wegen Bilder -->
								{#if column.key == 'branchen'}
									<div class="flex w-[60%] flex-row flex-wrap justify-between gap-10 py-[100px]">
										{#each column.items as item}
											<a href={item.link} class="text-primary text-2xl">
												{$_(`nav.${item.key}`) ?? item.key}
												<img src={item.ImageUrl} alt="logo" class="h-[250px] w-[250px]" />
											</a>
										{/each}
									</div>
								{:else}
									<!-- Rest ohne Bilder -->
									<div class="mega-menu-column mt-36">
										<h4>
											<a
												class="text-primary text-3xl font-bold hover:underline"
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
														class="text-secondary hover:text-secondary text-2xl hover:underline"
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

	<div class="absolute right-10 flex gap-4">
		<!-- language toggle -->
		<LanguageToggle />

		<!-- mobile menu -->
		<div class="xl:hidden">
			<MobileNav />
		</div>
	</div>

	<div class="hidden xl:block"></div>
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
