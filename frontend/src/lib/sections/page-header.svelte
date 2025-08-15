<script lang="ts">
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { cn } from '$lib/utils';
	import { SafeData } from '$lib/utils/validation';

	let data: { headline?: string; description?: string; anchor?: string; textStart?: boolean } =
		$props();

	const safe = new SafeData(data);
	const headline = safe.getString('headline', '');
	const description = safe.getString('description');
	const anchor = safe.getString('anchor');
	const textStart = Boolean((data as any)?.textStart);
</script>

<BlurFade once={true} delay={0} duration={0.2}>
	<section
		id={anchor}
		class="mt-28 max-w-4xl scroll-mt-24 px-4 sm:container sm:mx-auto sm:mt-36 lg:w-full xl:px-0 print:mt-8"
	>
		<h1
			class={cn(
				textStart ? 'text-center md:text-start' : 'text-center',
				'mb-4 font-sans text-4xl font-bold xl:text-5xl'
			)}
		>
			{headline}
		</h1>
		{#if description}
			<p
				class="prose prose-neutral prose-sm lg:prose-base xl:prose-lg mx-auto mb-8 max-w-5xl text-center"
			>
				{description}
			</p>
		{/if}
	</section>
</BlurFade>
