<script lang="ts">
	import { Motion, AnimatePresence } from 'svelte-motion';
	import { inview } from 'svelte-inview';
	import { cn } from '$lib/utils';

	let {
		duration = 0.4,
		delay = 0,
		yOffset = 6,
		inViewMargin = '-50px',
		blur = '2px',
		id = crypto.randomUUID().slice(0, 8),
		once = false,
		children
	}: {
		duration?: number;
		delay?: number;
		yOffset?: number;
		inViewMargin?: string;
		blur?: string;
		id?: string;
		once?: boolean;
		children?: import('svelte').Snippet;
	} = $props();

	let defaultVariants = {
		hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
		visible: { opacity: 1, y: 0, filter: `blur(0px)` }
	};
	let isInView = $state('hidden');

	let className = $state('');
	export { className as class };
</script>

<AnimatePresence let:item list={[{ key: id }]}>
	<Motion
		initial="hidden"
		animate={isInView}
		exit="hidden"
		variants={defaultVariants}
		transition={{
			delay: 0.04 + delay,
			duration,
			ease: 'easeOut'
		}}
		let:motion
	>
		<div
			use:inview={{ rootMargin: inViewMargin, unobserveOnEnter: once }}
			use:motion
			oninview_change={({ detail }) => {
				isInView = detail.inView ? 'visible' : 'hidden';
			}}
			class={cn(className)}
		>
			{@render children?.()}
		</div>
	</Motion>
</AnimatePresence>
