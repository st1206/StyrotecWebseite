<script lang="ts">
	import { Search, Button } from 'svelte-5-ui-lib';
	import { onMount } from 'svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { uiHelpers } from 'svelte-5-ui-lib';
	import { menu, type MenuRoute } from '$lib/config/routes';
	import imgLogo from '$lib/images/Logo_weiseSchrift_orange.png';
	import { Dropdown, DropdownUl, DropdownLi } from 'svelte-5-ui-lib';
	import { page } from '$app/stores';
	import { SvelteMap } from 'svelte/reactivity';

	let activeUrl = $state($page.url.pathname);
	$effect(() => {
		activeUrl = $page.url.pathname;
	});
	let dropdownA = uiHelpers();
	let dropdownAStatus = $state(false);
	let closeDropdownA = dropdownA.close;
	$effect(() => {
		dropdownAStatus = dropdownA.isOpen;
	});

	let isOpenMap = $state(new SvelteMap());

	onMount(() => {
		menu.forEach((item: MenuRoute) => {
			isOpenMap.set(item.id, false);
		});
	});
</script>

<nav
	class="bg-primary-foreground fixed z-50 flex w-full justify-center gap-[5px] p-3 shadow-[10px_10px_15px_rgba(0,0,0,0.45)]"
>
	<a class="fixed left-2 w-24" href="/"><img src={imgLogo} alt="Logo" /></a>
	<form class="flex gap-0.5">
		<Search />
		<button class="bg-primary p-2.5">
			<SearchOutline class="h-5 w-5" />
		</button>
	</form>

	{#each menu as item}
		<button
			class="hover:bg-primary bg-secondary w-[150px] px-3"
			onclick={() => (
				isOpenMap.forEach((value, key) => {
					isOpenMap.set(key, false);
				}),
				isOpenMap.set(item.id, true)
			)}
		>
			{item.label}
		</button>

		<div class="text-primary relative mr-[3px] mt-2 text-xl">
			{#if isOpenMap.get(item.id)}
				{#if item.megaMenu}
					<div
						class="bg-primary-foreground fixed left-0 top-[60px] flex h-full w-full justify-around gap-8 bg-opacity-90 p-2 backdrop-blur-sm"
					>
						<button
							class="hover:bg-primary bg-secondary fixed right-6 px-2"
							onclick={() => isOpenMap.set(item.id, false)}
						>
							✕
						</button>
						{#each item.megaMenu as column}
							<div class="mega-menu-column">
								<h4>
									<a
										class="text-primary text-2xl font-bold hover:underline"
										onclick={() =>
											isOpenMap.forEach((value, key) => {
												isOpenMap.set(key, false);
											})}
										href={column.link}>{column.title}</a
									>
								</h4>
								<ul>
									{#each column.items as subitem}
										<li>
											<a
												class="font-2xl text-secondary hover:text-secondary hover:underline"
												onclick={() =>
													isOpenMap.forEach((value, key) => {
														isOpenMap.set(key, false);
													})}
												href={subitem.link}>{subitem.label}</a
											>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/if}
			{/if}
		</div>
	{/each}

	<div>
		<button
			class="text-primary-600 hover:bg-primary bg-secondary h-10 w-32"
			onclick={dropdownA.toggle}
			>Einstellungen
		</button>
		<div class="relative">
			<Dropdown
				{activeUrl}
				dropdownStatus={dropdownAStatus}
				closeDropdown={closeDropdownA}
				class="absolute -left-[150px] top-[40px]"
			>
				<DropdownUl>
					<DropdownLi href="/">Englisch</DropdownLi>
					<DropdownLi href="/components/dropdown">Deutsch</DropdownLi>
				</DropdownUl>
			</Dropdown>
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
