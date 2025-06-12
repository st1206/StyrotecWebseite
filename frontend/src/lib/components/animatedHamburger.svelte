<script lang="ts">
	import type { SvelteMap } from 'svelte/reactivity';

	let {
		itemStateMap = $bindable(),
		open = $bindable()
	}: {
		itemStateMap: SvelteMap<
			number,
			{
				hovered: boolean;
				open: boolean;
			}
		>;
		open: boolean;
	} = $props();

	function toggleMenuPanel() {
		if (itemStateMap.get(99)?.open) {
			itemStateMap.set(99, { open: false, hovered: false });
		}
		open = !open;
	}
</script>

<button
	onclick={toggleMenuPanel}
	aria-expanded={open}
	aria-label="toggle menu"
	class="text-secondary"
>
	<svg
		class:open
		stroke="currentColor"
		viewBox="0 0 100 100"
		fill="none"
		stroke-width="5"
		width="56"
	>
		<path
			class="top"
			d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
		/>
		<path class="middle" d="m 30,50 h 40" />
		<path
			class="bottom"
			d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
		/>
	</svg>
</button>

<style>
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	svg {
		transition: transform 400ms;
	}

	.top {
		stroke-dasharray: 40 160;
		transition: stroke-dashoffset 400ms;
	}

	.middle {
		transform-origin: 50%;
		transition: transform 400ms;
	}

	.bottom {
		stroke-dasharray: 40 85;
		transition: stroke-dashoffset 400ms;
	}

	.open {
		transform: rotate(45deg);
	}

	.open .top,
	.open .bottom {
		stroke-dashoffset: -64px;
	}

	.open .middle {
		transform: rotate(90deg);
	}
</style>
