<script lang="ts">
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	class={cn(
		'border-primary bg-foreground placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md px-3 py-2 text-base focus-visible:border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
		className
	)}
	bind:value
	{...restProps}
></textarea>
