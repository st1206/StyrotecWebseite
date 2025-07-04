<script lang="ts">
	import { onMount } from 'svelte';
	import createGlobe from 'cobe';
	import { spring } from 'svelte/motion';
	import { cn } from '$lib/utils';

	let x = spring(0, {
		stiffness: 0.04,
		damping: 0.4,
		precision: 0.005
	});

	let canvas: HTMLCanvasElement;

	let phi = 0;
	let width = 0;
	let onResize = () => {
		width = canvas.offsetWidth;
	};

	let onRender = (state: any) => {
		phi += 0.002;
		state.phi = phi + $x;
		state.width = width * 2;
		state.height = width * 2;
	};

	onMount(() => {
		// Adds the resize event listener when the component is mounted
		window.addEventListener('resize', onResize);
		onResize();

		// Initializes the globe with specific options
		const globe = createGlobe(canvas, {
			devicePixelRatio: 2,
			width: width,
			height: width,
			phi: 0,
			theta: 0.3,
			dark: 0,
			diffuse: 0.4, // 1.2
			mapSamples: 10000,
			mapBrightness: 5, // 6
			baseColor: [0.8, 0.8, 0.8],
			markerColor: [251 / 255, 100 / 255, 21 / 255],
			glowColor: [0.5, 0.5, 0.5],
			markers: [
				{ location: [14.5995, 120.9842], size: 0.03 },
				{ location: [19.076, 72.8777], size: 0.03 },
				{ location: [23.8103, 90.4125], size: 0.05 },
				{ location: [30.0444, 31.2357], size: 0.07 }
			],
			onRender: onRender
		});

		// Removes the resize event listener when the component is unmounted to prevent memory leaks
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<main class={cn('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]')}>
	<canvas class="h-full w-full [contain:layout_paint_size]" bind:this={canvas}></canvas>
</main>
