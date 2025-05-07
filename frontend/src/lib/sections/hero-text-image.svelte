<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import BlurFade from '$lib/components/blur-fade.svelte';

	let data: {
		title: string;
		subtitle: string;
		content: string;
		image: ImageAsset;
	} = $props();
</script>

<BlurFade once={true} delay={0.1} duration={0.3}>
	<section
		class="bg-secondary mx-auto mb-32 mt-20 flex w-full flex-col gap-16 px-4 sm:container lg:my-36 lg:flex-row"
	>
		<div class="flex w-full flex-col items-center justify-center">
			<div class="mb-4">
				<h2
					class="font-boldFont uppercases text-right text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl"
				>
					{data.title}
				</h2>
				{#if data.subtitle}
					<h3 class="text-right text-2xl uppercase xl:text-3xl">
						{data.subtitle}
					</h3>
				{/if}
			</div>
			<p class="prose prose-neutral prose-sm md:prose-base xl:prose-lg text-justify">
				{@html data.content}
			</p>
		</div>
		{#if data.image}
			<img
				src={!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${data.image.formats['large']?.url || data.image.url}`
					: data.image.url}
				alt={data.image.alternativeText}
				class="shadow-primary mx-auto h-[300px] w-auto object-cover lg:h-[330px] xl:h-[400px]"
			/>
		{/if}
	</section>
</BlurFade>
