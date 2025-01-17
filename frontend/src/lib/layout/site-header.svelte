<script lang="ts">
	import { Search, Button } from 'svelte-5-ui-lib';
	import { onMount } from 'svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { linear, sineIn } from 'svelte/easing';
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

<nav class="z-50 fixed w-full sm:mx-auto">
	<a class="ml-3 mr-8" href="/"><img src={imgLogo} alt="Logo" /></a>
	<form class="flex gap-0.5">
		<Search />
		<button class="bg-primary p-2.5">
			<SearchOutline class="h-5 w-5" />
		</button>
	</form>
	<div class="move"></div>

	{#each menu as item}
		<button class="px-3" onclick={() => (isOpenMap.forEach((value,key)=> {isOpenMap.set( key,false)}), isOpenMap.set(item.id,true ) )}>
			{item.label}
		</button>

		<div class="menu-item mt-2">
			{#if isOpenMap.get(item.id)}
				{#if item.megaMenu}
					<div class="mega-menu">
						<button class="fixed right-3 px-2" onclick={() => (isOpenMap.set(item.id, false))}>
							X
						</button>
						{#each item.megaMenu as column}
							<div class="mega-menu-column">
								<h4>{column.title}</h4>
								<ul>
									{#each column.items as subitem}
										<li><a onclick={() => (isOpenMap.forEach((value,key)=> {isOpenMap.set( key,false)}))} href={subitem.link}>{subitem.label}</a></li>
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
		<button class="text-primary-600 h-10 w-32" onclick={dropdownA.toggle}>Einstellungen </button>
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
	img {
		width: 100px;
	}

	div.move {
		margin-right: auto;
		padding-left: 50px;
	}

	button {
		border-radius: 0;
	}
	nav {
		background-color: #33312e;
		padding: 0.75rem;
		display: flex;
		justify-content: center;
		gap: 15px;
	}

	.menu-item {
		position: relative; /* Damit das Mega-Menu relativ zur Menü-Item-Position angezeigt wird */
		color: #f6a312;
		margin-right: 30px;
	}

	a {
		color: #f6edde;
		text-decoration: none;
		font-size: 1.2rem;
	}

	a:hover {
		text-decoration: underline;
	}

	/* Mega-Menu standardmäßig ausblenden */
	.mega-menu {
		display: flex; /* Wichtig: standardmäßig versteckt */
		position: fixed;
		justify-content: space-around;
	
		top: 60px; /* Positioniert es direkt unter dem Hauptmenüpunkt */
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(51, 49, 46, 0.9);
		padding: 2rem;
		gap: 2rem; /* Abstand zwischen den Spalten */
		box-shadow: 0 4px 6px rgba(51, 49, 46, 0.1);
	}

	/* Mega-Menu bei Hover sichtbar machen */

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

	.mega-menu-column ul li a {
		color: #f6edde;
		text-decoration: none;
	}

	.mega-menu-column ul li a:hover {
		color: #f6edde;
	}
	button {
		border-radius: 8px;
		background-color: #f6edde;
	}
	button:hover {
		background-color: #f6a312;
	}
</style>
