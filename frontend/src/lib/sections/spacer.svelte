<script lang="ts">
	import type { Size, SpacerSection } from '$lib/types/sections';
	import { cn } from '$lib/utils';

	let { height = 'md', isDarkMode = false, withSeparatorLine = false }: SpacerSection = $props();

	/**
	 * A map of abstract sizes to responsive Tailwind CSS height classes.
	 * This makes it easy to adjust spacing consistently across the app.
	 */
	const heightClasses: Record<Size, string> = {
		xs: 'h-4 md:h-8',
		sm: 'h-8 md:h-12',
		md: 'h-16 md:h-24',
		lg: 'h-24 md:h-32',
		xl: 'h-32 md:h-48'
	};

	const spacerClass = $derived(heightClasses[height]);
</script>

<div class={cn('flex w-full items-center', isDarkMode ? 'bg-foreground' : '', spacerClass)}>
	{#if withSeparatorLine}
		<div
			class={cn('h-px w-full sm:container', isDarkMode ? 'bg-secondary/20' : 'bg-border/20')}
		></div>
	{/if}
</div>
