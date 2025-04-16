<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import Button from '$lib/components/ui/button/button.svelte';
	import { menu } from '$lib/config/routes';
	import { clickOutside, cn } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import { backInOut } from 'svelte/easing';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';

	type MenuState = {
		hovered: boolean;
		open: boolean;
	};

	let itemStateMap = new SvelteMap<number, MenuState>();

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
</script>

<div class="absolute top-0 h-20 w-full bg-primary-foreground"></div>

<nav
	use:clickOutside={closeAll}
	onmouseleave={closeAll}
	class={cn(
		isAnyItemOpen()
			? 'h-[450px] bg-primary-foreground/100 supports-[backdrop-filter]:bg-primary-foreground/100'
			: 'h-20 bg-primary-foreground/95 supports-[backdrop-filter]:bg-primary-foreground/80',
		'fixed top-0 z-40 w-full p-2 px-8 shadow-lg backdrop-blur transition-all duration-300 ease-in-out'
	)}
>
	<div class="flex h-16 items-center justify-between gap-2">
		<!-- Logo -->
		<a class="w-24" href="/">
			<img src={Icons.logo} alt="Logo" />
		</a>

		<div class="hidden lg:flex">
			{#each menu as item, i}
				<Button
					variant="ghost"
					class={cn(
						i < menu.length - 1 ? 'border-r-2' : '',
						onlyThisItemActive(item.id) ? 'bg-primary' : '',
						'h-full -skew-x-[15deg] cursor-default text-xl uppercase text-white transition duration-300 hover:bg-primary hover:text-white'
					)}
					onmouseenter={() => handleMouseEnter(item.id)}
					onmouseleave={() => handleMouseLeave(item.id)}
				>
					<span class="mx-8 skew-x-[15deg]">
						{item.key}
					</span>
				</Button>
			{/each}
		</div>

		<Button>
			<span class="skew-x-[15deg]">Onlineshop</span>
		</Button>
	</div>

	{#if isAnyItemOpen()}
		<div
			class="container mt-16 flex justify-around"
			in:fly={{ y: -30, duration: 300 }}
			out:fly={{ y: -30, duration: 200 }}
		>
			{#each menu as item}
				<!-- If this item is open and has a megaMenu array -->
				{#if itemStateMap.get(item.id)?.open && item.megaMenu}
					{#each item.megaMenu as column, i}
						<!-- Only insert this column if showItems is true -->
						<div class="flex flex-col gap-6">
							<a
								class="text-3xl font-bold text-primary hover:underline"
								onclick={closeAll}
								href="/"
							>
								{column.key}
							</a>

							<ul class="flex flex-col gap-1">
								{#each column.items as subitem, j}
									<!-- Only insert the li if showChildren is true -->
									<li>
										<a
											class=" text-lg text-white hover:underline"
											onclick={closeAll}
											href={subitem.link}
										>
											{subitem.key}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			{/each}
		</div>
	{/if}
</nav>
{#if isAnyItemOpen()}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed left-0 top-20 z-30 h-full w-full backdrop-blur-sm"
	></div>
{/if}
<!-- 
{#each item.megaMenu as column, i}
<div
    class="my-4 flex flex-col"
    in:fly={{ y: -30, easing: backInOut, duration: 300, delay: 120 }}
    out:fly={{ y: -30, easing: backInOut, duration: 200 }}
>
    <h4>
        <a
            class="text-3xl font-bold text-primary hover:underline"
            onclick={() => closeAll()}
            href="/"
        >
            {column.key}
        </a>
    </h4>

    <ul>
        {#each column.items as subitem, i}
            <li>
                <a
                    class="text-2xl text-secondary hover:text-secondary hover:underline"
                    onclick={() => closeAll()}
                    href={subitem.link}
                >
                    {subitem.key}
                </a>
            </li>
        {/each}
    </ul>
</div>
{/each} -->
