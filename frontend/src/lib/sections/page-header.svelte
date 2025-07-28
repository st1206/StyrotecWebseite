<script lang="ts">
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { cn } from '$lib/utils';

	let data: { headline: string; description?: string; anchor?: string; textStart?: boolean } =
		$props();
</script>

<BlurFade once={true} delay={0} duration={0.3}>
	<section
		id={data.anchor}
		class="mt-28 max-w-4xl px-4 sm:container sm:mx-auto sm:mt-36 lg:w-full xl:px-0 print:mt-8"
	>
		<h1
			class={cn(
				data.textStart ? 'text-center md:text-start' : 'text-center',
				'mb-4 font-sans text-4xl font-bold xl:text-5xl'
			)}
		>
			{data.headline}
		</h1>
		{#if data.description}
			<p
				class="prose prose-neutral prose-sm lg:prose-base xl:prose-lg mx-auto mb-8 max-w-5xl text-center"
			>
				{data.description}
			</p>
		{/if}
	</section>
</BlurFade>
